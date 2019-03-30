import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';

import { DbServiceInterface } from './db.service.interface';

const DBName = 's3see';
const DBVersion = 1;

@Injectable({
  providedIn: 'root'
})
export class DbService implements DbServiceInterface {
  private db = new NgxIndexedDB(DBName, DBVersion);
  private store;

  get(id: string) {
    return new Promise((resolve, reject) => {
      return this.getDb()
        .then((db: any) => {
          return db
            .getByKey(this.storeName, id)
            .then((result) => {
              resolve(result ? result : null);
            })
            .catch(() => reject());
        })
        .catch(() => reject());
    });
  }

  update(id: string, value: object) {
    return new Promise((resolve, reject) => {
      return this.getDb().then((db: any) => {
        return db.getByKey(this.storeName, id).then((result) => {
          value[this.primaryKey] = id;

          if (result) {
            return db
              .update(this.storeName, value)
              .then(() => resolve())
              .catch(() => reject());
          } else {
            return db
              .add(this.storeName, value)
              .then(() => resolve())
              .catch(() => reject());
          }
        });
      });
    });
  }

  getDb() {
    return new Promise((resolve, reject) => {
      return this.db
        .openDatabase(DBVersion, (evt) => {
          this.store = evt.currentTarget.result.createObjectStore(this.storeName, {
            keyPath: this.primaryKey,
            autoIncrement: false
          });

          this.store.createIndex(this.primaryKey, this.primaryKey, {
            unique: true
          });
        })
        .then(() => {
          resolve(this.db);
        })
        .catch(() => console.log('getDb failed'));
    });
  }

  constructor(private storeName: string, private primaryKey: string) {}
}
