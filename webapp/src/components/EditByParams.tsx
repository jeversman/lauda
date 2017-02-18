import {Component} from 'react';
import {connect} from 'react-redux';

import {NavigationBar} from './NavigationBar';
import EditableList from './EditableList';
import * as personsActions from '../actions/persons.actions';
import params from '../configs';

const containerStyles = {
    width: '30%',
    margin: '0 auto',
    textAlign: 'center',
};

const personListStyles = {
    margin: '15px 0',
};

class EditByParams extends Component {
    preparePersonForUpdate(obj, paramName) { // FIXME Move to utils?
      this.props.persons.map((person) => {
        person.data[paramName] = obj[person.name];
      });
      this.props.updateAllPersons({persons: this.props.persons});
    }

    getInitialValues(paramName) {
      let obj = {};
      this.props.persons.map((person) => {
        obj[person.name] = person.data[paramName];
      });
      return obj;
    }

    render() {

      const {paramName} = (this.props.location && this.props.location.state) ?
          this.props.location.state :
          params.parametersForInput[0].fieldName;

      return (
            <div>
                <NavigationBar/>

                <div style={containerStyles}>
                    <div style={personListStyles}>
                      <EditableList.form
                        persons={this.props.persons}
                        paramName={paramName}
                        onSubmit={(obj) => this.preparePersonForUpdate(obj, paramName)}
                        initialValues={this.getInitialValues(paramName)}
                      />
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
