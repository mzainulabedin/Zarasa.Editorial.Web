import { BaseResponse } from './base-response';
export class EntityResponse<T> extends BaseResponse {
    data: T;
}
