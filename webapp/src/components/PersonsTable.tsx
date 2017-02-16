import {Component} from 'react';
import {
    Table, TableHeader, TableBody, TableRow,
    TableHeaderColumn, TableRowColumn,
} from 'material-ui';
import SortIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import {comparePersonsByParam} from 'utils/persons';

// import config from '../configs/personParams.config.json';
import config from '../configs';

const selectedHeaderColumnStyles = {
    backgroundColor: '#A9ECF5', //'#292B2B'
    textAlign: 'center',
};

const headerColumnStyles = {
    textAlign: 'center',
};

const selectedRowColumnStyles = {
    backgroundColor: '#C5F4FA', //'#A3A3A3',
    textAlign: 'center',
};

const rowColumnStyles = {
    textAlign: 'center',
};

const nameColumnStyles = {
    width: '100px',
};

export class PersonsTable extends Component {
    paramsList = config.parametersListForTable;

    constructor(props) {
        super(props);
        this.state = {sortHeader: null};
    }

    sortByColumn(headerName, persons) {
        let newPersons = persons.sort(comparePersonsByParam(headerName));

        this.setState({
            persons: newPersons,
            sortHeader: headerName,
        });
    }

    render() {

        const {persons} = this.props;

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn></TableHeaderColumn>
                        <TableHeaderColumn style={nameColumnStyles}>Name</TableHeaderColumn>
                        {
                            this.paramsList.map((paramName) => (
                                <TableHeaderColumn style={(this.state.sortHeader === paramName) ? selectedHeaderColumnStyles : headerColumnStyles}>
                                    <div>
                                        {paramName} <br/>
                                        <SortIcon
                                            onMouseUp={() => this.sortByColumn(paramName, persons)}
                                        />
                                    </div>
                                </TableHeaderColumn>
                            ))
                        }
                    </TableRow>
                </TableHeader>

                <TableBody showRowHover>
                    {
                        persons.map((person, index) => (
                            <TableRow>
                                <TableRowColumn>{index+1}</TableRowColumn>
                                <TableRowColumn style={nameColumnStyles}>{person.name}</TableRowColumn>
                                {this.paramsList.map((paramName, index) => (
                                        <TableRowColumn key={index} style={(this.state.sortHeader === paramName) ? selectedRowColumnStyles : rowColumnStyles}>
                                            {person.data[paramName]}
                                        </TableRowColumn>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        );

    }
}