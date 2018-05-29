import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableTemporaryDrawer from '../menuDrawer/component.jsx';
import MenuIcon from '@material-ui/icons/Menu';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    background: 'transparent',
    zIndex: '30',
    marginTop: '14px',
    minWidth: '130px',
  },
  selected:{
    color: 'white'
  },
  hover: {
    cursor: 'default'
  },
  menuDrawer: {
    display : 'none',
    color: 'white'
  },
  icon: {
    color: 'white'
  },
  tabMenu:{
    color: 'white',
    '&:hover': {
      animation: 'navfadein 1.0s 1 0s forwards'
    },
  },
  '@keyframes navfadein': {
    from: {

    },
    to: {
    border: '0px solid rgba(255,255,255,0.3)',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: '4%',
    background: 'rgba(255,255,255,0.5)',
    }
  },
  flexContainer: {
    placeContent: 'flex-end'
  },
  appBar: {
    backgroundColor: 'transparent',
  },
  [`${theme.breakpoints.down('md')}`]: {
    menuDrawer: {
      display: 'block',
      color: 'red'
    },
    tabMenu: {
      display: 'none'
    },
    flexContainer: {
      placeContent: 'flex-end'
    }
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    drawerState : false,
  };

  toggleDrawer =  (open) => () => {
    this.setState({
      drawerState : open,
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              flexContainer: classes.flexContainer
            }}
            >
            <Tab label="test" icon={ <MenuIcon className={classes.icon}/>} className={classes.menuDrawer} onClick={this.toggleDrawer(true)}/>
            <Tab label="Home" variant='outlined' className={classes.tabMenu} onClick={this.toggleDrawer(true)}/>
            <Tab label="Blog" className={classes.tabMenu} />
            <Tab label="Hobbies" className={classes.tabMenu} />
            <Tab label="Contact" className={classes.tabMenu} />
          </Tabs>
        </AppBar>
        <SwipeableTemporaryDrawer drawerState={this.state.drawerState} toggleDrawer={this.toggleDrawer}/>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
