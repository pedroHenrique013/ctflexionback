import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @IsPublic()
  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const { email } = createUserDto;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.userService.createUser(createUserDto);

    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  @IsPublic()
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const deletedUser = await this.userService.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: `User with ID ${id} deleted successfully`,
    };
  }

  @IsPublic()
  @Patch(':id')
  async updateTime(@Param('id') id: number, @Body() updateDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateTime(id, updateDto.time);

    if (updatedUser) {
      return { message: 'Tempo atualizado com sucesso', user: updatedUser };
    } else {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}
