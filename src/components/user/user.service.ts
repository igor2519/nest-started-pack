import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@models';
import { Repository } from 'typeorm';

@Injectable()
export default class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) {}

  public async getById(id: string) {
    return await this.repo.findOne(id);
  }
}
