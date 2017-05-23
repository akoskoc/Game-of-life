export function nextGeneration(game) {
    return {
        type: "NEXT_GENERATION",
        payload: game
    }
}

export function createCell(i, k) {
    return {
        type: "CREATE_CELL",
        payload: {
            i,
            k
        }
    }
}

export function toggleGame(game) {
    return {
        type: "TOGGLE_GAME",
        payload: game
    }
}

export function clearBoard(game) {
    return {
        type: "CLEAR_BOARD",
        payload: game
    }
}

export function initalize(size, cellSize, screenType, isGameOn) {
    return{
        type: "INITALIZE",
        payload: {
            size,
            cellSize,
            screenType,
            isGameOn
        }
    }
}

export function setSpeed(speed) {
    return {
        type: "SET_SPEED",
        payload: speed
    }
}
