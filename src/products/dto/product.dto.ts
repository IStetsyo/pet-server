import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ProductDto {
  @ApiProperty({ example: '1', description: 'Product id' })
  readonly id: number;
  @ApiProperty({ example: 'product', description: 'Product name' })
  readonly name: string;
  @ApiProperty({ example: 20, description: 'Product price' })
  readonly price: number;
  @ApiProperty({
    example: [`${randomUUID()}.png`, `${randomUUID()}.png`],
    description: 'Product name',
  })
  readonly imageUrls: string[];
  @ApiProperty({ example: 1, description: 'User id' })
  readonly userId: number;
  @ApiProperty({ example: 'product', description: 'Product description' })
  readonly description: string;
  readonly location: string;
  @ApiProperty({ example: '2022-01-01', description: 'Created at' })
  readonly createdAt: Date;
  @ApiProperty({ example: '2022-01-01', description: 'Updated at' })
  readonly updatedAt: Date;
}
