import Datastore from 'nedb';
import Path from 'path';

/**
 * @brief. setup the dataStore to store persons' information and returns it to the caller
 * @return the dataStore to store persons' information into
 */
const createDataStore = () => {
  // setting up the path to the data storage file, if not provided by the environment variable, `person.db` will be created in the root directory
  const databasePersonFileFullPath = process.env.DATABASE_PERSON_FILE_FULLPATH
    ? process.env.DATABASE_PERSON_FILE_FULLPATH
    : Path.join(__dirname, '..', 'person.db');

  //creating the dataStore instance will be injected by the DI framework later to the repository services to store and access the data
  const dataStore = { persons: new Datastore(databasePersonFileFullPath) };

  // make sure to load the database, otherwise any subsequent call to the dataStore service will hang
  dataStore.persons.loadDatabase();

  return dataStore;
};

export default createDataStore;
