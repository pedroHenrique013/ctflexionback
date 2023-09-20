/* eslint-disable prettier/prettier */
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
  ) { }

  async createWod(title: string, description: string): Promise<Wod | null> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const existingWod = await this.wodModel.findOne({ where: { date: formattedDate } });

    if (existingWod) {
      // Se já existe um Wod para o dia atual, não faz nada e retorna null.
      return null;
    } else {
      // Se não existe, cria um novo Wod.
      const newWod = new this.wodModel({
        title: title,
        description: description,
        date: formattedDate // Você pode precisar ajustar isso conforme a estrutura do seu modelo.
      });

      return newWod.save();
    }
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
