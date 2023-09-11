import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as cron from 'cron';

import config from './config/sequelize.config';
import { User } from './modules/user/entities/user.entity';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { WodModule } from './modules/wod/wod.module';
import { Wod } from './modules/wod/entities/wod.entity';
import { WodController } from './modules/wod/wod.controller';
import { WodService } from './modules/wod/wod.service';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(config),
    SequelizeModule.forFeature([User, Wod]),
    PassportModule,
    WodModule,
    AuthModule,
  ],
  controllers: [UserController, WodController],
  providers: [
    UserService,
    JwtStrategy,
    WodService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [SequelizeModule],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly wodService: WodService) {}

  async onModuleInit() {
    // Executa a tarefa a cada meia-noite
    new cron.CronJob('0 0 * * *', () => {
      this.deleteExpiredWods();
    });
  }

  async deleteExpiredWods() {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const expiredWods =
      await this.wodService.getExpiredWods(twentyFourHoursAgo);

    for (const wod of expiredWods) {
      await this.wodService.deleteWod(wod.id);
    }
  }
}
