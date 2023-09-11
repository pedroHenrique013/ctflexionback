import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wod } from './entities/wod.entity';
import { Op } from 'sequelize';

@Injectable()
export class WodService {
  constructor(
    @InjectModel(Wod)
    private readonly wodModel: typeof Wod,
  ) {}

  async createWod(
    title: string,
    description: string,
    date: Date,
  ): Promise<Wod> {
    return this.wodModel.create({ title, description, date });
  }

  async getAllWods(): Promise<Wod[]> {
    return this.wodModel.findAll();
  }

  async getExpiredWods(date: Date): Promise<Wod[]> {
    return this.wodModel.findAll({
      where: {
        date: {
          [Op.lt]: date,
        },
      },
    });
  }

  async deleteWod(id: number): Promise<void> {
    await this.wodModel.destroy({
      where: {
        id,
      },
    });
  }
}
