import {Component} from 'react';
import {connect} from 'react-redux';

import NewPersonForm from './NewPersonForm';
// import * as profileActions from '../actions/persons.actions';
import data from 'configs/person.config.json';

const styles = {
    margin: '15px',
};

class NewProfile extends Component {

    // render() {
    //     return (
    //         <div>
    //             <NavigationBar/>
    //             <div style={styles}>
    //                 <NewProfileForm.form onSubmit={(person) => this.props.createProfile({profile: profile})} {...data} />
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div>
                <div style={styles}>
                    <NewPersonForm.form {...data} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps
)(NewProfile);

