import { Entity } from '../../models/entity';

export class User extends Entity {

    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}
