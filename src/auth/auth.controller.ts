import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RestoreTokenDto } from './dto/restore-token.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post('/sign-in')
  signIn(@Body() input: SignInDto) {
    return this.auth.signIn(input);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post('/sign-up')
  signUp(@Body() input: SignUpDto) {
    return this.auth.signUp(input);
  }

  @ApiOperation({ summary: 'Restore token' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post('/restore-token')
  restoreTOken(@Param('id') id: string, @Body() input: RestoreTokenDto) {
    return this.auth.restoreToken(+id, input.refreshToken);
  }
}
