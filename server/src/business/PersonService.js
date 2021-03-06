import { BadArgumentError, NotFoundError, AlreadyExistsError, UnknownError } from './Errors';
import { Common } from '../helpers';

export default class PersonService {
  /**
   * @brief. The constructor, dependencies will be inject by the DI framework
   * @param personRepositoryService - service that will create/read/delete/search person information in/from the database
   * @param logger - service that will be used for logging
   * @param sessionId - the unique session ID for the current request
   */
  constructor({ personRepositoryService, logger, sessionId }) {
    if (Common.isNullOrUndefined(personRepositoryService)) {
      throw new Error('personRepositoryService is required!');
    }

    if (Common.isNullOrUndefined(logger)) {
      throw new Error('logger is required!');
    }

    if (Common.isNullOrUndefined(sessionId)) {
      throw new Error('sessionId is required!');
    }

    this.personRepositoryService = personRepositoryService;
    this.logger = logger;
    this.sessionId = sessionId;
  }

  /**
   * @brief. validate person information and pass it on to the repository service to create the person information
   * @param info - the person inforamtion to create
   * @return the created person information as well as the unique id to access the inforamtion later
   */
  create = async info => {
    this.logger.log('info', `${this.sessionId} - Business: trying to create person...`);
    this.logger.log('debug', `${this.sessionId} - Business: create person request content - ${JSON.stringify(info)}`);

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

      const result = await this.personRepositoryService.create(info);

      this.logger.log('info', `${this.sessionId} - Business: create person succeeded`);
      this.logger.log('debug', `${this.sessionId} - Business: create person result - ${JSON.stringify(result)}`);

      return result;
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - Business: create person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'AlreadyExistsError') {
        throw new AlreadyExistsError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  /**
   * @brief. validate person id and pass it on to the repository service to read the existing person information
   * @param id - the person unique identifier to read the person information
   * @return the person information
   */
  read = async id => {
    this.logger.log('info', `${this.sessionId} - Business: trying to read person with id: ${id}...`);

    if (Common.isNullOrUndefined(id) || id.length === 0) {
      throw new BadArgumentError('id is required!');
    }

    try {
      const result = await this.personRepositoryService.read(id);

      this.logger.log('info', `${this.sessionId} - Business: read person with id: ${id} succeeded`);
      this.logger.log('debug', `${this.sessionId} - Business: read person result - ${JSON.stringify(result)}`);

      return result;
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - Business: read person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'NotFoundError') {
        throw new NotFoundError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  /**
   * @brief. validate person id and pass it on to the repository service to delete the existing person information
   * @param id - the person unique identifier to delete the person information
   */
  delete = async id => {
    this.logger.log('info', `${this.sessionId} - Business: trying to delete person with id: ${id}...`);

    if (Common.isNullOrUndefined(id) || id.length === 0) {
      throw new BadArgumentError('id is required!');
    }

    try {
      await this.personRepositoryService.delete(id);

      this.logger.log('info', `${this.sessionId} - Business: delete person with id: ${id} succeeded`);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - Business: delete person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'NotFoundError') {
        throw new NotFoundError();
      } else {
        throw new UnknownError(ex.message);
      }
    }
  };

  /**
   * @brief. validate filter criteria to narrow down the search result looking for existing persons' inforamtion
   * and pass it on to the repository service to find matching persons
   * @param criteria - filter criteria to narrown down the search result
   * @return the matched persons' inforamtion
   */
  search = async criteria => {
    this.logger.log('info', `${this.sessionId} - Business: trying to search for persons with criteria: ${JSON.stringify(criteria)}...`);

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

    try {
      const result = await this.personRepositoryService.search(criteria);

      this.logger.log('info', `${this.sessionId} - Business: search for persons with query: ${JSON.stringify(criteria)} succeeded`);
      this.logger.log('debug', `${this.sessionId} - Business: search for persons result - ${JSON.stringify(result)}`);

      return result;
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - Business: delete person failed ${ex.message}\n${ex.stack}`);

      throw new UnknownError(ex.message);
    }
  };
}
