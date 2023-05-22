import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDTO, SignUpDTO } from './auth.dto';
import { SkipAuth } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  @SkipAuth()
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }
  @Post('login')
  @SkipAuth()
  logIn(@Body() body: LogInDTO) {
    return this.authService.signIn(body.username, body.password);
  }
}
