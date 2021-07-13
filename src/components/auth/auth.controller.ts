import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import UserService from './auth.service';
import { UserDto, AuthDto } from '@dto';
import { GlobalErrorHandler } from '@interceptors';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { ErrorResponse, RegisterResponse, LoginResponse } from '@swagger';

@UseInterceptors(GlobalErrorHandler)
@Controller('/auth')
export default class UserController {
  constructor(private serv: UserService) {}

  @ApiOkResponse({ status: 201, type: RegisterResponse })
  @ApiBadRequestResponse({ status: 400, type: ErrorResponse })
  @ApiConflictResponse({ status: 409, type: ErrorResponse })
  @Post('/register')
  public async register(@Body() data: UserDto) {
    return await this.serv.create(data);
  }

  @ApiOkResponse({ status: 201, type: LoginResponse })
  @ApiBadRequestResponse({ status: 400, type: ErrorResponse })
  @Post('/login')
  public async login(@Body() data: AuthDto) {
    return await this.serv.login(data);
  }
}
