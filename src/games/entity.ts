// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength, IsEmail, IsNumber, IsIn, IsOptional, IsJSON } from 'class-validator'

const colors = ["red", "blue", "green", "yellow", "magenta"]

export type Row = [string, string, string]
export type Board = [ Row, Row, Row]

export type defaultBoard = [
  ["o", "o", "o"],
  ["o", "o", "o"],
  ["o", "o", "o"]
]

const newRow: Row = ["o", "o", "o"]
const newBoard = JSON.stringify([newRow, newRow, newRow])

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @IsOptional()
  @IsIn(colors)
  @Column('text', {nullable:false})
  color: string

  @IsJSON()
  @Column('json', {default: newBoard})
  board: Board
}