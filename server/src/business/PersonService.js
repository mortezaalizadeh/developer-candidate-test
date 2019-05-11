import { BadArgumentError, NotFoundError, AlreadyExistsError, UnknownError } from './Errors';
import { Common } from '../helpers';

export default class PersonService {
  constructor({ personRepositoryService }) {
    if (Common.isNullOrUndefined(personRepositoryService)) {
      throw new Error('personRepositoryService is required!');
    }

    this.personRepositoryService = personRepositoryService;
  }

  create = async info => {
    if (Common.isNullOrUndefined(info)) {
      throw new BadArgumentError('info is required!');
    }

    if (Common.isNullOrUndefined(info.name) || info.name.trim().length === 0) {
      throw new BadArgumentError('name is required!');
    }

    if (Common.isNullOrUndefined(info.gender) || info.gender.trim().length === 0) {
      throw new BadArgumentError('gender is required!');
    }

    if (Common.isNullOrUndefined(info.age)) {
      throw new BadArgumentError('age is required!');
    }

    if (info.age < 0) {
      throw new BadArgumentError('age cannot be less than zero!');
    }

    try {
      info.name = info.name.trim();
      info.gender = info.gender.trim();

      return await this.personRepositoryService.create(info);
    } catch (ex) {
      if (ex.name === 'AlreadyExistsError') {
        throw new AlreadyExistsError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  read = async id => {
    if (Common.isNullOrUndefined(id) || id.length === 0) {
      throw new BadArgumentError('id is required!');
    }

    try {
      return await this.personRepositoryService.read(id);
    } catch (ex) {
      if (ex.name === 'NotFoundError') {
        throw new NotFoundError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  delete = async id => {
    if (Common.isNullOrUndefined(id) || id.length === 0) {
      throw new BadArgumentError('id is required!');
    }

    try {
      await this.personRepositoryService.delete(id);
    } catch (ex) {
      if (ex.name === 'NotFoundError') {
        throw new NotFoundError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  search = async criteria => {
    try {
      if (Common.isNullOrUndefined(criteria)) {
        throw new BadArgumentError('criteria is required!');
      }

      if (criteria.age) {
        const {
          age: { lt, gte },
        } = criteria;

        if (lt && gte) {
          throw new BadArgumentError('Only one of the age.lt and age.gte criteria can be provided');
        }
      }

      return await this.personRepositoryService.search(criteria);
    } catch (ex) {
      throw new UnknownError(ex.message);
    }
  };
}
