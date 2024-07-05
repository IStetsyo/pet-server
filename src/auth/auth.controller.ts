import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() input: SignInDto) {
    return this.auth.signIn(input);
  }
  @Post('/sign-up')
  signUp(@Body() input: SignUpDto) {
    return this.auth.signUp(input);
  }
  @Post('/restore-token')
  restoreTOken(
    @Param('id') id: string,
    @Body() input: { refreshToken: string },
  ) {
    return this.auth.restoreToken(+id, input.refreshToken);
  }
}
