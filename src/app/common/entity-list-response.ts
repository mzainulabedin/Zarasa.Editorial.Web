export class EntityListResponse<T> {
    message: string;
    data: Array<T>;
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
}
