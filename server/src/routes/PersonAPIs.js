import { route, GET, DELETE, POST } from 'awilix-express';
import HttpStatus from 'http-status-codes';
import { Common } from '../helpers';

export default
@route('/persons')
class PersonAPIs {
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

  @POST()
  async create(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - trying to create person...`);
      this.logger.log('debug', `${this.sessionId} - create person request content - ${JSON.stringify(request.body)}`);

      const result = await this.personService.create(request.body);

      this.logger.log('info', `${this.sessionId} - create person succeeded`);
      this.logger.log('debug', `${this.sessionId} - create person result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - create person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'AlreadyExistsError') {
        response.status(HttpStatus.CONFLICT).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  @route('/:id')
  @GET()
  async read(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - trying to read person with id: ${request.params.id}...`);

      const result = await this.personService.read(request.params.id);

      this.logger.log('info', `${this.sessionId} - read person with id: ${request.params.id} succeeded`);
      this.logger.log('debug', `${this.sessionId} - read person result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - read person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'NotFoundError') {
        response.status(HttpStatus.NOT_FOUND).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  @route('/:id')
  @DELETE()
  async delete(request, response) {
    try {
      this.logger.log('info', `${this.sessionId} - trying to delete person with id: ${request.params.id}...`);

      await this.personService.delete(request.params.id);

      this.logger.log('info', `${this.sessionId} - delete person with id: ${request.params.id} succeeded`);

      response.status(HttpStatus.OK).send();
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - create person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'NotFoundError') {
        response.status(HttpStatus.NOT_FOUND).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }

  @GET()
  async search(request, response) {
    try {
      let criteria = {};

      this.logger.log('info', `${this.sessionId} - trying to search for persons with criteria: ${JSON.stringify(request.query)}...`);

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

      this.logger.log('info', `${this.sessionId} - search for persons with query: ${JSON.stringify(request.query)} succeeded`);
      this.logger.log('debug', `${this.sessionId} - search for persons result - ${JSON.stringify(result)}`);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      this.logger.log('error', `${this.sessionId} - create person failed ${ex.message}\n${ex.stack}`);

      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }
}
