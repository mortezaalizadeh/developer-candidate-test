import createExpressAppServer from './ExpressAppServer';

const app = createExpressAppServer();

process.on('SIGINT', () => process.exit());

const listeningPort = process.env.PORT ? process.env.PORT : 3001;

app.listen(listeningPort, () => {
  console.log('Server started. Listening port: ' + listeningPort);
});
