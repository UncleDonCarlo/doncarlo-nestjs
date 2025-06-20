import { Controller, Post, Body, Get, Param, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRequest } from './dto/userRequest';
import { LoginRequest } from './dto/loginRequest';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseTemplate: ResponseTemplate,
  ) {}

  @Post('register')
  async createUser(@Body() userData: UserRequest) {
    return await this.responseTemplate.createResponseTemplate(() => this.userService.createUser(userData));
  }

  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    return await this.responseTemplate.createResponseTemplate(() => this.userService.login(loginRequest));
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  async getUser(@Param('id') id: number) {
    return await this.responseTemplate.createResponseTemplate(() => this.userService.getUserById(id));
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  async getAllUsers() {
    return await this.responseTemplate.createResponseTemplate(() => this.userService.getAllUsers());
  }
}
