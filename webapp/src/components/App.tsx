import {Component} from 'react';
import {Router, Route, hashHistory, Redirect} from 'react-router';

import NewPerson from "./NewPerson";
import Standings from "./Standings";
import PersonsList from "./PersonsList";

interface AppProps {};

export default class App extends Component<AppProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/Standings" component={Standings}></Route>
                    <Route path="/NewPerson" component={NewPerson}></Route>
                    <Route path="/PersonsList" component={PersonsList}></Route>
                    <Redirect from="/" to="/Standings"/>
                </Router>
            </div>
        );
    }
}