import createExpressAppServer from './ExpressAppServer';

process.on('SIGINT', () => process.exit());

// setting up the  listening port for serve the HTTP requests on, if not provided by the environment variable,
// `3001` will be used as the default listening port
const listeningPort = process.env.PORT ? process.env.PORT : 3001;

//create the app server
const app = createExpressAppServer();

// start listening on the port and serving HTTP request
app.listen(listeningPort, () => {
  console.log('Server started. Listening port: ' + listeningPort);
});
