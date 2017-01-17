import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import {Profile} from './Profile';
import * as profileActions from '../actions/profiles.actions';

interface ProfilesProps {
    profiles: any[];
    getProfiles();
    deleteProfile(profileName: string);
}

const styles = {
    margin: '15px',
};

class Profiles extends Component<ProfilesProps, {}> {
    
    getProfiles() {
        this.props.getProfiles();
    }

    render() {

        console.log('RENDER METHOD OF PROFILES COMPONENT CALLED');

        return (

            <div>
                <NavigationBar/>

                <div style={styles}>
                    <h1> Profiles </h1>
                    {
                        this.props.profiles.map((profile) => {
                            return <Profile key={profile.name} name={profile.name} profileData={profile.data} deleteProfile={this.props.deleteProfile}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

// FIXME "mainReducer"
function mapStateToProps(state) {
    return {
        profiles: state.mainReducer.profiles,
    };
}

export default connect(
    mapStateToProps,
    profileActions
)(Profiles);