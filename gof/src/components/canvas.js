import React from 'react';






class CanvasComponent extends React.Component {

    componentDidMount() {
        this.canvasDraw()
    }

    canvasDraw() {
        var c = this.refs.canv.getContext("2d")
        c.fillRect(0,0, 100, 100);
    }

    render() {
        return(
            <div>
                <h3>Generations: <span ref="Generations">10</span></h3>
                <canvas ref="canv"></canvas>
            </div>
        )
    }

}



export default CanvasComponent
