import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user/user.entity';
import { UserDetail } from './entity/userDetail/userDetail.entity';
import { UserRepository } from './entity/user/userRepository';
import { UserDetailRepository } from './entity/userDetail/userDetailRepository';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'SysTemDonUncle32',
    }),
    TypeOrmModule.forFeature([User, UserDetail, UserRepository, UserDetailRepository]),
  ],
  controllers: [UserController],
  providers: [UserService,ResponseTemplate,],
})
export class UserModule {}
