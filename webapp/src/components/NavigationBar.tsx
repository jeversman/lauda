import {Component, PropTypes} from 'react';
import {AppBar, MenuItem, Drawer} from 'material-ui';

interface NavigationBarProps {}

export class NavigationBar extends Component<NavigationBarProps, {
    open: boolean
}> {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        return (
            <div>
                <AppBar
                    title="LAUDA"
                    onClick={this.toggleDrawer}
                />
                <Drawer open={this.state.open}>
                    <MenuItem onClick={() => this.handleMenuItemClick(this, 'NewPerson')}> New Person </MenuItem>
                    <MenuItem onClick={() => this.handleMenuItemClick(this, 'Standings')}> Standings </MenuItem>
                    <MenuItem onClick={() => this.handleMenuItemClick(this, 'PersonsList')}> Persons List </MenuItem>
                </Drawer>
            </div>
        );
    }

    toggleDrawer = () => this.setState({open: !this.state.open});

    handleMenuItemClick(e, link) {
        this.toggleDrawer();
        this.context.router.push('/' + link);
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired,
};