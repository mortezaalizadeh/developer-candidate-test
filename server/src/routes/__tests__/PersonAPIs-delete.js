import Chance from 'chance';
import HttpStatus from 'http-status-codes';
import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';
import HttpResponse from './HttpResponse';
import { BadArgumentError, NotFoundError, UnknownError } from '../../business';

const chance = new Chance();

describe('PersonAPIs-delete', () => {
  let personService;
  let personAPIs;
  let request;
  let response;

  beforeEach(() => {
    personService = new PersonServiceMock();
    personAPIs = new PersonAPIs({ personService });
    request = { params: { id: chance.string() } };
    response = new HttpResponse();
  });

  it('should call personService delete method', async () => {
    await personAPIs.delete(request, response);
    expect(personService.delete.mock.calls).toHaveLength(1);
    expect(personService.delete.mock.calls[0][0]).toBe(request.params.id);
  });

  it('should return the result of call to personService delete method', async () => {
    personService.delete.mockResolvedValue();

    await personAPIs.delete(request, response);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.content).toBe();
  });

  it('should return bad request error if the call to the personService delete method throw BadArgumentError', async () => {
    personService.delete.mockRejectedValue(new BadArgumentError());

    await personAPIs.delete(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return not found error if the call to the personService delete method throw NotFoundError', async () => {
    personService.delete.mockRejectedValue(new NotFoundError());

    await personAPIs.delete(request, response);

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.content).toBeUndefined();
  });

  it('should return internbal server error if the call to the personService delete method throw UnknownError', async () => {
    const message = chance.string();
    personService.delete.mockRejectedValue(new UnknownError(message));

    await personAPIs.delete(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });

  it(`should return internbal server error if the call to the personService
      delete method throws error different to what the method can handle`, async () => {
    const message = chance.string();
    personService.delete.mockRejectedValue(new UnknownError(message));

    await personAPIs.delete(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });
});
