import { SequelizeModuleOptions } from '@nestjs/sequelize';

const config: SequelizeModuleOptions = {
  dialect: 'postgres', // Tipo do banco de dados (neste caso, PostgreSQL)
  host: 'localhost', // Endereço do banco de dados
  port: 5432, // Porta do banco de dados
  username: 'postgres', //
  password: 'postgres',
  database: 'postgres',
  autoLoadModels: true, // Carrega automaticamente os modelos da pasta 'models'
  synchronize: true, // Sincroniza os modelos com o banco de dados (cuidado em produção)
};

export default config;
