import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText, CardActions, FlatButton, } from 'material-ui';

import {NavigationBar} from './NavigationBar';
import * as personsActions from '../actions/persons.actions';

const containerStyles = {
    width: '30%',
    margin: '0 auto',
};

const cardStyles = {
    margin: '15px 0',
};

class PersonsList extends Component {

    editPerson(person) {
        this.context.router.push({
            pathname: '/NewPerson',
            state: { person: person },
        });
    }

    render() {
        return (
            <div>
                <NavigationBar/>

                <div style={containerStyles }>
                    {this.props.persons.map((person, index) => (
                        <Card key={person.name} style={cardStyles}>
                            <CardHeader
                                title={person.name}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />

                            <CardText expandable={true}>

                                Person parameters: <br/><br/>

                                {Object.keys(person.data).map((key, index) => {
                                    return (
                                        <span key={key}>
                                            {key}: <b> {person.data[key]} </b> <br/>
                                        </span>
                                    );
                                })}

                                <div style={{textAlign: 'right'}}>
                                    <CardActions>
                                        <FlatButton label="Edit" onClick={() => this.editPerson(person)}/>
                                        <FlatButton label="Delete" onClick={() => this.props.deletePerson({personName: person.name})}/>
                                    </CardActions>
                                </div>
                            </CardText>
                        </Card>
                    ))}
                </div>

            </div>
        );
    }
}

PersonsList.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        persons: state.persons.persons,
    };
}

export default connect(
    mapStateToProps,
    personsActions
)(PersonsList);
