import { combineReducers } from 'redux'

import game from "./../data/game"


export default combineReducers({
    game: reducer
})

function reducer(state = game, action) {
    if(action.payload) {
        if(action.payload.generation === 4000) {
            console.log(performance.now())
        }
    }
    switch(action.type) {
        case "GENERATE_BOARD":
            return Object.assign({}, action.payload, {
                gameState: action.payload.gameState.map((row) => {
                    return row.map((cell) => Math.floor(Math.random() * 2))
                }),
                generation: action.payload.generation + 1
            })
            break
        default:
            return state
    }
}
