import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';





export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();

    const fileUploadService= new FileUploadService();
    const controller = new FileUploadController(fileUploadService);
    
    router.use(FileUploadMiddleware.containFiles);
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile );


    return router;
  }


}

