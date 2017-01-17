import {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

interface NewProfileFormProps {
    params: any[];
}

// const inputParam = (props) => (
//     <TextField
//         name={props.name}
//         hintText={props.title}
//         floatingLabelText={props.title}
//         type={props.type}
//         style={{
//             width: '25%',
//         }}
//         {...props.input}
//     />

// floatingLabelText={props.title.substr(0, 30)}  floatingLabelText={props.title} floatingLabelFixed={true}
// );

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
    width: '40%'
}

class NewProfileForm extends Component<NewProfileFormProps, {}> {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {
                    this.props.params.map(function(param) {
                        return (
                            <div key={param.name} style={divStyle}>
                                <Field component={inputParam} {...param} />
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