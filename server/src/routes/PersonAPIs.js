import { route, GET, DELETE, POST } from 'awilix-express';
import HttpStatus from 'http-status-codes';
import { Common } from '../helpers';

export default
@route('/persons')
class PersonAPIs {
  constructor({ personService }) {
    if (Common.isNullOrUndefined(personService)) {
      throw new Error('personService is required!');
    }

    this.personService = personService;
  }

  @POST()
  async create(request, response) {
    try {
      const result = await this.personService.create(request.body);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else if (ex.name === 'AlreadyExists') {
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
      const result = await this.personService.read(request.params.id);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
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
      const result = await this.personService.delete(request.params.id);

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
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

      response.status(HttpStatus.OK).send(result);
    } catch (ex) {
      if (ex.name === 'BadArgumentError') {
        response.status(HttpStatus.BAD_REQUEST).send();
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ex.message);
      }
    }
  }
}
