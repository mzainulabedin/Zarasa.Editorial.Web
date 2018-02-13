import { BaseResponse } from './base-response';
export class EntityListResponse<T> extends BaseResponse {
    data: Array<T>;
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
}
