import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

interface NewProfileFormProps {
    parameters: any[];
}

const inputParam = (props) => (
    <TextField
        name={props.name}
        floatingLabelText={props.title}
        type={props.type}
        style={{
            width: '100%',
        }}
        {...props.input}
    />
);

const divStyle = {
    overflow: 'hidden',
    width: '40%',
};

class NewProfileForm extends Component<NewProfileFormProps, {}> {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {
                    this.props.parameters.map(function(parameter) {
                        return (
                            <div key={parameter.name} style={divStyle}>
                                <Field component={inputParam} {...parameter} />
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