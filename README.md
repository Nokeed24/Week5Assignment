Week 5 Assignment - Nikolaos Ouvenis

Original Assignment: 

These are the steps to create a basic backend (API-only):

1. Create a `games` table with model using TypeORM. A game should have an `id`, a `name`, a `color` and `board` field. Both the name and color fields are `text` fields, the board field is of type `json`. 
2. Setup a webserver using routing-controllers and create a `GET /games` endpoint that returns all the games (with envelope!)
3. Add an endpoint `POST /games` for which the only input is a name. The created game should receive a random color out of these colors: red, blue, green, yellow, magenta. So every new game that gets created is assigned a random color. 
4. Add an endpoint `PUT /games/:id` or `PATCH /games/:id` that allows to overwrite one or more fields of the game. E.g. calling `PUT /games` with JSON body `{ "name": "new name" }` should update the name, same for color and board (not for id). 
5. When a **game is changed** using the endpoint you made in #4 and the color field is updated, make sure (validate) that the color is one of these colors: red, blue, green, yellow, magenta
6. When a **game starts**, your app should set the board to an empty board. The board is a two dimensional array that contains three arrays with three times the letter 'o'. 
7. When a **game is changed** and the board field is updated, make sure there is only 1 move is made. That means that only one element out of the 9 can be changed into something else. You can use the function below to count the number of moves between two boards. If somebody tries to make more moves, return a `HTTP 400 Bad Request` response. If everything is fine, update the board field of the game.

All steps are complete and all validation is in place 