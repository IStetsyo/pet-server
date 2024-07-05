import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Product name',
  })
  accessToken: string;
  @ApiProperty({
    example: '4e4e1ba84573e07b72437a667c8fdd0d22253934',
    description: 'Refresh token',
  })
  refreshToken: string;
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  id: number;
}
