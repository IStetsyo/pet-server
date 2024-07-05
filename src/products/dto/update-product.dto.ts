// import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  readonly name?: string;
  readonly price?: number;
  readonly description?: string;
}
