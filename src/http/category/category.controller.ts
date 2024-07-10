import { Controller, Post, Body, Get, Param, Res, UseGuards, Put, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CategoryRequest } from './dto/categoryRequest';
import { CategoryService } from './category.service';
import { Paginate, Paginated } from 'nestjs-paginate';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly responseTemplate: ResponseTemplate,
    ) { }

    @Post('')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async createUser(@Body() categoryRequest: CategoryRequest, @Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.createCategory(categoryRequest)));
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getCategoryById(@Param('id') id: number, @Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.getCateogryById(id)));
    }

    @Get('/')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async getAllCategories(
        @Query('page', new DefaultValuePipe(1) , ParseIntPipe) page:number,
        @Query('limit', new DefaultValuePipe(10) , ParseIntPipe) limit:number,
        @Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.getAllCategories(page,limit)));
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async modifyCategory(@Param('id') id: number, @Body() categoryRequest: CategoryRequest,@Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.modifyCategory(id,categoryRequest)));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('accessToken')
    async deleteCategory(@Param('id') id: number,@Res() res: Response) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.categoryService.deleteCategory(id)));
    }
}
