import {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText, CardActions, FlatButton, } from 'material-ui';

import {NavigationBar} from './NavigationBar';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import * as personsActions from '../actions/persons.actions';

const containerStyles = {
    width: '30%',
    margin: '0 auto',
};

const cardStyles = {
    margin: '15px 0',
};

// const moreHorizIcon = (
//     <MoreHorizIcon color={grey400} />
// );
//
// const rightIconMenu = (f) => {
//     return (
//         <IconMenu iconButtonElement={moreHorizIcon}>
//             <MenuItem> Edit </MenuItem>
//             <MenuItem onClick={f}> Delete </MenuItem>
//         </IconMenu>
//     );
// };

class PersonsList extends Component {

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
                                        <FlatButton label="Edit"/>
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

function mapStateToProps(state) {
    return {
        persons: state.persons.persons,
    };
}

export default connect(
    mapStateToProps,
    personsActions
)(PersonsList);