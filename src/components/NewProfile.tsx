import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import NewProfileForm from './NewProfileForm';

// import * as actions from '../actions/actions';
// import {createProfile} from '../actions/profiles.actions';
import * as profileActions from '../actions/profiles.actions';

import params from '../../configs/ui.json';

interface NewProfileProps {
    createProfile();
}

const styles = {
    margin: '15px',
};

class NewProfile extends Component<NewProfileProps, {}> {

    constructor(props) {
        super(props);

        this.createParametersConfig();
    }

    data: any = {}; // TODO Refactor

    createParametersConfig() {
        let parametersConfig = [];
        let name = {name: 'name', type: 'text', title: 'Name'};
        parametersConfig.push(name);

        for (let key in params) {
            let validParamsObj = this.changeType(params[key]);
            let param = validParamsObj;
            param['name'] = key;
            parametersConfig.push(param);
        }

        this.data['params'] = parametersConfig;

        console.log('DATA DATA');
        console.log(this.data);
    }

    // TODO move to utils
    changeType(obj): any {
        for (let key in obj) {
            if (key === 'type') {
                switch (obj[key]) {
                    case 'int':
                        obj[key] = 'number';
                        break;
                    case 'double':
                        obj[key] = 'number';
                        break;
                    case 'string':
                        obj[key] = 'text';
                        break;
                    default:
                }
            }
        }
        return obj;
    }

    // data: any = {
    //     params: [
    //         {name: 'name', type: 'text', description: 'Name'},
    //         {name: 'param1', type: 'number', description: 'first parameter'},
    //         {name: 'param2', type: 'number', description: 'second parameter'},
    //     ],
    // };

    render() {
        return (
            <div>
                <NavigationBar/>
                <div style={styles}>
                    <h1> New Profile </h1>
                    <NewProfileForm.form onSubmit={this.props.createProfile} {...this.data} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

// function mapDispatchToProps(dispatch) {
//     return {
//         createProfile: (profile) => {
//             console.log('DISPATCH ACTION');
//             dispatch(createProfile(profile));
//         }
//     };
// }

export default connect(
    mapStateToProps,
    // mapDispatchToProps
    profileActions
)(NewProfile);

