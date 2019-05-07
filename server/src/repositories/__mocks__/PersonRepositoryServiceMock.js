import BaseRepositoryServiceMock from './BaseRepositoryServiceMock';

export default class PersonRepositoryServiceMock extends BaseRepositoryServiceMock {
  constructor() {
    super();
    this.search = jest.fn();
  }
}
