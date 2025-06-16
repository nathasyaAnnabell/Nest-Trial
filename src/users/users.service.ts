/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSignUp } from './dto/signup-user.dto';
import { hash, compare } from 'bcrypt';
import { UserSignIn } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(userSignUpDto: UserSignUp): Promise<Partial<User>> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) throw new BadRequestException('Email is not available');

    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    const user = await this.usersRepository.save(
      this.usersRepository.create(userSignUpDto),
    );

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async signin(userSignInDto: UserSignIn): Promise<Partial<User>> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSignInDto.email })
      .getOne();

    if (!userExists) throw new BadRequestException('Bad credentials');

    const matchPassword = await compare(
      userSignInDto.password,
      userExists.password,
    );

    if (!matchPassword) throw new BadRequestException('Bad credentials');

    const { password, ...userWithoutPassword } = userExists;
    return {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      name: userWithoutPassword.name,
    };
  }

  create(_createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(payload: Partial<User>): Promise<string> {
    try {
      console.log('Payload for JWT:', payload);
      const token = await this.jwtService.signAsync({
        id: payload.id,
        email: payload.email,
      });
      return token;
    } catch (err) {
      console.error('JWT ERROR:', err);
      throw new Error('Failed to generate access token');
    }
  }
}
