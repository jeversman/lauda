import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RaisedButton, FlatButton, Dialog} from 'material-ui';

import {NavigationBar} from './NavigationBar';
import NewPerson from './NewPerson';
import * as profileActions from '../actions/persons.actions';

const styles = {
    margin: '15px',
};

const paperStyle = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class Standings extends Component {

    state = {isNewPersonButtonClicked: false};

    handleOpen = () => {this.setState({isNewPersonButtonClicked: true});};
    handleClose = () => {this.setState({isNewPersonButtonClicked: false});};

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Create"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

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

                    <Dialog
                        title="Create New Person"
                        actions={actions}
                        modal={true}
                        open={this.state.isNewPersonButtonClicked}
                    >
                        <NewPerson/>
                    </Dialog>

                </div>

                <div>
                    <RaisedButton label="New" primary={true} onClick={this.handleOpen} />
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