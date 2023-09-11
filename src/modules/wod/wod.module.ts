import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wod } from './entities/wod.entity';
import { WodController } from './wod.controller';
import { WodService } from './wod.service';

@Module({
  imports: [SequelizeModule.forFeature([Wod])],
  controllers: [WodController],
  providers: [WodService],
})
export class WodModule {}
