import cuid from 'cuid';
import Chance from 'chance';
import HttpStatus from 'http-status-codes';
import { LoggerMock } from '../../__mocks__';
import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';
import HttpResponse from './HttpResponse';
import { BadArgumentError, NotFoundError, UnknownError } from '../../business';

const chance = new Chance();

describe('PersonAPIs-read', () => {
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
    request = { params: { id: chance.string() } };
    response = new HttpResponse();
  });

  it('should call personService read method', async () => {
    await personAPIs.read(request, response);
    expect(personService.read.mock.calls).toHaveLength(1);
    expect(personService.read.mock.calls[0][0]).toBe(request.params.id);
  });

  it('should return the result of call to personService read method', async () => {
    const expectedResult = { _id: chance.string(), name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() };

    personService.read.mockResolvedValue(expectedResult);

    await personAPIs.read(request, response);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.content).toBe(expectedResult);
  });

  it('should return bad request error if the call to the personService read method throw BadArgumentError', async () => {
    personService.read.mockRejectedValue(new BadArgumentError());

    await personAPIs.read(request, response);

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.content).toBeUndefined();
  });

  it('should return not found error if the call to the personService read method throw NotFoundError', async () => {
    personService.read.mockRejectedValue(new NotFoundError());

    await personAPIs.read(request, response);

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.content).toBeUndefined();
  });

  it('should return internbal server error if the call to the personService read method throw UnknownError', async () => {
    const message = chance.string();
    personService.read.mockRejectedValue(new UnknownError(message));

    await personAPIs.read(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });

  it(`should return internbal server error if the call to the personService
      read method throws error different to what the method can handle`, async () => {
    const message = chance.string();
    personService.read.mockRejectedValue(new UnknownError(message));

    await personAPIs.read(request, response);

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.content).toBe(message);
  });
});
