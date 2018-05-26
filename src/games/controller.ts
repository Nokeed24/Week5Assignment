import { JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError, ForbiddenError } from 'routing-controllers'
import Game from './entity'

type GameList = { games: Game[] }

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    
    assignRandomColor() {
        const colors = ["red", "blue", "green", "yellow", "magenta"]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Get('/games/1v2')
    async comparetwogames() {
        //const game1 = await Game.findOne(18)
        //const board1 = game1.board
        const game2 = await Game.findOne(22)
        const board2 = game2.board
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
        const currentBoard = game.board
        if (update.id) throw new ForbiddenError('Cannot change the id')
        if (update.board) 
        {
            if(moves(currentBoard,update.board) > 1)
            {
                throw new Error("404 Bad request")
            }
        }
        if (!game) throw new NotFoundError('Cannot find game')
        return Game.merge(game, update).save()
    }
}



// @Get('/ads')
//     async allAdvertisements() {
//         const advertisements = await Advertisement.find()
//         return { advertisements }
//     }

// @Post('/pages')
// @HttpCode(201)
// createPage(
//   @Body() page: Page
// ) {
//   return page.save()
// }