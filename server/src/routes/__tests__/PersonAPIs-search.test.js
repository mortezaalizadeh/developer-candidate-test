import Chance from 'chance';
import HttpStatus from 'http-status-codes';
import { Range, Map } from 'immutable';
import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';
import HttpResponse from './HttpResponse';
import { BadArgumentError, UnknownError } from '../../business';

const chance = new Chance();

describe('PersonAPIs-search', () => {
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

  it('should call personService search method', async () => {
    await personAPIs.search(request, response);
    expect(personService.search.mock.calls).toHaveLength(1);
    expect(personService.search.mock.calls[0][0]).toEqual({});
  });

  it('should call personService search method with provided gender', async () => {
    request.query = { gender: chance.string() };
    await personAPIs.search(request, response);
    expect(personService.search.mock.calls).toHaveLength(1);
    expect(personService.search.mock.calls[0][0]).toEqual({ gender: request.query.gender });
  });

  it('should call personService search method with provided age.lt', async () => {
    request.query = { age_lt: chance.integer({ min: 0 }) };
    await personAPIs.search(request, response);
    expect(personService.search.mock.calls).toHaveLength(1);
    expect(personService.search.mock.calls[0][0]).toEqual({ age: { lt: request.query.age_lt } });
  });

  it('should call personService search method with provided age.gte', async () => {
    request.query = { age_gte: chance.integer({ min: 0 }) };
    await personAPIs.search(request, response);
    expect(personService.search.mock.calls).toHaveLength(1);
    expect(personService.search.mock.calls[0][0]).toEqual({ age: { gte: request.query.age_gte } });
  });

  it('should return error if provided age.lt is not integer', async () => {
    request.query = { age_lt: 'invalid integer' };
    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return error if provided age.gte is not integer', async () => {
    request.query = { age_gte: 'invalid integer' };
    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return the result of call to personService search method', async () => {
    const expectedResult = Range(0, chance.integer({ min: 10, max: 20 }))
      .map(() => Map({ name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() }))
      .toJS();
    personService.search.mockResolvedValue(expectedResult);

    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.content).toBe(expectedResult);
  });

  it('should return bad request error if the call to the personService search method throw BadArgumentError', async () => {
    personService.search.mockRejectedValue(new BadArgumentError());

    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return internbal server error if the call to the personService search method throw UnknownError', async () => {
    const message = chance.string();
    personService.search.mockRejectedValue(new UnknownError(message));

    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });

  it(`should return internbal server error if the call to the personService
      search method throws error different to what the method can handle`, async () => {
    const message = chance.string();
    personService.search.mockRejectedValue(new UnknownError(message));

    await personAPIs.search(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });
});
