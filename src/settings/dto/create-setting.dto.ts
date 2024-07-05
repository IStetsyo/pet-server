import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({ example: 'theme', description: 'Name of setting' })
  readonly key: string;
  @ApiProperty({ example: 'light', description: 'Value of setting' })
  readonly value: string;
}
