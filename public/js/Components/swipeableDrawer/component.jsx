import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import ContactMail from '@material-ui/icons/ContactMail';
import Work from '@material-ui/icons/Work';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Toys from '@material-ui/icons/Toys';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { connect } from 'react-redux';
import { toggleContactForm, toggleDrawerState } from '../../redux/modules/reducerHandlers';
import { Link } from "react-router-dom";

const styles = theme => ({
    root: {
        background: 'rgb(48, 42, 42);',
    },
    list: {
        width: '600px',
    },
    tabAvatar: {
        margin: '0',
        backgroundColor: '#f35f3cd9',
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        fontSize: '1.75rem'
    },
    subHeading: {
        fontSize: '1.15rem',
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    },
    buttonBase: {
        paddingTop: '46px',
    },
    iconClass: {

    },
    drawer: {
        height: '102vh'
    },
    tabAvatarContainer: {
        width: '100px',
        height: '100px'
    },
    [`${theme.breakpoints.down('md')}`]: {
        subHeading: {
            fontSize: '3rem',
            fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
            opacity: '0.6'
        },
        iconClass: {
            fontSize: '4rem'
        },
        buttonBase: {
            paddingTop: '15%',
        },
        tabAvatarContainer: {
            width: '100px',
            height: '100px'
        },
        tabAvatar: {
            fontSize: '3rem',
            width: '100px',
            height: '100px'
        },
    }
});

class CustomDrawer extends React.Component {

    toggleDrawer = (open) => () => {
        this.props.toggleDrawerState(open);
    };

    handleDialogClickOpen = () => {
        this.props.toggleContactForm(true);
    };

    handleDialogClose = () => {
        this.props.toggleContactForm(false);
    };

    render() {
        const { classes, drawerState } = this.props;
        return (

            <SwipeableDrawer
                disableBackdropTransition
                disableRestoreFocus
                open={this.props.fieldState.drawer.state}
                onClose={this.toggleDrawer(false)}
                onOpen={this.toggleDrawer(true)}
                anchor="right"
            >
                <div
                    tabIndex={0}
                    role="button"
                >

                    <List className={classes.list}>
                        <ListItem className={classes.tabAvatarContainer}>
                            <Avatar className={classes.tabAvatar}>MJ</Avatar>
                        </ListItem>
                        <ListItem button className={classes.buttonBase} component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon className={classes.iconClass} />
                            </ListItemIcon>
                            <ListItemText disableTypography={true} primarytypographyprops={{ className: classes.subHeading }} primary="Home" className={classes.subHeading} onClick={this.toggleDrawer(false)} />
                        </ListItem>
                        <ListItem button className={classes.buttonBase} component={Link} to="/blog" onClick={this.toggleDrawer(false)}>
                            <ListItemIcon>
                                <ArtTrack className={classes.iconClass} />
                            </ListItemIcon>
                            <ListItemText disableTypography={true} primarytypographyprops={{ className: classes.subHeading }} primary="Blog" className={classes.subHeading} />
                        </ListItem>
                        <ListItem button className={classes.buttonBase} component={Link} to="/projects" onClick={this.toggleDrawer(false)} >
                            <ListItemIcon>
                                <Work className={classes.iconClass} />
                            </ListItemIcon>
                            <ListItemText disableTypography={true} primarytypographyprops={{ className: classes.subHeading }} primary="Projects" className={classes.subHeading} />
                        </ListItem>
                        <ListItem button className={classes.buttonBase} component={Link} to="/hobbies" onClick={this.toggleDrawer(false)} >
                            <ListItemIcon>
                                <Toys className={classes.iconClass} />
                            </ListItemIcon>
                            <ListItemText disableTypography={true} primarytypographyprops={{ className: classes.subHeading }} primary="Hobbies" className={classes.subHeading} />
                        </ListItem>
                        <ListItem button className={classes.buttonBase} component="a" onClick={this.handleDialogClickOpen}>
                            <ListItemIcon>
                                <ContactMail className={classes.iconClass} />
                            </ListItemIcon>
                            <ListItemText primary="Contact" disableTypography={true} primarytypographyprops={{ className: classes.subHeading }} className={classes.subHeading} />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>

        );
    }
}

CustomDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => {
    return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleDrawerState: (drawerState) => {
            return toggleDrawerState(dispatch, drawerState);
        },
        toggleContactForm: (dialogState) => {
            return toggleContactForm(dispatch, dialogState);
        }
    }
}

export default (withStyles(styles, { withTheme: true }))(connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomDrawer));
