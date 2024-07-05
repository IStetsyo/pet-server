import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {
  @ApiProperty({ example: '1', description: 'Setting id' })
  readonly id: number;
  @ApiProperty({ example: 'theme', description: 'Name of setting' })
  readonly key: string;
  @ApiProperty({ example: 'light', description: 'Value of setting' })
  readonly value: string;
  @ApiProperty({ example: 1, description: 'User id' })
  readonly userId: number;
  @ApiProperty({ example: '2022-01-01', description: 'Created at' })
  readonly createdAt: Date;
  @ApiProperty({ example: '2022-01-01', description: 'Updated at' })
  readonly updatedAt: Date;
}
