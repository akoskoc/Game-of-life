import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Generate */
import { generate } from "./../actions/provideActionCreators"

class Controllers extends React.Component {
    componentDidMount() {
        //setInterval(() => this.props.generate(this.props.game), 0)

    }
    componentDidUpdate() {
    }
    render() {
        return(
            <div className="controllers">
                <button>Start</button>
                <button>Stop</button>
                <button>Clear</button>
                <button onClick={() => this.props.generate(this.props.game)}>Generate</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({generate}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controllers)
