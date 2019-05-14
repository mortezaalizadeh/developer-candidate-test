import Chance from 'chance';
import tmp from 'tmp';
import fs from 'fs';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import createExpressAppServer from '../ExpressAppServer';

const chance = new Chance();

const databaseFileName = tmp.fileSync().name;
process.env.DATABASE_PERSON_FILE_FULLPATH = databaseFileName;

const app = createExpressAppServer();

afterAll(done => {
  fs.unlink(databaseFileName, () => {
    done();
  });
});

describe('Integration tests', () => {
  it('should fail to create if provided information is incorrect', done => {
    request(app)
      .post('/persons')
      .send({ name: '', age: chance.integer({ min: 0 }), gender: chance.string() })
      .expect(HttpStatus.BAD_REQUEST, done);
  });

  it('should fail to read the person info if provided id does not belong to an existing person', done => {
    request(app)
      .get('/persons/XXXXXXXXXXX')
      .expect(HttpStatus.NOT_FOUND, done);
  });

  it('should fail to delete the person info if provided id does not belong to an existing person', done => {
    request(app)
      .delete('/persons/XXXXXXXXXXX')
      .expect(HttpStatus.NOT_FOUND, done);
  });

  describe('create, read the created person info, search for created person info and delete the person', () => {
    let info;
    let person;

    beforeAll(() => {
      info = { name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() };
    });

    it('should create person info', done => {
      request(app)
        .post('/persons')
        .send(info)
        .expect(HttpStatus.OK)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          person = response.body;

          done();
        });
    });

    it('should read the person info', done => {
      request(app)
        .get('/persons/' + person._id)
        .send(info)
        .expect(HttpStatus.OK)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          expect(response.body._id).toBe(person._id);
          expect(response.body.name).toBe(info.name);
          expect(response.body.age).toBe(info.age);
          expect(response.body.gender).toBe(info.gender);

          done();
        });
    });

    it('should find the person through the seach function', done => {
      request(app)
        .get('/persons?gender=' + person.gender)
        .expect(HttpStatus.OK)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          expect(response.body).toHaveLength(1);
          expect(response.body[0]._id).toBe(person._id);
          expect(response.body[0].name).toBe(info.name);
          expect(response.body[0].age).toBe(info.age);
          expect(response.body[0].gender).toBe(info.gender);

          done();
        });
    });

    it('should delete the person info', done => {
      request(app)
        .delete('/persons/' + person._id)
        .expect(HttpStatus.OK, done);
    });

    it('should fail to read the deleted person info', done => {
      request(app)
        .get('/persons/' + person._id)
        .expect(HttpStatus.NOT_FOUND, done);
    });

    it('should fail to find the person through the seach function', done => {
      request(app)
        .get('/persons?gender=' + person.gender)
        .expect(HttpStatus.OK)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          expect(response.body).toHaveLength(0);

          done();
        });
    });
  });
});
