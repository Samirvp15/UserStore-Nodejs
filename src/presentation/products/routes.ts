import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductService } from '../services/product.service';



export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();

    const productService= new ProductService;
    const controller = new ProductController(productService);
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.get('/', controller.getProducts);
    router.post('/',[AuthMiddleware.validateJWT], controller.createProduct );


    return router;
  }


}

