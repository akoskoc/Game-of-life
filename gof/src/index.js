import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/main.css"

/* Components */
import CanvasComponent from "./components/canvas"
import NavComponent from "./components/nav"


class App extends React.Component {
    render() {
        return(
            <div>
                <NavComponent />
                <CanvasComponent />
            </div>
        )
    }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
