import { combineReducers } from 'redux'

import game from "./../data/game"


export default combineReducers({
    game: reducer
})

function reducer(state = game, action) {
    switch(action.type) {

        case "NEXT_GENERATION":
            return Object.assign({}, action.payload, {
                gameState: action.payload.gameState.map((row, x, gameState) => {
                    return row.map((cell, y) => {
                        return neighbours(gameState, x, y, cell)
                    })
                }),
                generation: action.payload.generation + 1
            })
            break

        case "CREATE_CELL":
            return Object.assign({}, state, {
                gameState: state.gameState.map((row, i) => {
                    return row.map((cell, k) => {
                        if(i === action.payload.i && k === action.payload.k) {
                            return state.gameState[i][k] === 1 ? 0 : 1
                        }
                        return cell
                    })
                })
            })
            break

        case "TOGGLE_GAME":
            return Object.assign({}, state, {
                isGameOn: action.payload.isGameOn === true ? false : true
            })
            break

        case "CLEAR_BOARD":
            var newGameState = []
            for(var i = 0; i < action.payload.boardX; i += 1) {
                newGameState.push([])
                for(var k = 0; k < action.payload.boardY; k += 1) {
                    newGameState[i].push(0)
                }
            }
            return Object.assign({}, action.payload, {
                gameState: newGameState,
                generation: 0
            })
            break

        /* Initalize new game board */
        case "INITALIZE":
            newGameState = []
            for(i = 0; i < action.payload.size; i += 1) {
                newGameState.push([])
                for(k = 0; k < action.payload.size; k += 1) {
                    newGameState[i].push(Math.floor(Math.random() * 2))
                }
            }
            return Object.assign({}, {
                boardX: action.payload.size,
                boardY: action.payload.size,
                generation: 0,
                gameState: newGameState,
                cellSize: action.payload.cellSize,
                screenType: action.payload.screenType,
                isGameOn: action.payload.isGameOn
            })
            break
        default:
            return state
    }
}

function neighbours(gameState, x, y, cell) {
    var neighbours = 0

    for(var i = -1; i < 2; i += 1) {
        for(var k = -1; k < 2; k += 1) {
            if(gameState[x + i] === undefined || gameState[x + i][y + k] === undefined) {
                continue
            } else if (gameState[x + i][y + k] === 1 && (k !== 0 || i !== 0)) {
                neighbours += 1
            }
        }
    }

    if(neighbours === 2) {
        return cell
    } else if (neighbours === 3) {
        return 1
    } else {
        return 0
    }
}
