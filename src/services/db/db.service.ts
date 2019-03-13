import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';

const DBName = 's3see';
const DBVersion = 1;

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db = new NgxIndexedDB(DBName, DBVersion);
  private store;

  get(id: string) {
    return new Promise((resolve, reject) => {
      return this.getDb().then((db: any) => {
        return db.getByKey(this.storeName, id).then((result) => {
          resolve(result ? result : null);
        });
      });
    });
  }

  update(id: string, value: object) {
    /*return this.store.getByKey('id', id).then((result) => {
      console.log(result);
    });*/
  }

  getDb() {
    return new Promise((resolve, reject) => {
      return this.db
        .openDatabase(DBVersion, (evt) => {
          this.store = evt.currentTarget.result.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true
          });

          this.store.createIndex('id', 'id', {
            unique: true
          });
        })
        .then(() => {
          resolve(this.db);
        });
    });
  }

  constructor(private storeName: string) {}
}
