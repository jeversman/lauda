import {Component, } from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

// TODO add type for profilesData
interface ProfileProps {
    name: string;
    profileData: any;
    deleteProfile(name: string);
}

const styles = {
    width: '30%',
};

const titleStyles = {
    fontSize: '140%',
};

const actionsStyles = {
    textAlign: 'right',
};

export class Profile extends Component<ProfileProps, {}> {

    render() {
        return (
            <div>
                <br/>
                <Card style={styles}>
                    <CardHeader
                        title={this.props.name}
                        actAsExpander={true}
                        showExpandableButton={true}
                        titleStyle={titleStyles}
                    />

                    <CardText expandable={true}>

                        Profile parameters: <br/><br/>

                        {
                            Object.keys(this.props.profileData).map((key, index) => {
                                if (key !== 'name') {
                                    return (
                                        <span key={key}>
                                            {key}: <b> {this.props.profileData[key]} </b> <br/>
                                        </span>
                                    );
                                }
                            })
                        }

                        <CardActions style={actionsStyles}>
                            <RaisedButton label="Delete" onClick={() => this.props.deleteProfile(this.props.name)}></RaisedButton>
                        </CardActions>

                    </CardText>
                </Card>
            </div>
        );
    }
}

