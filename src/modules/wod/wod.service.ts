import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wod } from './entities/wod.entity';
import { Op } from 'sequelize';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class WodService {
  constructor(
    @InjectModel(Wod)
    private readonly wodModel: typeof Wod,
  ) {}

 async createWod(
  title: string,
  description: string,
): Promise<Wod> {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Use o formato ISO para armazenar a data no banco de dados

  const existingWod = await this.wodModel.findOne({ where: { date: formattedDate } });

  if (existingWod) {
    throw new Error('Já existe um Wod criado para o dia atual');
  }

  return this.wodModel.create({ title, description});
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
