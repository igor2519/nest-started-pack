import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@models';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JoiPipeModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export default class UserModule {}
