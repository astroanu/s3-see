export interface DbServiceInterface {
  get(id: string);

  update(id: string, value: object);

  getDb();
}
