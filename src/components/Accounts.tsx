import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import {Account} from './Account';
import * as actions from '../actions/actions';

interface AccountsProps {
    children?: any;
    accounts: any[];
    profiles: any[];
    addProfileToAccount();
}

const styles = {
    margin: '15px',
};

export class Accounts extends Component<AccountsProps, {}> {
    render() {
        return (
            <div>
                <NavigationBar/>

                <div style={styles}>
                    <h1> Accounts </h1>

                    {
                        this.props.accounts.map((account) => {
                            return <Account
                                key={account.id}
                                profiles={this.props.profiles}
                                {...account}
                                addProfile={this.props.addProfileToAccount}
                            />;
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.mainReducer.accounts,
        profiles: state.mainReducer.profiles,
    };
}

export default connect(
    mapStateToProps,
    actions
)(Accounts);