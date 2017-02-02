import {Component} from 'react';
import {connect} from 'react-redux';

import NewPersonForm from './NewPersonForm';
import {Dialog, } from 'material-ui';
import parameters from 'configs/person.config.json';
import * as personsActions from 'actions/persons.actions';

class NewProfile extends Component {
    render() {
        const {open, actions} = this.props;
        return (
            <Dialog
                title="Create New Person"
                actions={actions}
                modal={true}
                open={open}
            >
                <NewPersonForm.form onSubmit={(person) => this.props.createPerson({person: person})} {...parameters} />
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    personsActions
)(NewProfile);

