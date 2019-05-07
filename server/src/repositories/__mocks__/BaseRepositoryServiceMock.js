export default class BaseRepositoryServiceMock {
  constructor() {
    this.create = jest.fn();
    this.read = jest.fn();
    this.delete = jest.fn();
  }
}
