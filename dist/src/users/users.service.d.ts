import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSignUp } from './dto/signup-user.dto';
import { UserSignIn } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    private configService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    signup(userSignUpDto: UserSignUp): Promise<Partial<User>>;
    signin(userSignInDto: UserSignIn): Promise<Partial<User>>;
    create(_createUserDto: CreateUserDto): string;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: number, _updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findUserByEmail(email: string): Promise<User | null>;
    accessToken(payload: Partial<User>): Promise<string>;
}
