import {Component} from 'react';
import {Router, Route, hashHistory, Redirect} from 'react-router';

// import NewProfile from "./NewProfile";
import Profiles from "./Profiles";
import data from 'test.json';

interface AppProps {};

export default class App extends Component<AppProps, {}> {

    constructor(props) {
        super(props);

        this.testWriting();
    }

    testWriting() {



    }

    // render() {
    //     return (
    //         <div>
    //             <Router history={hashHistory}>
    //                 <Route path="/NewProfile" component={NewProfile}></Route>
    //                 <Route path="/Profiles" component={Profiles}></Route>
    //                 <Route path="/Accounts" component={Accounts}></Route>
    //                 <Redirect from="/" to="/Profiles"/>
    //             </Router>
    //         </div>
    //     );
    // }

    // render() {
    //     return (
    //         <div>
    //             <Router history={hashHistory}>
    //                 <Route path="/Profiles" component={Profiles}></Route>
    //                 <Redirect from="/" to="/Profiles"/>
    //             </Router>
    //         </div>
    //     );
    // }

    render() {
        return (

            <div>
                <h1> Hello, it's Lauda </h1>

                {
                    data.data.map(function(item) {
                        return (
                            <h3> {item} </h3>
                        );
                    })
                }
            </div>
        );
    }
}