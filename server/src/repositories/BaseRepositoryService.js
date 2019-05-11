import { NotFoundError, AlreadyExistsError, UnknownError } from './Errors';
import { Common } from '../helpers';

export default class BaseRepositoryService {
  constructor(dataStore) {
    if (Common.isNullOrUndefined(dataStore)) {
      throw new Error('dataStore is required!');
    }

    this.dataStore = dataStore;
  }

  create = async info =>
    new Promise((resolve, reject) => {
      this.dataStore.insert(info, (err, newDoc) => {
        if (err) {
          if (err.errorType === 'uniqueViolated') {
            reject(new AlreadyExistsError());
          } else {
            reject(new UnknownError(err));
          }

          return;
        }

        resolve(newDoc);
      });
    });

  read = async _id =>
    new Promise((resolve, reject) => {
      this.dataStore.findOne({ _id }, (err, doc) => {
        if (err) {
          reject(new UnknownError(err));

          return;
        }

        if (doc) {
          resolve(doc);
        } else {
          reject(new NotFoundError());
        }
      });
    });

  delete = async _id =>
    new Promise((resolve, reject) => {
      this.dataStore.remove({ _id }, (err, numRemoved) => {
        if (err) {
          reject(new UnknownError(err));

          return;
        }

        if (numRemoved === 0) {
          reject(new NotFoundError());
        } else {
          resolve();
        }
      });
    });
}
