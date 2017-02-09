import {Component} from 'react';
import {connect} from 'react-redux';

import {RaisedButton, Card, CardText, CardActions, CardHeader} from 'material-ui';

import {NavigationBar} from './NavigationBar';
// import NewPerson from './NewPerson';
import * as profileActions from '../actions/persons.actions';

const styles = {
    margin: '15px',
};

const cardStyles = {
    width: '30%',
};

class Standings extends Component {

    // state = {isNewPersonButtonClicked: false};

    // handleOpen = () => {this.setState({isNewPersonButtonClicked: true}); };
    // handleClose = () => {this.setState({isNewPersonButtonClicked: false}); };

    render() {

        return (

            <div>
                <NavigationBar/>

                <div style={styles}>
                    <h1> Persons </h1>
                    {
                        this.props.persons.map((person) => {
                            return (
                                <Card style={cardStyles}>
                                    <CardHeader
                                        title={person.name}
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                    />

                                    <CardText expandable={true}>

                                        Person parameters: <br/><br/>

                                        {
                                            Object.keys(person.data).map((key, index) => {
                                                return (
                                                    <span key={key}>
                                                        {key}: <b> {person.data[key]} </b> <br/>
                                                    </span>
                                                );
                                            })
                                        }
                                    </CardText>
                                </Card>
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