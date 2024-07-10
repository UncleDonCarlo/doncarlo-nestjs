import { ApiProperty } from '@nestjs/swagger';

export class InformationRequest {
    @ApiProperty()
    message: string;

    @ApiProperty()
    category_id: number;

}
