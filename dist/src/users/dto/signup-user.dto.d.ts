import { UserRole } from 'src/utility/common/user-roles.enum';
import { UserSignIn } from './signin-user.dto';
export declare class UserSignUp extends UserSignIn {
    name: string;
    role?: UserRole;
}
