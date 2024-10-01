import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadController } from './controller';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();

    //const categorService= new CategorService;
    const controller = new FileUploadController();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.get('/single/:type', controller.uploadFile);
    router.get('/multiple/:type', controller.uploadMultipleFile );


    return router;
  }


}

