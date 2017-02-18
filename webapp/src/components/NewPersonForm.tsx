import {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';


import TextField from 'material-ui/TextField';
import {RaisedButton, Card, CardHeader, CardText, Divider, } from 'material-ui';

const inputStyles = {
    width: '80%',
    margin: '0 auto',
};

const buttonStyles = {
    margin: '10% 40%',
};

const inputParam = (props) => {
    return (
        <div>
            <div style={inputStyles}>
                <TextField
                    floatingLabelText={props.fieldName}
                    type={props.type}
                    {...props.input}
                    style={{width: '100%'}}
                />

                {
                    (props.fieldName === 'name') ? null :
                        <Card>
                            <CardHeader
                                title={props.fieldName + ' standings'}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                {
                                    props.standings.map((person) => {
                                        return (
                                            <span key={person.name}>
                                        {person.name}: <b> {person.data[props.fieldName]} </b> <br/>
                                    </span>
                                        );
                                    })
                                }
                            </CardText>
                        </Card>
                }
            </div>

            <br/>
            <br/>

            <Divider/>
        </div>
    );
};

class NewPersonForm extends Component {

    render() {

        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div key={'name'}>
                    <Field component={inputParam} type="text" name="name" fieldName="name" />
                </div>

                {
                    this.props.parametersForInput.map(function(parameter) {
                        return (
                            <div key={parameter.fieldName}>
                                <Field component={inputParam} {...parameter} name={parameter.fieldName}/>
                            </div>
                        );
                    })
                }

                <div>
                    <RaisedButton style={buttonStyles} type="submit" label="submit" primary={true} />
                </div>
            </form>
        );
    }
}

let NewPerson = reduxForm(
    {
        form: 'newProfile',
    }
)(NewPersonForm);

NewPerson = connect(
    state => ({initialValues: state.persons.editPerson})
)(NewPerson);

export default {form: NewPerson};
