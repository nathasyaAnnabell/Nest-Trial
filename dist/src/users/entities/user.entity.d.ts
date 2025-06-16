import { Timestamp } from 'typeorm';
import { UserRole } from 'src/utility/common/user-roles.enum';
export declare class User {
    id: string;
    email: string;
    password: string;
    name?: string;
    role: UserRole;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
