import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  authToken: string;
}

export class UserResponse {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class RegisterResponse extends UserResponse {
  @ApiProperty()
  authToken: string;
}
