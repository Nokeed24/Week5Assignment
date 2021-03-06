// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn, ValidateIf, IsNotEmpty } from 'class-validator'

export type Row = [string, string, string]
export type Board = [ Row, Row, Row]

export const newRow: Row = ['o', 'o', 'o']
export const newBoard: Board = [newRow, newRow, newRow]

const colors = ["red", "blue", "green", "yellow", "magenta"]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Column('text', {nullable:false})
  name: string

  @ValidateIf(o => o.color)
  @IsString()                           //If the color is not provided, @IsOptional() ignores all validation decorators
  @IsIn(colors) 
  @IsNotEmpty()                        //but in that case, it's only on the POST where we pass a random color which will be validated
  @Column('text', {nullable:false})
  color: string

  @ValidateIf(o => o.board)
  @Column('json', {default: newBoard})
  board: JSON
}