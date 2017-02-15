import {Component} from 'react';
import {connect} from 'react-redux';

import {RaisedButton, Card, CardText, CardActions, CardHeader} from 'material-ui';

import {NavigationBar} from './NavigationBar';
import {PersonsTable} from './PersonsTable';
import * as personsActions from '../actions/persons.actions';

const styles = {
    margin: '15px',
};

class Standings extends Component {

    render() {
        return (

            <div>
                <NavigationBar/>
                <div style={styles}>
                    <PersonsTable persons={this.props.persons} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        persons: state.persons.persons,
    };
}

export default connect(
    mapStateToProps,
    personsActions
)(Standings);