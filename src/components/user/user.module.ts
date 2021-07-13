import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@models';
import UserService from './user.service';
import UserController from './user.controller';
import { JoiPipeModule } from 'nestjs-joi';
import { authMiddleware } from '@middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JoiPipeModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export default class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('users');
  }
}
