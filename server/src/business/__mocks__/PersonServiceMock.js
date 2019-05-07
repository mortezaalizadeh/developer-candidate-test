export default class PersonServiceMock {
  constructor() {
    this.create = jest.fn();
    this.read = jest.fn();
    this.delete = jest.fn();
    this.search = jest.fn();
  }
}
