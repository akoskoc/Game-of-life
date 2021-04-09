import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Components */
import Dropdown from "./dropdown"

/* Action Creators */
import { toggleGame } from "./../actions/provideActionCreators"
import { nextGeneration } from "./../actions/provideActionCreators"
import { initalize } from "./../actions/provideActionCreators"
import { clearBoard } from "./../actions/provideActionCreators"

/* Global vars for interval control */
var intervalID
var speed = 50


class Controllers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sizeDropdownHeight: 0,
            fpsDropdownHeight: 0
        }
    }


    componentDidMount() {
        this.toggleGame()
    }


    render() {
        return(
            <ul id="controllers">
                <li>
                    <button
                        className="parentButton"
                        onClick={this.toggleGame.bind(this)}>
                        {this.props.game.isGameOn === true ? "Stop" : "Start"}
                    </button>
                </li>
                <li>
                    <button
                        className="parentButton"
                        onClick={this.toggleBoard.bind(this)} ref="toggleBoard"
                        disabled={this.props.game.isGameOn === true}
                        style={this.props.game.isGameOn === true
                        ? {opacity: 0.7}
                        : {opacity: 1}}>
                        Clear
                    </button>
                </li>
                <li className="dropDownParent">
                    <button
                        className="parentButton"
                        onClick={this.sizeDropdown.bind(this)}>
                        Size
                    </button>
                    <div className="buttonContainer" style={this.state.sizeDropdownHeight === 0
                        ? {height: "0px"}
                        : {height: "75px"}}>
                        <Dropdown
                            type="size"
                            sizeChange={this.sizeChange.bind(this)}
                            closeDropdown={this.closeDropdown.bind(this)}
                            toggleBoard={this.refs.toggleBoard}/>
                    </div>


                </li>
                <li className="dropDownParent">
                    <button
                        className="parentButton"
                        onClick={this.fpsDropdown.bind(this)}>
                        Speed
                    </button>
                    <div className="buttonContainer" style={this.state.fpsDropdownHeight === 0
                        ? {height: "0px"}
                        : {height: "75px"}}>
                        <Dropdown
                            type="fps"
                            closeDropdown={this.closeDropdown.bind(this)}
                            newSpeed={this.newSpeed.bind(this)}/>
                    </div>
                </li>
            </ul>
        )
    }

    sizeDropdown(event) {
        if (this.state.sizeDropdownHeight === 0) {
            this.setState({
                sizeDropdownHeight: 75
            })
            event.target.style.backgroundColor = "white"
            event.target.style.color = "#1c212a"

        } else {
            this.setState({
                sizeDropdownHeight: 0
            })
            event.target.style.backgroundColor = "#1c212a"
            event.target.style.color = "white"
        }
    }

    fpsDropdown(event) {
        if (this.state.fpsDropdownHeight === 0) {
            this.setState({
                fpsDropdownHeight: 75
            })
            event.target.style.backgroundColor = "white"
            event.target.style.color = "#1c212a"

        } else {
            this.setState({
                fpsDropdownHeight: 0
            })
            event.target.style.backgroundColor = "#1c212a"
            event.target.style.color = "white"
        }
    }

    toggleGame() {
        if(this.props.game.isGameOn === false) {
            this.props.toggleGame(this.props.game)
            intervalID = setInterval(() => this.props.nextGeneration(this.props.game), speed)
        } else {
            clearInterval(intervalID)
            this.props.toggleGame(this.props.game)
        }
    }

    toggleBoard() {
        if (this.refs.toggleBoard.innerHTML === "Clear") {
            this.refs.toggleBoard.innerHTML = "Generate"
            this.props.clearBoard(this.props.game)

        } else {
            this.refs.toggleBoard.innerHTML = "Clear"
            this.props.initalize(
                this.props.game.boardX,
                this.props.game.cellSize,
                this.props.game.screenType,
                false
            )
        }
    }

    sizeChange() {
        if (this.props.game.isGameOn === true ) {
            clearInterval(intervalID)
        }
    }

    closeDropdown(button) {
        if (button.innerHTML === "Speed") {
            this.setState({
                fpsDropdownHeight: 0
            })
            button.style.backgroundColor = "#1c212a"
            button.style.color = "white"
        } else {
            this.setState({
                sizeDropdownHeight: 0
            })
            button.style.backgroundColor = "#1c212a"
            button.style.color = "white"
        }
    }

    newSpeed(newSpeed) {
        if (this.props.game.isGameOn === true) {
            speed = newSpeed
            clearInterval(intervalID)
            intervalID =
            setInterval(() => this.props.nextGeneration(this.props.game), speed)
        } else {
            speed = newSpeed
        }
    }
}
function mapStateToProps(state) {
    return state
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        nextGeneration,
        toggleGame,
        initalize,
        clearBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controllers)
