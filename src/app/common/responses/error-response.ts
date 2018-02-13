import { ErrorModel } from './error-model';
import { BaseResponse } from './base-response';
export class ErrorResponse extends BaseResponse {

  errors: Array<ErrorModel>;

  /**
   *
   */
  constructor(error: any) {
    super();
    if (error) {
      this.message = error.message;
      if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        this.errors = new Array<ErrorModel>();
        error.errors.forEach((element: any) => {
          this.errors.push(new ErrorModel(element.field, element.message));
        });
      }
    }
  }
}
