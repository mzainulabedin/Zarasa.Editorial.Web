import { ErrorModel } from './error-model';
export class ErrorResponse {
    message: string;
    errors: Array<ErrorModel>;

    /**
     *
     */
    constructor(error: any) {
        if(error){
            this.message  = error.message;
            if(error.errors && Array.isArray(error.errors) && error.errors.length > 0){
                this.errors = new Array<ErrorModel>();
                error.errors.forEach((element:any) => {
                    this.errors.push(new ErrorModel(element.field, element.message));
                });
            }
        }
        
    }
}