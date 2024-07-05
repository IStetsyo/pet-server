// import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  // readonly imageUrls: string[];
  readonly userId: number;
  readonly description?: string;
}
