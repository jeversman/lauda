import {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem, IconButton, IconMenu, MenuItem, Paper} from 'material-ui';

import {NavigationBar} from './NavigationBar';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const paperStyles = {
    width: '30%',
    margin: '0 auto',
};

const moreIcon = (
    <MoreHorizIcon color={grey400} />
);

const rightIconMenu = (
    <IconMenu iconButtonElement={moreIcon}>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Edit</MenuItem>
    </IconMenu>
);

class PersonsList extends Component {

    render() {
        return (
            <div>

                <NavigationBar/>

                <Paper style={paperStyles}>
                    <List>
                        {this.props.persons.map((person, index) => (
                            <ListItem key={index} primaryText={person.name} rightIcon={rightIconMenu}/>
                        ))}
                    </List>
                </Paper>

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
    mapStateToProps
)(PersonsList);