import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { error } from "console";


export class AuthController {

    // DI
    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }


    registerUser = (req: Request, res: Response) => {

        // EL RegisterUserDto VALIDA LOS DATOS DE LA REQUEST
        const [error, registerDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        // EL SERVICIO SE ENCARGA DE PROCESAR LA REQUEST
        this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {

        // EL LoginUserDto VALIDA LOS DATOS DE LA REQUEST
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        // EL SERVICIO SE ENCARGA DE PROCESAR EL LOGIN  
        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {

        const { token } = req.params;
       
        this.authService.validateEmail(token)
            .then(() => res.json('Email validated'))
            .catch(error => this.handleError(error,res));

    }





}