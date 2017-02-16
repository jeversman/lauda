import {Component} from 'react';

import {Component} from 'react';
import {connect} from 'react-redux';
import {DropDownMenu, MenuItem, } from 'material-ui';

import {NavigationBar} from './NavigationBar';
import EditableList from './EditableList';
import * as personsActions from '../actions/persons.actions';
import params from '../configs';

const containerStyles = {
    width: '30%',
    margin: '0 auto',
};

const menuStyles = {
    margin: '15px 0',
};

const personListStyles = {
    margin: '15px 0',
};

class EditByParams extends Component {

    constructor(props) {
        super(props);
        this.state = {currParam: 0};
    }

    handleChange = (event, index, value) => this.setState({
        currParam: value
    });

    render() {

        return (
            <div>

                <NavigationBar/>

                <div style={containerStyles}>

                    <DropDownMenu
                        value={this.state.currParam}
                        onChange={this.handleChange}
                        openImmediately={true}
                        style={menuStyles}
                    >
                        {
                            params.parametersForInput.map((param, index) => {
                                return (<MenuItem value={index} primaryText={param.fieldName}/>)
                            })
                        }
                    </DropDownMenu>

                    <div style={personListStyles}>
                        <EditableList.form persons={this.props.persons} paramName={this.state.currParam} updatePersons={this.props.updatePersons}/>
                    </div>

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
)(EditByParams);