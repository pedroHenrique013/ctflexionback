import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class Wod extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  date: Date;
}
