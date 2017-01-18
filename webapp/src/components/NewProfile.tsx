import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import NewProfileForm from './NewProfileForm';
import * as profileActions from '../actions/profiles.actions';
import parameters from '../../configs/ui.json';
import {createParametersConfig} from '../utils/parametersConfig';

interface NewProfileProps {
    createProfile({});
}

const styles = {
    margin: '15px',
};

class NewProfile extends Component<NewProfileProps, {}> {
    data: any = {parameters: createParametersConfig(parameters)};

    render() {
        return (
            <div>
                <NavigationBar/>
                <div style={styles}>
                    <h1> New Profile </h1>
                    <NewProfileForm.form onSubmit={(profile) => this.props.createProfile({profile: profile})} {...this.data} />
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
    profileActions
)(NewProfile);

