import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34 },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 25 },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 30 },
    { id: 5, name: 'Evan Davis', email: 'evan@example.com', age: 40 },
  ];
  private idCounter: number = 6;

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.idCounter++,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | NotFoundException {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): User | NotFoundException {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return user;
  }

  delete(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
