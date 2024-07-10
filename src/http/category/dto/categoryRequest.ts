import { ApiProperty } from '@nestjs/swagger';

export class CategoryRequest {
  @ApiProperty()
  name: string;
}
