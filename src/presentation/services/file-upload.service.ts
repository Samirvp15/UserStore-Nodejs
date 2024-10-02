import { UploadedFile } from "express-fileupload";
import path from 'path';
import fs from 'fs';

export class FileUploadService {
    constructor() { }

    private checkFolder(folderPath: string) {

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        throw new Error('Not implemented');
    }


    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {

        try {
            const fileExtension = file.mimetype.split('/').at(1);
            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            file.mv(destination + `/mi-imagen.${fileExtension}`);


        } catch (error) {
            console.log(error);
        }





    }


    uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) { }



}