import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

import { DbServiceInterface } from './db.service.interface';

const DBName = 's3see';
const DBVersion = 1;

@Injectable({
  providedIn: 'root'
})
export class DbService implements DbServiceInterface {
  private db = new NgxIndexedDB(DBName, DBVersion);
  private store: any;

  get(id: string): Observable<any> {
    return new Observable((observer) => {
      this.getDb().subscribe((db: any) => {
        db.getByKey(this.storeName, id).then(
          (result) => {
            observer.next(result ? result : null);
          },
          (e) => {
            observer.next(e);
          }
        );
      });
    });
  }

  update(id: string, value: object): Observable<void> {
    return new Observable((observer) => {
      this.getDb().subscribe((db: any) => {
        db.getByKey(this.storeName, id).then((result) => {
          value[this.primaryKey] = id;

          if (result) {
            db.update(this.storeName, value).then(() => observer.next(), (e) => observer.next());
          } else {
            db.add(this.storeName, value).then(() => observer.next(), (e) => observer.next());
          }
        });
      });
    });
  }

  getDb(): Observable<NgxIndexedDB> {
    return new Observable((observer) => {
      this.db
        .openDatabase(DBVersion, (evt) => {
          this.store = evt.currentTarget.result.createObjectStore(this.storeName, {
            keyPath: this.primaryKey,
            autoIncrement: false
          });

          this.store.createIndex(this.primaryKey, this.primaryKey, {
            unique: true
          });
        })
        .then(
          () => {
            observer.next(this.db);
          },
          (e) => {
            observer.next(e);
          }
        )
        .catch(() => console.log('getDb failed'));
    });
  }

  constructor(private storeName: string, private primaryKey: string) {}
}
