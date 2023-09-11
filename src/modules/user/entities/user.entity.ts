import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column
  name: string;
  
  @Column
  email: string;
  
  @Column
  password: string;
}
