import {Component} from 'react';
import {connect} from 'react-redux';

import NewPersonForm from './NewPersonForm';
import {NavigationBar} from './NavigationBar';
import * as personsActions from 'actions/persons.actions';

import parameters from 'configs/person.config.json';

const styles = {

};

const formStyles = {
    width: '25%',
    margin: '0 auto',
};

class NewProfile extends Component {
    // render() {
    //     const {open, actions, handleClose} = this.props;
    //     return (
    //         <Dialog
    //             title="Create New Person"
    //             modal={false}
    //             open={open}
    //             onRequestClose={handleClose}
    //         >
    //             <div>
    //                 <NewPersonForm.form onSubmit={(person) => this.props.createPerson({person: person})} {...parameters} />
    //             </div>
    //         </Dialog>
    //     );
    // }

    render() {
        return (
            <div style={styles}>
                <NavigationBar/>

                <div style={formStyles}>
                    <NewPersonForm.form onSubmit={(person) => this.props.createPerson({person: person})} {...parameters} />
                </div>
            </div>
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

