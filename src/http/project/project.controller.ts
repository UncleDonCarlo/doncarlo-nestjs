import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete, Query, DefaultValuePipe, ParseIntPipe, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProjectService } from './project.service';
import { ProjectRequest } from './dto/projectRequest';
import { Express } from 'express';
import { CreateProjectSwaggerSchema } from './dto/projectBody';
import { FileImageUploadInterceptor } from 'src/utils/fileInterceptor';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
    constructor(
        private readonly responseTemplate: ResponseTemplate,
        private readonly projectService:ProjectService
    ) { }

    @Get('/')
    async getAllProjects(
        @Query('page', new DefaultValuePipe(1) , ParseIntPipe) page:number,
        @Query('limit', new DefaultValuePipe(10) , ParseIntPipe) limit:number,
        @Res() res: Response
    ) {
        return await this.responseTemplate.createResponseTemplate(() => 
            this.projectService.getAllProject(page,limit)
        );
    }

    @Post('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    @UseInterceptors(FileImageUploadInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody(CreateProjectSwaggerSchema)
    @ApiOperation({ summary: 'Create a Project', description: 'This endpoint creates a new project and returns the response.' })
    async createUser(
        @Body() projectRequest: ProjectRequest,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        return await this.responseTemplate.createResponseTemplate(() => 
            this.projectService.createProject(projectRequest, file)
        );
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getProjectById(@Param('id') id: number, @Res() res: Response) {
        return res.status(200).json(
            await this.responseTemplate.createResponseTemplate(() => 
                this.projectService.getProjectById(id)
            )
        );
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    @UseInterceptors(FileImageUploadInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody(CreateProjectSwaggerSchema)
    @ApiOperation({ summary: 'Update a Project', description: 'This endpoint updates an existing project and returns the response.' })
    async updateProject(
        @Param('id') id: number,
        @Body() projectRequest: ProjectRequest,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        return await this.responseTemplate.createResponseTemplate(() => 
            this.projectService.updateProject(id, projectRequest, file)
        );
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    @UseInterceptors(FileImageUploadInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody(CreateProjectSwaggerSchema)
    @ApiOperation({ summary: 'Patch a Project', description: 'This endpoint patches an existing project and returns the response.' })
    async patchProject(
        @Param('id') id: number,
        @Body() projectRequest: ProjectRequest,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        return res.status(200).json(
            await this.responseTemplate.createResponseTemplate(() => 
                this.projectService.updateProject(id, projectRequest, file)
            )
        );
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async deleteProject(@Param('id') id: number, @Res() res: Response) {
        return await this.responseTemplate.createResponseTemplate(() => 
            this.projectService.deleteProject(id)
        );
    }


 

}
