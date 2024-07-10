import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNo: string;
}
