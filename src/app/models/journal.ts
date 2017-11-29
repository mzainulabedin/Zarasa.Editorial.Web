import { Entity } from './entity';

export class Journal extends Entity {

    name: string;
    code: string;
    organization_name: string;
    detail: string;
    status: string;
    admin_email: string;
    confirm_email: string;
}
