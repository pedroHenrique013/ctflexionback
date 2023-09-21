/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const initialTime = '31:00';
    return this.userModel.create({ ...userData, password: hashedPassword, time: initialTime });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedRows = await this.userModel.destroy({ where: { id } });
    return deletedRows > 0;
  }

  async updateTime(id: number, time: string): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
  
    if (!user) {
      return null;
    }
  
    user.time = time;
  
    await user.save(); // Salve as alterações no banco de dados
  
    return user;
  }
  

}
