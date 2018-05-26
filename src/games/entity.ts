// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsOptional, IsJSON, IsIn } from 'class-validator'

export type Row = [string, string, string]
export type Board = [ Row, Row, Row]

const newRow: Row = ['o', 'o', 'o']
const newBoard: Board = [newRow, newRow, newRow]

const colors = ["red", "blue", "green", "yellow", "magenta"]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()  
  @IsIn(colors)
  @IsOptional()
  @Column('text', {nullable:false})
  color: string

  @IsJSON()
  @IsOptional()
  @Column('json', {default: newBoard})
  board: JSON
}