import { Injectable, NotFoundException, ValidationPipe } from '@nestjs/common';
import { OptimisticLockVersionMismatchError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user: CreateUserDto) {
    return this.repo.save(this.repo.create(user));
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  async find(email: string) {
    return await this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }
}
