

// LAS ENTIDADES NOS VA A PERMITIR CONVERTIR DATA OBTENIDA DESDE LA DB(models - schemas)
// EN OBJETOS PARA NUESTRA LOGICA DE NEGOCIO DE ESTA MANERA SE
// SEPARA LA CAPA DE PERSISTENCIA DE DATOS Y DESACOPLAR DEPENDENCIA DE 
// LA OBTENCION DE DATA, ASI PODEMOS CAMBIAR FACILMENTE NUESTRA 
// FUENTE DE DATOS SIN AFECTAR LA LOGICA DE LA APLICACION.

import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {

        const { id, _id, name, email, emailValidated, password, role, img } = object;

        if (!id && !_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) throw CustomError.badRequest('Missing name!!!');
        if (!email) throw CustomError.badRequest('Missing email!')
        if (emailValidated === undefined) throw CustomError.badRequest('Missing emailvalidated!!!')
        if (!password) throw CustomError.badRequest('Missing password!!');
        if (!role) throw CustomError.badRequest('Missing role!!!');

        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);

    }


}