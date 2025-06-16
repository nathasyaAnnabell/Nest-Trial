import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { UserSignIn } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() userSignUpDto: UserSignUp,
  ): Promise<{ user: Partial<User> }> {
    const user = await this.usersService.signup(userSignUpDto);
    return { user };
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignIn) {
    try {
      const user = await this.usersService.signin(userSignInDto);
      const accessToken = await this.usersService.accessToken(user);
      return { accessToken, user };
    } catch (error) {
      console.error('SIGNIN ERROR:', error);
      throw error;
    }
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
