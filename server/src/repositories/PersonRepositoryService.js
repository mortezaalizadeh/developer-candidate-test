import BaseRepositoryService from './BaseRepositoryService';
import { UnknownError } from './Errors';

export default class PersonRepositoryService extends BaseRepositoryService {
  constructor({ personDataStore }) {
    super(personDataStore);
  }

  search = async ({ gender, age }) => {
    let criteria = {};

    if (gender) {
      criteria = Object.assign(criteria, { gender });
    }

    if (age && age.lt) {
      criteria = Object.assign(criteria, { age: { $lt: age.lt } });
    }

    if (age && age.gte) {
      criteria = Object.assign(criteria, { age: { $gte: age.gte } });
    }
    return new Promise((resolve, reject) => {
      this.dataStore.find(criteria, (err, docs) => {
        if (err) {
          reject(new UnknownError(err));

          return;
        }

        if (docs) {
          resolve(docs);
        }
      });
    });
  };
}
