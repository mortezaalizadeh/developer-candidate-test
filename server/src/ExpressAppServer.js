import express from 'express';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';
import { loadControllers, scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import { asValue, asClass, createContainer } from 'awilix';
import { PersonService } from './business';
import createDataStore from './DataStore';
import { PersonRepositoryService } from './repositories';

const createExpressAppServer = () => {
  const dataStore = createDataStore();
  const container = createContainer();

  container.register({
    personDataStore: asValue(dataStore.persons),
    personRepositoryService: asClass(PersonRepositoryService).scoped(), // Scoped lifetime, new instance per request
    personService: asClass(PersonService).scoped(), // Scoped lifetime, new instance per request
  });

  const app = express();

  app.use(expressStatusMonitor());
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Add the middleware, passing it your Awilix container. This will attach a scoped container on the context.
  app.use(scopePerRequest(container));

  // Loads all controllers in the `routes` folder relative to the current working directory.
  app.use(loadControllers('routes/*.js', { cwd: __dirname }));

  return app;
};

export default createExpressAppServer;
