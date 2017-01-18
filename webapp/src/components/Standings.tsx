import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import {Profile} from './Profile';
import * as profileActions from '../actions/profiles.actions';

interface ProfilesProps {
    profiles: any[];
    getProfiles();
    deleteProfile();
}

const styles = {
    margin: '15px',
};

class Profiles extends Component<ProfilesProps, {}> {
    
    getProfiles() {
        this.props.getProfiles();
    }

    render() {
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

function mapStateToProps(state) {
    return {
        profiles: state.profiles.profiles,
    };
}

export default connect(
    mapStateToProps,
    profileActions
)(Profiles);