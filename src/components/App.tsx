import {Component} from 'react';
import {Router, Route, hashHistory, Redirect} from 'react-router';

import NewProfile from "./NewProfile";
import Profiles from "./Profiles";
import Accounts from "./Accounts";

interface AppProps {};

export default class App extends Component<AppProps, {}> {
    render() {
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/NewProfile" component={NewProfile}></Route>
                    <Route path="/Profiles" component={Profiles}></Route>
                    <Route path="/Accounts" component={Accounts}></Route>
                    <Redirect from="/" to="/Profiles"/>
                </Router>
            </div>
        );
    }
}