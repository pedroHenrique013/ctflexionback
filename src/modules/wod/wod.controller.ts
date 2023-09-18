import { Controller, Get, Post, Body, UseGuards, Delete, Param} from '@nestjs/common';
import { WodService } from './wod.service';
import { CreateWodDto } from './dto/create-wod.dto';
import { Wod } from './entities/wod.entity';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('wods')
export class WodController {
  constructor(private readonly wodService: WodService) {}

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllWods(): Promise<Wod[]> {
    return this.wodService.getAllWods();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createWod(@Body() createWodDto: CreateWodDto) {
    const { title, description, date } = createWodDto;
    return this.wodService.createWod(title, description);
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteWod(@Param('id') id: number) {
    return this.wodService.deleteWod(id);
  }
}
