import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import {Profile} from './Profile';
import * as profileActions from '../actions/persons.actions';

const styles = {
    margin: '15px',
};

class Standings extends Component {

    render() {
        return (

            <div>
                <NavigationBar/>

                <div style={styles}>
                    <h1> Persons </h1>
                    {
                        this.props.persons.map((person) => {
                            return (
                                <span> <b> {person.name} </b> <br/><br/> </span>
                            );
                        })
                    }
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
    profileActions
)(Standings);