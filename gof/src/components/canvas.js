import React from 'react'
import { connect } from "react-redux"


class CanvasComponent extends React.Component {

    componentDidMount() {
        this.canvasDraw()
    }

    canvasDraw() {
        var canvas = this.refs.canv,
            c = this.refs.canv.getContext("2d"),
            cellSize = this.props.game.cellSize,
            boardX = this.props.game.boardX,
            boardY = this.props.game.boardY,
            gameState = this.props.game.gameState,
            i

        canvas.width = boardX * cellSize
        canvas.height = boardY * cellSize

        for(i = 0; i < boardX; i += 1) {
            gameState.push([])
            for(var k = 0; k < boardY; k += 1) {
                gameState[i].push(Math.floor(Math.random() * 2))
            }
        }
        c.fillStyle = "#3F404A";
        for(i = 0; i < gameState.length; i += 1) {
            for(k = 0; k < gameState[i].length; k += 1) {
                if(gameState[i][k] === 1) {
                    c.fillRect(i * cellSize, k * cellSize, cellSize, cellSize)
                }
            }
        }
    }


    /* NEED CLEARUP */
    componentDidUpdate() {
        var canvas = this.refs.canv,
            c = this.refs.canv.getContext("2d"),
            cellSize = this.props.game.cellSize,
            boardX = this.props.game.boardX,
            boardY = this.props.game.boardY,
            gameState = this.props.game.gameState,
            i,
            k
        c.clearRect(0, 0, boardX * cellSize, boardY * cellSize)
        for(i = 0; i < gameState.length; i += 1) {
            for(k = 0; k < gameState[i].length; k += 1) {

                if(gameState[i][k] === 1) {
                    c.fillStyle = "#3F404A";
                    c.fillRect(i * cellSize, k * cellSize, cellSize, cellSize)
                }
            }
        }
    }

    render() {
        return(
            <div>
                <h3>Generations: <span ref="Generations">{this.props.game.generation}</span></h3>
                <canvas ref="canv">
                </canvas>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}



export default connect(mapStateToProps)(CanvasComponent)
