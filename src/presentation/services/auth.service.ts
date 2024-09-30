import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";




export class AuthService {

    // DI
    constructor(
        // DI -EMAIL SERVICE
    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            const user = new UserModel(registerUserDto);
        
            // ENCRIPTAR PASSWORD
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();
            

            // EMAIL DE CONFIRMACION



            const {password, ...userEntity} = UserEntity.fromObject(user);

            return {
                user: {...userEntity},
                token: 'ABC',
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        
        if (!user) throw CustomError.badRequest('Invalid credentials');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

        if (!isMatching) throw CustomError.badRequest('Password incorrect');

        const {password, ...userEntity} = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({id: user.id});

        if (!token) throw CustomError.internalServer('Error creating JWT');



        return {
            user: userEntity,//no password
            token: token,
        }

    }

}