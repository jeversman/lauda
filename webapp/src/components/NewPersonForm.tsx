import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import TextField from 'material-ui/TextField';
import {RaisedButton, } from 'material-ui';

const inputParam = (props) => {
    return (
        <TextField
            floatingLabelText={props.fieldName}
            type={props.type}
            style={{
                width: '100%',
            }}
            {...props.input}
        />
    );
};

const divStyle = {
    overflow: 'hidden',
    width: '40%',
};


class NewPersonForm extends Component {

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {
                    this.props.parameters.map(function(parameter) {
                        return (
                            <div key={parameter.fieldName} style={divStyle}>
                                <Field component={inputParam} {...parameter} name={parameter.fieldName}/>
                            </div>
                        );
                    })
                }

                <div>
                    <RaisedButton type="submit" label="submit" primary={true} />
                </div>
            </form>
        );
    }
}

const NewPerson = reduxForm(
    {
        form: 'newProfile',
    }
)(NewPersonForm);

export default {form: NewPerson};