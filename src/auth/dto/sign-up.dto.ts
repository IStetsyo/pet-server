import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'ivar@gmail.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: '123qweqwe', description: 'User password' })
  readonly password: string;
  @ApiProperty({ example: 'ivar', description: 'User name' })
  readonly name: string;
}
