import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";


export class ProductService {


    //DI 
    constructor() { }

    async createProduct(createProductDto: CreateProductDto) {

        const productExist = await ProductModel.findOne({ name: createProductDto.name });

        if (productExist) throw CustomError.badRequest('Category already exist');

        try {

            const product = new ProductModel({
                ...createProductDto,
            });

            await product.save();
            return product;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }



    }


    async getProducts(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto



        try {

            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit),
                    // todo:populate
            ]);

            return {
                page: page,
                limit: limit,
                total: total,
                products: products,
            };



        } catch (error) {
            throw CustomError.internalServer('Internal server error');
        }

    }





}