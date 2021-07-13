import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export default class AuthDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  email!: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  password!: string;
}
