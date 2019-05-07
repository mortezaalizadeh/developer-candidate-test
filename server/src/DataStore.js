import Datastore from 'nedb';
import Path from 'path';

const createDataStore = () => {
  const databasePersonFileFullPath = process.env.DATABASE_PERSON_FILE_FULLPATH
    ? process.env.DATABASE_PERSON_FILE_FULLPATH
    : Path.join(__dirname, '..', 'person.db');
  const dataStore = { persons: new Datastore(databasePersonFileFullPath) };

  dataStore.persons.loadDatabase();

  return dataStore;
};

export default createDataStore;
