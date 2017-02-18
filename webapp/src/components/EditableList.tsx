import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TextField, Divider, Paper, RaisedButton, } from 'material-ui';

import {comparePersonsByParam} from 'utils/persons';

// import * as personsActions from '../actions/persons.actions';
// import params from '../configs';

const containerStyles = {
    margin: '0px auto',
};

const paperStyles = {
    margin: '15px auto',
};

const inputStyles = {
    margin: '0 auto',
    textAlign: 'center',
};

const buttonStyles = {
    margin: '10% 40%',
};

const textFieldStyles = {
    width: '50%',
    textAlign: 'center',
};

const editParam = (props) => {
    return (
        <div>
            <div style={inputStyles}>
                <h2>{props.person.name}</h2>
                <TextField
                    floatingLabelText={props.paramName}
                    type={props.type}
                    onChange={props.onChange}
                    {...props.input}
                    style={textFieldStyles}
                />
            </div>
            <br/><br/><Divider/>
        </div>
    );
};

class EditableListForm extends Component {

    render() {
        let {persons, paramName, handleSubmit} = this.props;
        persons = persons.sort(comparePersonsByParam(paramName));
        return (
          <div style={containerStyles}>
              <form onSubmit={handleSubmit}>
                  <Paper style={paperStyles}>
                      {
                          persons.map((person) => {
                              return (
                                  <Field
                                      component={editParam}
                                      type="text"
                                      name={person.name}
                                      person={person}
                                      paramName={paramName}
                                  />
                              );
                          })
                      }
                  </Paper>
                  <RaisedButton style={buttonStyles} type="submit" label="submit" primary={true} />
              </form>
          </div>
        );
    }
}

let EditableList = reduxForm(
    {
        form: 'editableList',
    }
)(EditableListForm);

export default {form: EditableList};
