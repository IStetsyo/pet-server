import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'product', description: 'Product name' })
  readonly name: string;
  @ApiProperty({ example: 20, description: 'Product price' })
  readonly price: number;
  @ApiProperty({ example: 1, description: 'User id' })
  readonly userId: number;
  @ApiProperty({
    example: '1231.12313.123123',
    description: 'Product location',
  })
  readonly location: string;
  @ApiProperty({ example: 'product', description: 'Product name' })
  readonly description?: string;
}
