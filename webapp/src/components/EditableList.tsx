import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {TextField, Divider, Paper, CardHeader, CardText, CardActions, FlatButton, } from 'material-ui';

import * as personsActions from '../actions/persons.actions';
import params from '../configs';

const containerStyles = {
    width: '30%',
    margin: '0px auto',
};

const paperStyles = {
    // width: '30%',
    margin: '15px auto',
};

const personListStyles = {
    margin: '15px 0',
};

const inputStyles = {
    // width: '80%',
    display: 'flex',
    margin: '0 auto'
};

const editParam = (props) => {
    return (
        <div>
            <div style={inputStyles}>
                
                <h2>{props.person.name}</h2>
                
                <TextField
                    floatingLabelText={props.paramName}
                    type={props.type}
                    {...props.input}
                    style={{width: '100%'}}
                />
            </div>

            <br/>
            <br/>

            <Divider/>
        </div>
    );
};

class EditableListForm extends Component {

    render() {

        const {persons, paramName, updatePersons} = this.props;

        return (
            <div>
                <div style={containerStyles}>

                    <Paper>
                        <form onSubmit={(obj) => updatePersons({persons: obj})}>
                            {
                                persons.map((person) => {
                                    return (
                                        <Field component={editParam} type="text" name={person.name} person={person} paramName={paramName} />
                                    )
                                })
                            }
                        </form>
                    </Paper>
                </div>

            </div>
        );
    }
}

let EditableList = reduxForm(
    {
        form: 'editableList',
    }
)(EditableListForm);

// EditableList = connect(
//     state => ({initialValues: state.persons.editPerson})
// )(EditableList)

export default {form: EditableList};
