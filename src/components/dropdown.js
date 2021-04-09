import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Action Creators */
import { initalize } from "./../actions/provideActionCreators"
import { nextGeneration } from "./../actions/provideActionCreators"

class Dropdown extends React.Component {
    render() {
        return(
            <ul>
                <li>
                    <button onClick={this.handleClick.bind(this)}>
                        {this.props.type === "size" ? "Small" : "Slow"}
                    </button>
                </li>

                <li>
                    <button onClick={this.handleClick.bind(this)}>
                        {this.props.type === "size" ? "Medium" : "Medium"}
                    </button>
                </li>

                <li>
                    <button onClick={this.handleClick.bind(this)}>
                        {this.props.type === "size" ? "Large" : "No limit"}
                    </button>
                </li>
            </ul>
        )
    }

    handleClick(event) {
        if (this.props.type === "size") {
            this.props.sizeChange()

            var vals = this.screenSwitch(this.props.game.screenType, event.target.innerHTML)

            this.props.initalize(
                vals.size,
                vals.cellSize,
                this.props.game.screenType,
                false
            )



            this.props.closeDropdown(
                event.target.parentElement
                .parentElement.parentElement
                .parentElement.firstChild
            )

            this.props.toggleBoard.innerHTML = "Clear"
        } else {
            //FPS CHANGE COMES HERE
            var speed

            switch(event.target.innerHTML) {
                case "Slow":
                speed = 100
                break
                case "Medium":
                speed = 50
                break
                case "No limit":
                speed = 0
                break
            }

            this.props.newSpeed(speed)

            this.props.closeDropdown(
                event.target.parentElement
                .parentElement.parentElement
                .parentElement.firstChild
            )
        }
    }

    screenSwitch(screenType, button) {
        if (screenType === "desktop") {
            if (button === "Small") {
                return {
                    size: 75,
                    cellSize: 10
                }
            } else if (button === "Medium") {

                return {
                    size: 150,
                    cellSize: 5
                }
            } else {
                return {
                    size: 250,
                    cellSize: 3
                }
            }
        } else if (screenType === "tablet") {
            if (button === "Small") {
                return {
                    size: 60,
                    cellSize: 10
                }
            } else if (button === "Medium") {

                return {
                    size: 120,
                    cellSize: 5
                }
            } else {
                return {
                    size: 200,
                    cellSize: 3
                }
            }
        } else {
            if (button === "Small") {
                return {
                    size: 30,
                    cellSize: 10
                }
            } else if (button === "Medium") {

                return {
                    size: 60,
                    cellSize: 5
                }
            } else {
                return {
                    size: 100,
                    cellSize: 3
                }
            }
        }
    }
}



function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initalize,
        nextGeneration
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)
