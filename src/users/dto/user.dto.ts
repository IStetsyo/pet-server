import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from 'src/products/dto/product.dto';
import { SettingDto } from 'src/settings/dto/setting.dto';

export class UserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: number;
  @ApiProperty({ example: 'ivar@gmail.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: 'ivar', description: 'User name' })
  readonly name: string;
  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'product',
        price: 10,
        userId: 1,
        description: 'product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    description: 'User products',
  })
  readonly products?: ProductDto[];
  @ApiProperty({
    example: [
      {
        id: 1,
        key: 'theme',
        value: 'light',
        userId: 1,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
      },
    ],
    description: 'User products',
  })
  readonly settings?: SettingDto[];
  @ApiProperty({ example: '2022-01-01', description: 'Created at' })
  readonly createdAt: Date;
  @ApiProperty({ example: '2022-01-01', description: 'Updated at' })
  readonly updatedAt: Date;
}
