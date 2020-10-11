import { NgxIndexedDB } from "ngx-indexed-db";
import { Observable } from "rxjs";

export interface DbServiceInterface {
  get(id: string): Observable<any>;

  update(id: string, value: object): Observable<void>;

  getDb(): Observable<NgxIndexedDB>;
}
