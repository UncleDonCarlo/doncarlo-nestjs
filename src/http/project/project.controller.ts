import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProjectService } from './project.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(
        private readonly responseTemplate: ResponseTemplate,
        private readonly informationService:ProjectService
    ) { }


    

 

}
