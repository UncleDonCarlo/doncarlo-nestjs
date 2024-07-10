import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { InformationRequest } from './dto/informationRequest';
import { InformationService } from './information.service';

@ApiTags('informations')
@Controller('informations')
export class InformationController {
    constructor(
        private readonly responseTemplate: ResponseTemplate,
        private readonly informationService:InformationService
    ) { }

    @Post('/')
    async createUser(@Body() informationRequest: InformationRequest, @Res() res: Response) {
      return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.createInformation(informationRequest)));
    }

    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getAllInformations(@Res() res: Response) {
      return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.informationService.getAllInformation()));
    }

}
