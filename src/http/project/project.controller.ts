import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete, Query, DefaultValuePipe, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProjectService } from './project.service';
import { ProjectRequest } from './dto/projectRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { Request } from 'express';
import { CreateProjectSwaggerSchema } from './dto/projectBody';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(
        private readonly responseTemplate: ResponseTemplate,
        private readonly projectService:ProjectService
    ) { }

    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getAllInformations(
        @Query('page', new DefaultValuePipe(1) , ParseIntPipe) page:number,
        @Query('limit', new DefaultValuePipe(10) , ParseIntPipe) limit:number,
        @Res() res: Response
    ) {
        return res.status(200).json(
            await this.responseTemplate.createResponseTemplate(() => 
                this.projectService.getAllProject(page,limit)
            )
        );
    }

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req:Request, file:any, cb:any) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        }),
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody(CreateProjectSwaggerSchema)
    @ApiOperation({ summary: 'Create a Project', description: 'This endpoint creates a new project and returns the response.' })
    async createUser(
        @Body() projectRequest: ProjectRequest,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        return res.status(200).json(
            await this.responseTemplate.createResponseTemplate(() => 
                this.projectService.createProject(projectRequest, file)
            )
        );
    }


 

}
