import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Action creators */
import { initalize } from "./../actions/provideActionCreators"
import { createCell } from "./../actions/provideActionCreators"
import { toggleGame } from "./../actions/provideActionCreators"



class CanvasComponent extends React.Component {

    componentDidMount() {
        /* Set board size */
        if (window.innerWidth > 900 && this.props.game.screenType !== "desktop") {
            this.props.initalize(150, 5, "desktop", true)

            this.refs.canvas.height = 150 * 5
            this.refs.canvas.width = 150 * 5


        } else if(window.innerWidth < 900 && window.innerWidth > 700 && this.props.game.screenType !== "tablet") {
            this.props.initalize(120, 5, "tablet", true)

            this.refs.canvas.height = 120 * 5
            this.refs.canvas.width = 120 * 5


        } else if (window.innerWidth < 700 && this.props.game.screenType !== "phone") {
            this.props.initalize(60, 5, "phone", true)

            this.refs.canvas.height = 60 * 5
            this.refs.canvas.width = 60 * 5

        }

        /* On resize auto resize the board */
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900 && this.props.game.screenType !== "desktop") {
                this.props.initalize(150, 5, "desktop", this.props.game.isGameOn)

                this.refs.canvas.height = this.props.game.boardY * this.props.game.cellSize
                this.refs.canvas.width = this.props.game.boardX * this.props.game.cellSize

                this.draw()

            } else if(window.innerWidth < 900 && window.innerWidth > 700 && this.props.game.screenType !== "tablet") {
                this.props.initalize(120, 5, "tablet", this.props.game.isGameOn)

                this.refs.canvas.height = this.props.game.boardY * this.props.game.cellSize
                this.refs.canvas.width = this.props.game.boardX * this.props.game.cellSize

                this.draw()


            } else if (window.innerWidth < 700 && this.props.game.screenType !== "phone") {
                this.props.initalize(60, 5, "phone", this.props.game.isGameOn)

                this.refs.canvas.height = this.props.game.boardY * this.props.game.cellSize
                this.refs.canvas.width = this.props.game.boardX * this.props.game.cellSize

                this.draw()

            }
        })

        /* On click add / remove cell from the board */
        window.addEventListener("click", (event) => {
            var canvasSize = this.refs.canvas.getBoundingClientRect()

            if (event.clientX >= canvasSize.left
                && event.clientX <= canvasSize.right
                && event.clientY >= canvasSize.top
                && event.clientY <= canvasSize.bottom) {
                    this.props.createCell(
                        Math.floor((event.clientX - canvasSize.left) / this.props.game.cellSize),
                        Math.floor((event.clientY - canvasSize.top) / this.props.game.cellSize))
            }
        })
    }

    componentDidUpdate() {
        this.draw()
    }

    render() {
        return(
            <div>
                <h3>Generations: <span>{this.props.game.generation}</span></h3>
                <canvas ref="canvas"></canvas>
            </div>
        )
    }

    draw() {
        var canvas = this.refs.canvas,
            c = canvas.getContext("2d"),
            cellSize = this.props.game.cellSize,
            boardX = this.props.game.boardX,
            boardY = this.props.game.boardY,
            gameState = this.props.game.gameState,
            i,
            k

        /* Clear */
        c.clearRect(0, 0, boardX * cellSize, boardY * cellSize)

        /* Colors */
        c.strokeStyle = "#373737"
        c.fillStyle = "#1d7a53"

        /* Rect */
        for(i = 0; i < gameState.length; i += 1) {
            for(k = 0; k < gameState[i].length; k += 1) {
                if(gameState[i][k] === 1) {
                    c.fillRect(i * cellSize, k * cellSize, cellSize, cellSize)
                }
            }
        }

        /* Grid */
        for(i = cellSize; i < boardX * cellSize; i += cellSize) {
            c.beginPath();
            c.moveTo(0, i);
            c.lineTo(boardX * cellSize, i);
            c.stroke();
        }
        for(i = cellSize; i < boardY * cellSize; i += cellSize) {
            c.beginPath();
            c.moveTo(i, 0);
            c.lineTo(i, boardY * cellSize);
            c.stroke();
        }
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createCell,
        toggleGame,
        initalize
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)
