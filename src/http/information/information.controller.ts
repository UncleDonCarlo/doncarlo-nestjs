import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { InformationRequest } from './dto/informationRequest';
import { InformationService } from './information.service';
import { PutPublishRequest } from './dto/putIsPublishRequest';

@ApiTags('informations')
@Controller('informations')
export class InformationController {
    constructor(
        private readonly responseTemplate: ResponseTemplate,
        private readonly informationService:InformationService
    ) { }

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    @ApiOperation({ summary: 'Create a Information', description: 'This endpoint creates a new Informations and returns the response.' })
    async createUser(@Body() informationRequest: InformationRequest, @Res() res: Response) {
      return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.createInformation(informationRequest)));
    }

    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getAllInformations(
        @Query('page', new DefaultValuePipe(1) , ParseIntPipe) page:number,
        @Query('limit', new DefaultValuePipe(10) , ParseIntPipe) limit:number,
        @Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.getAllInformation(page,limit)));
    }

    @Put('/isPublish')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async putIsPublishInformations(@Body() PutPublishRequest:PutPublishRequest , @Res() res: Response) {
      return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.updatePublish(PutPublishRequest)));
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async modifyInformation(@Param('id') id: number, @Body() InformationRequest: InformationRequest,@Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.modifyInformation(id,InformationRequest)));
    }

    
    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async deleteInformation(@Param('id') id: number,@Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.deleteInformation(id)));
    }

}
