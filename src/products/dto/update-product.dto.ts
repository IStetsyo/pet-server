import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'product', description: 'Product name' })
  readonly name?: string;
  @ApiProperty({ example: 20, description: 'Product price' })
  readonly price?: number;
  @ApiProperty({ example: 'product', description: 'Product description' })
  readonly description?: string;
}
