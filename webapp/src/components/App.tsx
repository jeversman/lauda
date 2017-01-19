import {Component} from 'react';
import {Router, Route, hashHistory, Redirect} from 'react-router';

import NewProfile from "./NewPerson";
import Standings from "./Standings";
import data from 'data.json';


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
                    <Redirect from="/" to="/Standings"/>
                </Router>
            </div>
        );
    }

    // render() {
    //     return (
    //
    //         <div>
    //             <h1> Hello, it's Lauda </h1>
    //
    //             {
    //                 data.data.map(function(item) {
    //                     return (
    //                         <h3> {item} </h3>
    //                     );
    //                 })
    //             }
    //         </div>
    //     );
    // }
}