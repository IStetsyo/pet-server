// import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  //   @ApiProperty({ example: 'ivar@gmail.com', description: 'User email' })
  readonly email: string;
  //   @ApiProperty({ example: '123123123', description: 'User password' })
  readonly password: string;
  readonly name: string;
}
