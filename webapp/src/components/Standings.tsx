import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {DropDownMenu, MenuItem, FlatButton, } from 'material-ui';

import {NavigationBar} from './NavigationBar';
import {PersonsTable} from './PersonsTable';
import * as personsActions from '../actions/persons.actions';
import params from '../configs';

const styles = {
    margin: '15px',
};

const containerStyles = {
    width: '30%',
    margin: '0 auto',
    textAlign: 'center',
};

const menuStyles = {
    margin: '15px 0',
};

class Standings extends Component {

    constructor(props) {
        super(props);
        this.state = {currParam: 0};
    }

    handleChange = (event, index, value) => this.setState({
        currParam: value,
    });

    editPersons() {

      this.context.router.push({
          pathname: '/EditByParams',
          state: { paramName: params.parametersForInput[this.state.currParam].fieldName },
      });
    }

    render() {
        return (

            <div>
                <NavigationBar/>

                <div style={containerStyles}>

                    <h2>Edit persons list by param:</h2>

                    <DropDownMenu
                        value={this.state.currParam}
                        onChange={this.handleChange}
                        style={menuStyles}
                    >
                        {
                            params.parametersForInput.map((param, index) => {
                                return (<MenuItem value={index} primaryText={param.fieldName}/>);
                            })
                        }
                    </DropDownMenu>

                    <FlatButton label='Edit' primary={true} onClick={() => this.editPersons()} />
                </div>

                <div style={styles}>
                    <PersonsTable persons={this.props.persons} />
                </div>
            </div>
        );
    }
}

Standings.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        persons: state.persons.persons,
    };
}

export default connect(
    mapStateToProps,
    personsActions
)(Standings);
