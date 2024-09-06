import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.findOneBy({ id });
  }

  async create(body: User) {
    const userInstance = this.usersRepository.create(body);

    await this.usersRepository.save(userInstance);

    return userInstance;
  }

  async update(id: number, body: User) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.usersRepository.create({ ...user, ...body });

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
