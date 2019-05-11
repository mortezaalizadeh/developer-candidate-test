import BaseRepositoryService from './BaseRepositoryService';
import { UnknownError } from './Errors';

export default class PersonRepositoryService extends BaseRepositoryService {
  /**
   * @brief. The constructor, dependencies will be inject by the DI framework
   * @param personDataStore - service that will be used to store person data
   * @param logger - service that will be used for logging
   * @param sessionId - the unique session ID for the current request
   */
  constructor({ personDataStore, logger, sessionId }) {
    super(personDataStore, logger, sessionId);
  }

  /**
   * @brief. look for the existing persons' inforamtion in the personDataStore
   * @param gender - if provided, the search result will be narrowed down by persons' informtion
   * that their gender matches the provided gender
   * @param age.lt - if provided, the search result will be narrowed down by persons' informtion
   * that their age is less than the provided age
   * @param age.gte - if provided, the search result will be narrowed down by persons' informtion
   * that their age is older or equal than the provided age
   * @return the list of matched persons' information
   */
  search = async ({ gender, age }) => {
    // making sure we capture the `this` context, so the in the promise we refer to the right object
    const self = this;

    self.logger.log('info', `${self.sessionId} - Repository: trying to search for persons with criteria: ${JSON.stringify({ gender, age })}...`);
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
      // looking for all persons information that matches the provided criteria
      self.dataStore.find(criteria, (err, docs) => {
        if (err) {
          self.logger.log('error', `${self.sessionId} - Repository: seach for persons failed ${err}`);
          // unknow error occurred
          reject(new UnknownError(err));

          return;
        }

        if (docs) {
          self.logger.log('info', `${self.sessionId} - Repository: search for persons with query: ${JSON.stringify(criteria)} succeeded`);
          self.logger.log('debug', `${self.sessionId} - Repository: search for persons result - ${JSON.stringify(docs)}`);

          // successfully retreived the matched person inforamtion
          resolve(docs);
        }
      });
    });
  };
}
