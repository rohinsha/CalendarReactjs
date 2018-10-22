import React, {Component} from 'react'
import {Router, Route} from 'react-router-dom'
import HomePage from './HomePage'
import AllEvents from './AllEvents'
import {history} from '../services/history'


export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/events" component={AllEvents}/>
                </div>
            </Router>
        )
    }
}