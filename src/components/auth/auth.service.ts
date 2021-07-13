import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@models';
import { UserDto, AuthDto } from '@dto';
import { Repository } from 'typeorm';
import { tokenUtil } from '@utils';
import { ClientError } from '@errors';
import * as bcrypt from 'bcrypt';
import { errorMessages } from '@constants';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  public async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    const { password, ...userData } = await this.repo.save(user);
    const authToken = tokenUtil.createJwtToken({ id: userData.id });
    return { authToken, ...userData };
  }

  public async login(authData: AuthDto) {
    const user = await this.repo.findOne(
      { email: authData.email },
      { select: ['password', 'id'] },
    );
    if (!(await bcrypt.compare(authData.password, user.password))) {
      throw new ClientError(errorMessages.invelidCredentials);
    }
    const authToken = tokenUtil.createJwtToken({ id: user.id });
    return { authToken };
  }
}
