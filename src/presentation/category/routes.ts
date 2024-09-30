import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from './auth.middleware';
import { CategorService } from '../services/category.service';





export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();

    const categorService= new CategorService;
    const controller = new CategoryController(categorService);
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.get('/', controller.getCategories);
    router.post('/',[AuthMiddleware.validateJWT], controller.createCategory );


    return router;
  }


}

