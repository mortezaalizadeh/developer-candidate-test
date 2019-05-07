import Chance from 'chance';
import Datastore from 'nedb';
import tmp from 'tmp';
import fs from 'fs';
import Immutable, { Range, Map } from 'immutable';
import PersonRepositoryService from '../PersonRepositoryService';

const chance = new Chance();

describe('PersonRepositoryService', () => {
  let databaseFileName;
  let personDataStore;
  let personRepositoryService;

  beforeEach(() => {
    databaseFileName = tmp.fileSync().name;
    personDataStore = new Datastore(databaseFileName);
    personDataStore.loadDatabase();
    personRepositoryService = new PersonRepositoryService({ personDataStore });
  });

  afterEach(done => {
    fs.unlink(databaseFileName, () => {
      done();
    });
  });

  describe('search', () => {
    it('should return all persons stored in the database', async () => {
      const personsToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() }))
        .toList();

      await Promise.all(personsToCreate.map(person => personRepositoryService.create(person.toJS())).toArray());

      const foundPersons = Immutable.fromJS(await personRepositoryService.search({}));

      expect(personsToCreate.count()).toBe(foundPersons.count());
      expect(
        foundPersons.every(person => {
          const matchedPersons = personsToCreate.filter(personToCreate => personToCreate.get('name') === person.get('name'));

          if (!matchedPersons.count() === 0) {
            return false;
          }

          const matchedPerson = matchedPersons.first();

          return matchedPerson.get('age') === person.get('age') && matchedPerson.get('gender') === person.get('gender');
        }),
      ).toBeTruthy();
    });

    it('should return all persons that their gender match the criteria', async () => {
      const malesToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 0 }), gender: 'male' }))
        .toList();
      const femalesToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 0 }), gender: 'female' }))
        .toList();

      await Promise.all(
        malesToCreate
          .concat(femalesToCreate)
          .map(person => personRepositoryService.create(person.toJS()))
          .toArray(),
      );

      const foundPersons = Immutable.fromJS(await personRepositoryService.search({ gender: 'male' }));

      expect(malesToCreate.count()).toBe(foundPersons.count());
      expect(
        foundPersons.every(person => {
          const matchedPersons = malesToCreate.filter(personToCreate => personToCreate.get('name') === person.get('name'));

          if (!matchedPersons.count() === 0) {
            return false;
          }

          const matchedPerson = matchedPersons.first();

          return matchedPerson.get('age') === person.get('age');
        }),
      ).toBeTruthy();
    });

    it('should return all persons that are younger than what provided in the criteria', async () => {
      const youngersToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 1, max: 49 }), gender: chance.string() }))
        .toList();
      const oldersToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 51, max: 100 }), gender: chance.string() }))
        .toList();

      await Promise.all(
        youngersToCreate
          .concat(oldersToCreate)
          .map(person => personRepositoryService.create(person.toJS()))
          .toArray(),
      );

      const foundPersons = Immutable.fromJS(await personRepositoryService.search({ age: { lt: 50 } }));

      expect(youngersToCreate.count()).toBe(foundPersons.count());
      expect(
        foundPersons.every(person => {
          const matchedPersons = youngersToCreate.filter(personToCreate => personToCreate.get('name') === person.get('name'));

          if (!matchedPersons.count() === 0) {
            return false;
          }

          const matchedPerson = matchedPersons.first();

          return matchedPerson.get('gender') === person.get('gender');
        }),
      ).toBeTruthy();
    });

    it('should return all persons that are older than what provided in the criteria', async () => {
      const youngersToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 1, max: 49 }), gender: chance.string() }))
        .toList();
      const oldersToCreate = Range(0, chance.integer({ min: 10, max: 20 }))
        .map(() => Map({ name: chance.string(), age: chance.integer({ min: 51, max: 100 }), gender: chance.string() }))
        .toList();

      await Promise.all(
        youngersToCreate
          .concat(oldersToCreate)
          .map(person => personRepositoryService.create(person.toJS()))
          .toArray(),
      );

      const foundPersons = Immutable.fromJS(await personRepositoryService.search({ age: { gte: 50 } }));

      expect(oldersToCreate.count()).toBe(foundPersons.count());
      expect(
        foundPersons.every(person => {
          const matchedPersons = oldersToCreate.filter(personToCreate => personToCreate.get('name') === person.get('name'));

          if (!matchedPersons.count() === 0) {
            return false;
          }

          const matchedPerson = matchedPersons.first();

          return matchedPerson.get('gender') === person.get('gender');
        }),
      ).toBeTruthy();
    });
  });
});
