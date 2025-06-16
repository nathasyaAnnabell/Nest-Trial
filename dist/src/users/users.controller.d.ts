import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { UserSignIn } from './dto/signin-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(userSignUpDto: UserSignUp): Promise<{
        user: Partial<User>;
    }>;
    signin(userSignInDto: UserSignIn): Promise<{
        accessToken: string;
        user: Partial<User>;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
