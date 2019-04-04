import { NgxIndexedDB } from 'ngx-indexed-db';

export interface DbServiceInterface {
  get(id: string): Promise<any>;

  update(id: string, value: object): Promise<void>;

  getDb(): Promise<NgxIndexedDB>;
}
