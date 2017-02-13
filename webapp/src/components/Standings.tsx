import {Component} from 'react';
import {connect} from 'react-redux';

import {RaisedButton, Card, CardText, CardActions, CardHeader} from 'material-ui';

import {NavigationBar} from './NavigationBar';
import {PersonsTable} from './PersonsTable';
import * as personsActions from '../actions/persons.actions';

const styles = {
    margin: '15px',
};

// const cardStyles = {
//     width: '30%',
// };

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




// <h1> Persons </h1>
// {
//     this.props.persons.map((person) => {
//         return (
//             <Card style={cardStyles}>
//                 <CardHeader
//                     title={person.name}
//                     actAsExpander={true}
//                     showExpandableButton={true}
//                 />
//
//                 <CardText expandable={true}>
//
//                     Person parameters: <br/><br/>
//
//                     {
//                         Object.keys(person.data).map((key, index) => {
//                             return (
//                                 <span key={key}>
//                                                         {key}: <b> {person.data[key]} </b> <br/>
//                                                     </span>
//                             );
//                         })
//                     }
//                 </CardText>
//             </Card>
//         );
//     })
// }