import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const inputParam = (prop) => (
    <TextField
        name={prop.parameter}
        floatingLabelText={prop.parameter}
        type="number"
        style={{
            width: '100%',
        }}
        {...prop.input}
    />
);

const divStyle = {
    overflow: 'hidden',
    width: '40%',
};

class NewProfileForm extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {
                    this.props.parameters.map(function(parameter) {
                        return (
                            <div key={parameter} style={divStyle}>
                                <Field component={inputParam} {parameter} />
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

const NewProfile = reduxForm(
    {
        form: 'newProfile',
    }
)(NewProfileForm);

export default {form: NewProfile};