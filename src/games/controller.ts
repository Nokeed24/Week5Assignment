// src/games/controller.ts
import { JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError, ForbiddenError, BadRequestError } from 'routing-controllers'
import Game from './entity'

type GameList = { games: Game[] }

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

const colors = ["red", "blue", "green", "yellow", "magenta"]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
    

@JsonController()
export default class GameController {

    
    assignRandomColor() {
        
        return colors[Math.floor(Math.random() * colors.length)];
    }

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Get('/games/1v2')
    async comparetwogames() {
        const game2 = await Game.findOne(40)
        const board2 = game2.board              //it complains because the game2 object "could" be undefined. In this case we are using async and await to make sure it's not
        return {moves: moves(defaultBoard,board2)}
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        game.color = this.assignRandomColor()
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')
        if(update.color && !colors.includes(update.color)) throw new ForbiddenError('Color not permitted')
        const currentBoard = game.board
        if (update.id) throw new ForbiddenError('Cannot change the id')
        if (update.board) 
        {
            if(moves(currentBoard,update.board) > 1)
            {
                throw new BadRequestError("Too many moves, dawg")
            }
        }
        return Game.merge(game, update).save()
    }
}
