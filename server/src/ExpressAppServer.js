import express from 'express';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';
import { loadControllers, scopePerRequest } from 'awilix-express';
import bodyParser from 'body-parser';
import { asValue, asClass, createContainer } from 'awilix';
import cuid from 'cuid';
import { PersonService } from './business';
import createDataStore from './DataStore';
import logger from './Logger';
import { PersonRepositoryService } from './repositories';

/**
 * @brief. setup the app server and return the instance to the caller
 * @return the app server instance
 */
const createExpressAppServer = () => {
  const dataStore = createDataStore();
  const container = createContainer();

  // setting up the DI container and registering the required services by all different layers
  container.register({
    logger: asValue(logger),
    personDataStore: asValue(dataStore.persons),
    personRepositoryService: asClass(PersonRepositoryService).scoped(), // Scoped lifetime, new instance per request
    personService: asClass(PersonService).scoped(), // Scoped lifetime, new instance per request
  });

  const app = express();

  // Express monitor will report lifetime server metrics on ${base_end_point}/metrics
  app.use(expressStatusMonitor());

  // this middleware wil lbe used to enable CORS in the ExpressJS, the webserver
  app.use(cors());

  // parse incoming request bodies in a middleware before your the routing layer, available under the req.body property
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Add the middleware, passing it your Awilix container. This will attach a scoped container on the context.
  app.use(scopePerRequest(container));

  // create unqiue session identifier for each incoming request and inject it to the service using the DI framework
  app.use((request, response, next) => {
    request.container.register({
      sessionId: asValue(cuid()), // create a sessionID
    });

    return next();
  });

  // Loads all controllers in the `routes` folder relative to the current working directory.
  app.use(loadControllers('routes/*.js', { cwd: __dirname }));

  return app;
};

export default createExpressAppServer;
