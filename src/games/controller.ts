import { JsonController, Get, Param } from 'routing-controllers'
import Game from './entity'

type GameList = { games: Game[] }

@JsonController()
export default class GameController {

    @Get('/games/')
    async allGames() {
        const games = await Game.find()
        return { games }
    }
}



// @Get('/ads')
//     async allAdvertisements() {
//         const advertisements = await Advertisement.find()
//         return { advertisements }
//     }