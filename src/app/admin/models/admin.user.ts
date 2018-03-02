import { Entity } from '../../common/models/entity';

export class AdminUser extends Entity {

    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}
