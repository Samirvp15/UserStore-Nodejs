import { createServer } from 'http';
import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async () => {
  main();
})();


async function main() {

  // await MongoDatabase.connect({
  //   dbName: envs.MONGO_DB_NAME,
  //   mongoUrl: envs.MONGO_URL,
  // });

  const server = new Server({
    port: envs.PORT,
  });


  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });


  server.setRoutes(AppRoutes.routes);


  httpServer.listen(envs.PORT, () => {
    console.log(`Server on port: ${envs.PORT}`);
  })



  //server.start();
}