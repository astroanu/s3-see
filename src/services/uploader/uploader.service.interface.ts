export interface UploaderServiceInterface {
  get(id: string);

  update(id: string, value: object);

  getDb();
}
