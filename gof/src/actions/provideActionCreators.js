export function generate(game) {
    return {
        type: "GENERATE_BOARD",
        payload: game
    }
}
