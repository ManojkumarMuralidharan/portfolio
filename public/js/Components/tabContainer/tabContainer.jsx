import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CustomDrawer from '../swipeableDrawer/component.jsx';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ResponsiveDialog from '../responsiveDialog/component.jsx';
import { connect } from 'react-redux';
import { toggleContactForm, toggleDrawerState } from '../../redux/modules/reducerHandlers';
import _ from 'lodash';
import * as types from '../../constants/actionTypes';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    background: 'rgb(48, 42, 42);',
  },
  selected: {
    color: 'white'
  },
  hover: {
    cursor: 'default'
  },
  menuDrawer: {
    display: 'none',
    color: 'white'
  },
  icon: {
    color: 'white'
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
      color: 'white'
    },
  },
  '@keyframes navfadein': {
    from: {
      opacity: '1',
    },
    to: {
      boxShadow: '0 10px 6px -6px #777',
      opacity: '0.7',
    }
  },
  indicator: {
    backgroundColor: 'white',
  },
  flexContainer: {
    placeContent: 'flex-end'
  },
  appBar: {
    backgroundColor: 'rgb(48, 42, 42);',
    boxShadow: 'none',
  },
  avatar: {
    backgroundColor: '#302b2a',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: '1.75rem',
    zIndex: '1200',
    position: 'absolute',
    left: '32px',
    top: '8px',
  },
  [`${theme.breakpoints.down('md')}`]: {
    avatar: {
      width: '60px',
      height: '60px',
      zIndex: '12000',
      top: '16px'
    },
    menuDrawer: {
      display: 'block',
      color: 'white'
    },
    tabMenu: {
      display: 'none'
    },
    flexContainer: {
      placeContent: 'flex-end'
    },
    icon: {
      width: '3em',
      height: '3em'
    },
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 'home',
  };

  toggleDrawer = (open) => () => {
    this.props.toggleDrawerState(open);
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.switchTabs(value);
  };

  handleChangeIndex = index => {
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
        <Grid item lg={2} >
          {!this.props.fieldState.drawer.state && <Avatar className={classes.avatar}>MJ</Avatar>}
        </Grid>
        <Grid item lg={10}>
          <AppBar color="default" style={{ background: "inherit", boxShadow: "none" }}>
            <Tabs
              selected={classes.selected}
              value={this.state.value}
              onChange={this.handleChange}
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                flexContainer: classes.flexContainer,
                indicator: classes.indicator
              }}
            >
              <Tab value="mobile_home" label="home" icon={<MenuIcon className={classes.icon} />} className={classes.menuDrawer} onClick={this.toggleDrawer(true)} />
              <Tab component={Link} to="/" label="home" value="home" variant='outlined' className={classes.tabMenu} />
              <Tab component={Link} to="/blog" value="blog" label="Blog" className={classes.tabMenu} />
              <Tab component={Link} to="/projects" value="projects" label="Projects" className={classes.tabMenu} />
              <Tab component={Link} to="/hobbies" value="hobbies" label="Hobbies" className={classes.tabMenu} />
              <Tab value="contact" label="Contact" onClick={this.handleDialogClickOpen} className={classes.tabMenu} />
            </Tabs>
          </AppBar>
          <CustomDrawer/>
        </Grid>
        <ResponsiveDialog fullScreen={fullScreen} open={false} />
      </Grid>

    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchTabs: (tabSelected) => {
      dispatch({
        type: types.UPDATE_APP_STATE,
        value: { "activeTab": tabSelected }
      });
    },
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
)(FullWidthTabs));
