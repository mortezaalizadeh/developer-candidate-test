import { route, GET, DELETE, POST } from 'awilix-express';
import HttpStatus from 'http-status-codes';
import { Common } from '../helpers';

export default
@route('/persons')
class PersonAPIs {
  /**
   * @brief. The constructor, dependencies will be inject by the DI framework
   * @param personService - service that will validate input request and create/delete/read/search person information and pass it on the data layer
   * @param logger - service that will be used for logging
   * @param sessionId - the unique session ID for the current request
   */
  constructor({ personService, logger, sessionId }) {
    if (Common.isNullOrUndefined(personService)) {
      throw new Error('personService is required!');
    }

    if (Common.isNullOrUndefined(logger)) {
      throw new Error('logger is required!');
    }

    if (Common.isNullOrUndefined(sessionId)) {
      throw new Error('sessionId is required!');
    }

    this.personService = personService;
    this.logger = logger;
    this.sessionId = sessionId;
  }

  /**
   * @brief. handler to process create person request
   * @param request - request that contains person infromation to create
   * @param response - the HTTP response that will be filled up with the result of creating person inforamtion
   */
  @POST()
  async create(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - API: trying to create person...`);
      this.logger.log('debug', `${this.sessionId} - API: create person request content - ${JSON.stringify(request.body)}`);

      const result = await this.personService.create(request.body);

      this.logger.log('info', `${this.sessionId} - API: create person succeeded`);
      this.logger.log('debug', `${this.sessionId} - API: create person result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - API: create person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'AlreadyExistsError') {
        response.status(HttpStatus.CONFLICT).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  /**
   * @brief. handler to process read person request
   * @param request - request that contains person id of an existing person in the database to read the infromation from
   * @param response - the HTTP response that contains person inforamtion
   */
  @route('/:id')
  @GET()
  async read(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - API: trying to read person with id: ${request.params.id}...`);

      const result = await this.personService.read(request.params.id);

      this.logger.log('info', `${this.sessionId} - API: read person with id: ${request.params.id} succeeded`);
      this.logger.log('debug', `${this.sessionId} - API: read person result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - API: read person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'NotFoundError') {
        response.status(HttpStatus.NOT_FOUND).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  /**
   * @brief. handler to process delete person request
   * @param request - request that contains person id of an existing person in the database to delete the infromation from
   * @param response - the HTTP response that the result of deleting person information
   */
  @route('/:id')
  @DELETE()
  async delete(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - API: trying to delete person with id: ${request.params.id}...`);

      await this.personService.delete(request.params.id);

      this.logger.log('info', `${this.sessionId} - API: delete person with id: ${request.params.id} succeeded`);

      response.status(HttpStatus.OK).send();
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - API: delete person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'NotFoundError') {
        response.status(HttpStatus.NOT_FOUND).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  /**
   * @brief. handler to process search person request
   * @param request - request that contains criteria to look for existing persons' inforamtion in the database
   * @param response - the HTTP response that contains the person information that matched the filter criteria
   */
  @GET()
  async search(request, response) {
    try {
      let criteria = {};

      this.logger.log('info', `${this.sessionId} - API: trying to search for persons with criteria: ${JSON.stringify(request.query)}...`);

      if (request.query) {
        if (request.query.gender) {
          criteria = Object.assign(criteria, { gender: request.query.gender });
        }

        if (request.query.age_lt) {
          const lt = parseInt(request.query.age_lt);

          if (lt) {
            criteria = Object.assign(criteria, { age: { lt } });
          } else {
            response.status(HttpStatus.BAD_REQUEST).send();

            return;
          }
        }

        if (request.query.age_gte) {
          const gte = parseInt(request.query.age_gte);

          if (gte) {
            criteria = Object.assign(criteria, { age: { gte } });
          } else {
            response.status(HttpStatus.BAD_REQUEST).send();

            return;
          }
        }
      }

      const result = await this.personService.search(criteria);

      this.logger.log('info', `${this.sessionId} - API: search for persons with query: ${JSON.stringify(request.query)} succeeded`);
      this.logger.log('debug', `${this.sessionId} - API: search for persons result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - API: delete person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }
}
