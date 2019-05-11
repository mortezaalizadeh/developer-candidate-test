import Chance from 'chance';
import Datastore from 'nedb';
import tmp from 'tmp';
import fs from 'fs';
import BaseRepositoryService from '../BaseRepositoryService';
import { NotFoundError, AlreadyExistsError } from '../Errors';

const chance = new Chance();

describe('BaseRepositoryService', () => {
  let databaseFileName;
  let dataStore;
  let baseRepositoryService;
  let info;

  beforeEach(() => {
    databaseFileName = tmp.fileSync().name;
    dataStore = new Datastore(databaseFileName);
    dataStore.loadDatabase();
    baseRepositoryService = new BaseRepositoryService(dataStore);
    info = { name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() };
  });

  afterEach(done => {
    fs.unlink(databaseFileName, () => {
      done();
    });
  });

  describe('create', () => {
    it('should create the new document', async () => {
      const newDoc = await baseRepositoryService.create(info);

      expect(newDoc._id).toBeDefined();

      const promise = new Promise((resolve, reject) => {
        dataStore.findOne({ _id: newDoc._id }, (err, doc) => {
          if (err) {
            reject(err);

            return;
          }

          if (doc) {
            resolve(doc);
          } else {
            reject(new Error('Not Found'));
          }
        });
      });

      const result = await promise;

      expect(result.name).toEqual(info.name);
      expect(result.age).toEqual(info.age);
      expect(result.gender).toEqual(info.gender);
    });

    it('should throw AlreadyExistsError if document already exists with the same id', async () => {
      const newDoc = await baseRepositoryService.create(info);

      expect(baseRepositoryService.create(newDoc)).rejects.toThrowError(new AlreadyExistsError());
    });
  });

  describe('read', () => {
    it('should read an existing document', async () => {
      const promise = new Promise((resolve, reject) => {
        dataStore.insert(info, (err, newDoc) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(newDoc);
        });
      });

      const newDoc = await promise;
      const existingDoc = await baseRepositoryService.read(newDoc._id);

      expect(existingDoc.name).toEqual(info.name);
      expect(existingDoc.age).toEqual(info.age);
      expect(existingDoc.gender).toEqual(info.gender);
    });

    it('should throw NotFoundError if document does not exist', async () => {
      expect(baseRepositoryService.read(chance.string())).rejects.toThrowError(new NotFoundError());
    });
  });

  describe('delete', () => {
    it('should delete an existing document', async () => {
      let promise = new Promise((resolve, reject) => {
        dataStore.insert(info, (err, newDoc) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(newDoc);
        });
      });

      const newDoc = await promise;

      await baseRepositoryService.delete(newDoc._id);

      promise = new Promise((resolve, reject) => {
        dataStore.findOne({ _id: newDoc._id }, (err, doc) => {
          if (err) {
            reject(err);

            return;
          }

          if (doc) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });

      const result = await promise;

      expect(result).toBeFalsy();
    });

    it('should throw NotFoundError if document does not exist', async () => {
      expect(baseRepositoryService.delete(chance.string())).rejects.toThrowError(new NotFoundError());
    });
  });
});
