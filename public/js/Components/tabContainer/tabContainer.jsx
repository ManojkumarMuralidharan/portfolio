import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { toggleContactForm, toggleDrawerState } from '../../redux/modules/reducerHandlers';
import _ from 'lodash';
import * as types from '../../constants/actionTypes';
import { Link } from "react-router-dom";
import { auto } from 'async';
import ResponsiveDialog from '../responsiveDialog/component.jsx';
import CustomDrawer from '../swipeableDrawer/component.jsx';

const styles = theme => ({
  root: {
    background: 'rgb(48, 42, 42);',
  },
  selected: {
    color: 'white',
  },
  hover: {
    cursor: 'default',
  },
  menuDrawer: {
    display: 'none',
    color: 'white',
  },
  icons: {
    color: 'white',
    width: '2em',
    height: 'auto',
  },
  iconButton: {
    '&:hover': {
      transform: 'scale(1.2)',
    },
    paddingLeft: '30%',
    paddingTop: '3%',
  },
  appBar: {
    position: 'relative',
  },
  tabMenu: {
    color: 'white',
    fontFamily: "'Exo', sans-serif;",
    border: '2px solid rgba(255,255,255,0)',
    '&:hover': {
      border: '2px solid rgba(255,255,255,0.8)',
      borderRadius: '4%',
      background: 'transparent',
    },
    '&:selected': {
      color: 'white',
    },
  },
  '@keyframes navfadein': {
    from: {
      opacity: '1',
    },
    to: {
      boxShadow: '0 10px 6px -6px #777',
      opacity: '0.7',
    },
  },
  indicator: {
    backgroundColor: 'white',
  },
  flexContainer: {
    placeContent: 'flex-end',
  },
  appBar: {
    background: '#302b2a',
    boxShadow: 'none',
  },
  avatar: {
    backgroundColor: '#302b2a',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: '1.75rem',
    position: 'absolute',
    left: '32px',
    top: '8px',
  },
  [`${theme.breakpoints.down('md')}`]: {
    avatar: {
      width: '60px',
      height: '60px',
      top: '16px',
    },
    menuDrawer: {
      display: 'block',
      color: 'white',
      paddingRight: '4%',
    },
    tabMenu: {
      display: 'none',
    },
    flexContainer: {
      placeContent: 'flex-end',
    },
    icon: {
      width: '3em',
      height: '3em',
    },
    icons: {
      width: '4em',
    },
    iconButton: {
      paddingLeft: '30%',
      paddingTop: '18%',
    },
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 'home',
  };

  toggleDrawer = open => () => {
    this.props.toggleDrawerState(open);
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.switchTabs(value);
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  handleDialogClickOpen = () => {
    this.props.toggleContactForm(true);
  };

  handleDialogClose = () => {
    this.props.toggleContactForm(false);
  };

  render() {
    const { classes } = this.props;
    const fullScreen = _.get(this.props, ['appState', 'width'], false) && this.props.appState.width < 1000;
    return (
      <Grid container className={classes.appBar}>
        <Grid item lg={1} sm={3} md={3} xs={3} className={classes.root}>
          <IconButton variant="fab" href="https://www.linkedin.com/in/manojkumarmuralidharan" aria-label="add" className={classes.iconButton}>
            <img src="/images/avatar.png" className={classes.icons} alt="" />
          </IconButton>
        </Grid>
        <Grid item lg={11} sm={9} md={9} xs={9}>
          <AppBar color="default" className={classes.appBar} style={{ position: 'relative' }}>
            <Tabs
              selected={classes.selected}
              value={this.state.value}
              onChange={this.handleChange}
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                flexContainer: classes.flexContainer,
                indicator: classes.indicator,
              }}
            >
              <Tab value="mobile_home" label="home" icon={<MenuIcon className={classes.icon} />} className={classes.menuDrawer} onClick={this.toggleDrawer(true)} />
              <Tab component={Link} to="/" label="home" value="home" variant="outlined" className={classes.tabMenu} />
              <Tab component={Link} to="/blog" value="blog" label="Blog" className={classes.tabMenu} />
              <Tab component={Link} to="/projects" value="projects" label="Projects" className={classes.tabMenu} />
              <Tab component={Link} to="/hobbies" value="hobbies" label="Hobbies" className={classes.tabMenu} />
              <Tab value="contact" label="Contact" onClick={this.handleDialogClickOpen} className={classes.tabMenu} />
            </Tabs>
          </AppBar>
          <CustomDrawer />
        </Grid>
        {this.props.fieldState.contactForm.display ? <ResponsiveDialog fullScreen={fullScreen} open={false} /> : null}
      </Grid>

    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = (dispatch, ownProps) => ({
  switchTabs: (tabSelected) => {
    dispatch({
      type: types.UPDATE_APP_STATE,
      value: { activeTab: tabSelected },
    });
  },
  toggleDrawerState: (drawerState) => toggleDrawerState(dispatch, drawerState),
  toggleContactForm: (dialogState) => toggleContactForm(dispatch, dialogState),
});

export default (withStyles(styles, { withTheme: true }))(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullWidthTabs));
