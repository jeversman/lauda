import {Component} from 'react';
import {connect} from 'react-redux';

import NewPersonForm from './NewPersonForm';
import {NavigationBar} from './NavigationBar';
import * as personsActions from 'actions/persons.actions';
import {addPersonListsToParameters} from 'utils/parametersConfig';
import {createEmptyPerson} from 'utils/persons';

import parameters from '../configs/personParams.config.json';

const formStyles = {
    width: '25%',
    margin: '0 auto',
};

class NewProfile extends Component {

    parameters = addPersonListsToParameters(parameters, this.props.persons);
    
    render() {
        let person = (this.props.location.state && this.props.location.state.person) ? this.props.location.state.person : createEmptyPerson();
        this.props.editPerson({person: person});

        return (
            <div>
                <NavigationBar/>

                <div style={formStyles}>
                    <NewPersonForm.form onSubmit={(person) => this.props.createPerson({person: person})} {...this.parameters} />
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
)(NewProfile);

