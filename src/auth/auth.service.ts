import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './auth.dto';
import { bcryptConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDTO) {
    const error = { error: true, errorMessages: [] };
    const { email, password, role, username } = body;
    if (!email) error.errorMessages.push('email is required');
    if (!password) error.errorMessages.push('password is required');
    if (!role) error.errorMessages.push('role is required');
    if (!username) error.errorMessages.push('username is required');

    if (error.errorMessages.length) throw new BadRequestException(error);
    console.log(bcryptConstants);

    const hashedPassword = await bcrypt.hash(
      body.password,
      bcryptConstants.saltRounds,
    );

    return this.usersService.createNewUser({
      email: body.email,
      password: hashedPassword,
      role: body.role,
      user_name: body.username,
    });
  }

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    console.log(user);
    if (!user) {
      throw new HttpException(
        {
          error: 'Not a valid username',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const passwordsMatch = await bcrypt.compare(pass, user.password);
    if (!passwordsMatch)
      throw new HttpException(
        {
          error: true,
          messages: ['Credentials do not match'],
        },
        401,
      );

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.user_name,
      }),
    };
  }
}
