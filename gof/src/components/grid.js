import React from 'react'

class Grid extends React.Component {

    componentDidMount() {
        this.canvasDraw()
    }

    canvasDraw() {

        var canvas = this.refs.canv,
            c = this.refs.canv.getContext("2d"),
            cellSize = this.props.game.cellSize,
            boardX = this.props.game.boardX,
            boardY = this.props.game.boardY,
            i

        canvas.width = boardX * cellSize
        canvas.height = boardY * cellSize

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

    render() {
    /* Not logging when generate happens :)
    , might now update if if set new height and width  :| */
        console.log("please dont log this")
        return(
            <div>
                <canvas ref="canv" className="grid"></canvas>
            </div>
        )
    }

}

export default Grid
