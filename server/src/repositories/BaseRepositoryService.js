import { NotFoundError, AlreadyExistsError, UnknownError } from './Errors';
import { Common } from '../helpers';

export default class BaseRepositoryService {
  /**
   * @brief. The constructor
   * @param dataStore - service that will be used to create/read/delete/search data in/from the database
   * @param logger - service that will be used for logging
   * @param sessionId - the unique session ID for the current request
   */
  constructor(dataStore, logger, sessionId) {
    if (Common.isNullOrUndefined(dataStore)) {
      throw new Error('dataStore is required!');
    }

    if (Common.isNullOrUndefined(logger)) {
      throw new Error('logger is required!');
    }

    if (Common.isNullOrUndefined(sessionId)) {
      throw new Error('sessionId is required!');
    }

    this.dataStore = dataStore;
    this.logger = logger;
    this.sessionId = sessionId;
  }

  /**
   * @brief. creates the provided information in the dataStore
   * @param info - the information to create
   * @return the created information as well as the unique id to access the inforamtion later
   */
  create = async info => {
    // making sure we capture the `this` context, so the in the promise we refer to the right object
    const self = this;

    self.logger.log('info', `${self.sessionId} - Repository: trying to create ...`);
    self.logger.log('debug', `${self.sessionId} - Repository: create request content - ${JSON.stringify(info)}`);

    return new Promise((resolve, reject) => {
      // tryuing to create the document in the dataStore
      self.dataStore.insert(info, (err, newDoc) => {
        if (err) {
          self.logger.log('error', `${self.sessionId} - Repository: create failed ${err}`);

          if (err.errorType === 'uniqueViolated') {
            // a document with the same _id already exists in the database
            reject(new AlreadyExistsError());
          } else {
            // unknow error occurred
            reject(new UnknownError(err));
          }

          return;
        }

        self.logger.log('info', `${self.sessionId} - Repository: create succeeded`);
        self.logger.log('debug', `${self.sessionId} - Repository: create result - ${JSON.stringify(newDoc)}`);

        // successfully created the document
        resolve(newDoc);
      });
    });
  };

  /**
   * @brief. read an existing information identified by the provided _id from the dataStore
   * @param _id - the unique identifier to read the information from the dataStore
   * @return the existing information identified by the provided _id
   */
  read = async _id => {
    // making sure we capture the `this` context, so the in the promise we refer to the right object
    const self = this;

    return new Promise((resolve, reject) => {
      // Looking for a single document to delete from the dataStore
      self.dataStore.findOne({ _id }, (err, doc) => {
        if (err) {
          self.logger.log('error', `${self.sessionId} - Repository: read failed ${err}`);

          // unknow error occurred
          reject(new UnknownError(err));

          return;
        }

        if (doc) {
          self.logger.log('info', `${self.sessionId} - Repository: read with id: ${_id} succeeded`);
          self.logger.log('debug', `${self.sessionId} - Repository: read result - ${JSON.stringify(doc)}`);

          // successfully read the document
          resolve(doc);
        } else {
          // _id did not match any document in the dataStore
          reject(new NotFoundError());
        }
      });
    });
  };

  /**
   * @brief. delete an existing information identified by the provided _id from the dataStore
   * @param _id - the unique identifier to delete existing inforamtion from the dataStore
   */
  delete = async _id => {
    // making sure we capture the `this` context, so the in the promise we refer to the right object
    const self = this;

    self.logger.log('info', `${self.sessionId} - Repository: trying to delete with id: ${_id}...`);

    return new Promise((resolve, reject) => {
      // looking for a single document to delete form the dataStore
      self.dataStore.remove({ _id }, (err, numRemoved) => {
        if (err) {
          self.logger.log('error', `${self.sessionId} - Repository: delete failed ${err}`);

          // unknow error occurred
          reject(new UnknownError(err));

          return;
        }

        if (numRemoved === 0) {
          // _id did not match any document in the dataStore
          reject(new NotFoundError());
        } else {
          self.logger.log('info', `${self.sessionId} - Repository: delete with id: ${_id} succeeded`);

          // successfully deleted the document
          resolve();
        }
      });
    });
  };
}
