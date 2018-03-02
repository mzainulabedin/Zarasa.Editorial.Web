import { Entity } from '../../common/models/entity';


export class AdminJournal extends Entity {

    name: string;
    code: string;
    organization_name: string;
    detail: string;
    status: string;
    admin_email: string;
    confirm_email: string;
}
