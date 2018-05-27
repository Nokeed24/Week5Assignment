// src/games/controller.ts
import { JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError, ForbiddenError, BadRequestError } from 'routing-controllers'
import Game from './entity'
import { validate } from 'class-validator'

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

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        game.color = this.assignRandomColor()
        if(!game.name) throw new NotFoundError("Cannot create game")
        validate(game).then(errors => {
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
            } else {
                console.log("validation succeed");
            }
        });
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')
        const currentBoard = game.board
        if (update.id) throw new ForbiddenError('Cannot change the id')
        // if (update.name)
        // {
        //     if (Number(update.name)!==NaN) throw new BadRequestError("Name must be a string")
        // }
        //if (update.color && !colors.includes(update.color)) throw new BadRequestError('Color not permitted')
        if (update.board) 
        {
            if(moves(currentBoard,update.board) > 1)
            {
                throw new BadRequestError("That's not allowed! Too many moves!")
            }
        }
        await validate(Game.merge(game, update)).then(errors => {
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
                throw new BadRequestError("did not pass validation, check your data")
            } else {
                console.log("validation succeed");
            }
        });
        return Game.merge(game, update).save()
    }
}
