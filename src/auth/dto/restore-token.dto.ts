import { ApiProperty } from '@nestjs/swagger';

export class RestoreTokenDto {
  @ApiProperty({
    example: '4e4e1ba84573e07b72437a667c8fdd0d22253934',
    description: 'Refresh token',
  })
  readonly refreshToken: string;
}
