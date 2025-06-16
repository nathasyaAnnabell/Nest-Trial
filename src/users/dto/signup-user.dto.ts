import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { UserSignIn } from './signin-user.dto';

export class UserSignUp extends UserSignIn {
  @IsString({ message: 'Name should be string' })
  name: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or guest' })
  role?: UserRole;
}
