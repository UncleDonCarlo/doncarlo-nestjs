import { ApiProperty } from '@nestjs/swagger';

export class PutPublishRequest {
    @ApiProperty()
    id: number;

    @ApiProperty()
    isPublish: boolean;

}
