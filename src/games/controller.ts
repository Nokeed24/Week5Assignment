import { JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError } from 'routing-controllers'
import Game from './entity'

//type GameList = { games: Game[] }

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

@JsonController()
export default class GameController {

    
    assignRandomColor() {
        const colors = ["red", "blue", "green", "yellow", "magenta"]
        return colors[Math.floor(Math.random() * colors.length)];
    }

    @Get('/games/')
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
        game.board = JSON.stringify(defaultBoard)
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find page')
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