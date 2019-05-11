import cuid from 'cuid';
import Chance from 'chance';
import HttpStatus from 'http-status-codes';
import { LoggerMock } from '../../__mocks__';
import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';
import HttpResponse from './HttpResponse';
import { BadArgumentError, AlreadyExistsError, UnknownError } from '../../business';

const chance = new Chance();

describe('PersonAPIs-create', () => {
  let personService;
  let logger;
  let sessionId;
  let personAPIs;
  let request;
  let response;

  beforeEach(() => {
    personService = new PersonServiceMock();
    logger = new LoggerMock();
    sessionId = cuid();
    personAPIs = new PersonAPIs({ personService, logger, sessionId });
    request = { body: { name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() } };
    response = new HttpResponse();
  });

  it('should call personService create method', async () => {
    await personAPIs.create(request, response);
    expect(personService.create.mock.calls).toHaveLength(1);
    expect(personService.create.mock.calls[0][0]).toBe(request.body);
  });

  it('should return the result of call to personService create method', async () => {
    const expectedResult = Object.assign(request.body, { _id: chance.string() });

    personService.create.mockResolvedValue(expectedResult);

    await personAPIs.create(request, response);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.content).toBe(request.body);
  });

  it('should return bad request error if the call to the personService create method throw BadArgumentError', async () => {
    personService.create.mockRejectedValue(new BadArgumentError());

    await personAPIs.create(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return conflict error if the call to the personService create method throw AlreadyExistsError', async () => {
    personService.create.mockRejectedValue(new AlreadyExistsError());

    await personAPIs.create(request, response);

    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
    expect(response.content).toBeUndefined();
  });

  it('should return internbal server error if the call to the personService create method throw UnknownError', async () => {
    const message = chance.string();
    personService.create.mockRejectedValue(new UnknownError(message));

    await personAPIs.create(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });

  it(`should return internbal server error if the call to the personService
      create method throws error different to what the method can handle`, async () => {
    const message = chance.string();
    personService.create.mockRejectedValue(new UnknownError(message));

    await personAPIs.create(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });
});
