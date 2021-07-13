import { Controller, UseInterceptors, Get, Res } from '@nestjs/common';
import UserService from './user.service';
import { GlobalErrorHandler } from '@interceptors';
import { Response } from 'express';
import {
  ApiHeader,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserResponse, ErrorResponse } from '@swagger';

@UseInterceptors(GlobalErrorHandler)
@Controller('/users')
export default class UserController {
  constructor(private serv: UserService) {}

  @ApiHeader({
    name: 'authorization',
    description: 'Authorization token',
  })
  @ApiOkResponse({ status: 201, type: UserResponse })
  @ApiBadRequestResponse({ status: 400, type: ErrorResponse })
  @ApiForbiddenResponse({ status: 403, type: ErrorResponse })
  @Get('/self')
  public async getSelf(@Res() response: Response) {
    return response.json(await this.serv.getById(response.locals.user));
  }
}
