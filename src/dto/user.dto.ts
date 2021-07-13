import { CREATE, JoiSchema, JoiSchemaOptions, UPDATE } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export default class UserDto {
  @ApiProperty()
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  firstName!: string;

  @ApiProperty()
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  lastName!: string;

  @ApiProperty()
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().optional())
  email!: string;

  @ApiProperty()
  @JoiSchema([CREATE], Joi.string().required())
  password!: string;
}
