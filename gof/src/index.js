import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { createStore } from "redux"
import "./styles/main.css"

/* Components */
import CanvasComponent from "./components/canvas"
import Controllers from "./components/controllers"
/* Grid */
import Grid from "./components/grid"


/* Reducers */
import reducers from "./reducers/provideReducers"

/* Store */
const store = createStore(reducers)

class App extends React.Component {
    render() {
        return(
            <div>
                <Controllers />
                <CanvasComponent />
                <Grid game={store.getState().game}/>
            </div>
        )
    }
}



ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
