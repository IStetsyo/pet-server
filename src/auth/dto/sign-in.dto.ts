// import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  //   @ApiProperty({ example: 'ivar@gmail.com', description: 'User email' })
  readonly email: string;
  //   @ApiProperty({ example: '123123123', description: 'User password' })
  readonly password: string;
}
