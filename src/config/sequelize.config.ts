import { SequelizeModuleOptions } from '@nestjs/sequelize';

const config: SequelizeModuleOptions = {
  dialect: 'postgres', // Tipo do banco de dados (neste caso, PostgreSQL)
  host:"ctflexion.postgres.database.azure.com", // Endereço do banco de dados
  port: 5432, // Porta do banco de dados
  username: "pedroserafim",
  password: "th@lita13",
  database: "postgres",
  autoLoadModels: true, // Carrega automaticamente os modelos da pasta 'models'
  synchronize: true, // Sincroniza os modelos com o banco de dados (cuidado em produção)
  dialectOptions: { // Required to use a PostgreSQL database on Azure
    ssl: {
      require: true,
    }
  }
};

export default config;
