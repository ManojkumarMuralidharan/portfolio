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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import ContactMail from '@material-ui/icons/ContactMail';
import Work from '@material-ui/icons/Work';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Toys from '@material-ui/icons/Toys';
import ResponsiveDialog from '../responsiveDialog/component.jsx';
import { connect } from 'react-redux';
import { toggleContactForm } from '../../redux/modules/reducerHandlers';
import _ from 'lodash';

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
  override: {
    MuiTabs: {
      scroller: {
          backgroundColor: '#ffffff',
      },
    }
  },
  button:{
     margin: theme.spacing.unit,
     color: '#3f51b5',
     border: '1px solid rgba(63, 81, 181, 0.5)',
     backgroundColor: 'transparent',
     '&:hover':{
       backgroundColor: 'rgba(63, 81, 181, 0.08)'
     }
  },
  buttonNo:{
    margin: theme.spacing.unit,
    color: '#3f51b5',
    border: '1px solid rgba(63, 81, 181, 0.5)',
    backgroundColor: 'transparent',
    '&:hover':{
      backgroundColor: 'rgba(63, 81, 181, 0.08)'
    }
  },
  dialogOpeningText:{
    lineHeight: '1.8em',
    padding: '10px 0px 10px 0px'
  },
  dialogTitle:{
    textAlign: 'center',
  },
  contactPaperDiv: {
    backgroundImage: "url('/images/contact.png')",
    backgroundAttachment: 'inherit',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    maxWidth: '93%',
    borderRadius: '2em',
    height: '174px',
    boxShadow: 'none',
    marginLeft: '3%'
  },
  root: {
    background: 'transparent',
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
  scroller: {
    color: 'white',
    background: 'white'
  },
  tabMenu:{
    color: 'white',
    fontFamily: "'Roboto', sans-serif;",
    '&:hover': {
      animation: 'navfadein 1.0s 1 0s forwards',
      background: 'transparent',
    },
    '&:selected': {
      color: 'white'
    },
  },
  '@keyframes navfadein': {
    from: {
    border: '2px solid rgba(255,255,255,0.8)',
    opacity: '1',
    },
    to: {
    border: '2px solid rgba(255,255,255,1)',
    boxShadow: '0 10px 6px -6px #777',
    borderRadius: '4%',
    opacity: '0.7',
    }
  },
  indicator: {
    backgroundColor: 'white',
  },
  flexContainer: {
    placeContent: 'flex-end'
  },
  dialogButton:{
    justifyContent: 'center'
  },
  appBar: {
    marginTop: theme.spacing.unit * 4,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
  },
  appBarGrid: {
    position: 'absolute',
    width: '100%'
  },
  siteTitle: {
    color: 'white',
    display: 'block',
    position: 'relative',
    marginLeft: '20%',
  },
  avatar:{
    backgroundColor : '#2b2525d9',
    marginLeft: '20%',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize:'1.75rem'
  },
  [`${theme.breakpoints.down('md')}`]: {
    avatar:{
      marginLeft: '100%',
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
    siteTitle: {
      position: 'relative',
      marginLeft: '85%',
    },
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    drawerState : false,
    dialogOpen: false
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

  handleDialogClickOpen = () => {
   this.props.toggleContactForm(true);
   this.setState({ dialogOpen: true });
   this.toggleDrawer(false);
  };

  handleDialogClose = () => {
   this.props.toggleContactForm(false);
   this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, theme } = this.props;
    const fullScreen = _.get(this.props,['appState','width'],false) && this.props.appState.width < 1000 ;
    return (
      <Grid container className={classes.appBar}>
        <Grid item lg={2} >
          <Avatar className={classes.avatar}>MJ</Avatar>
        </Grid>
        <Grid item lg={10}>
            <AppBar color="default" position="absolute" style={{background:"transparent", boxShadow:"none"}}>
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
                <Tab label="Menu"  icon={ <MenuIcon className={classes.icon}/>} className={classes.menuDrawer} onClick={this.toggleDrawer(true)}/>
                <Tab label="Home"  variant='outlined' className={classes.tabMenu} onClick={this.toggleDrawer(true)}/>
                <Tab label="Blog" href="#blog" className={classes.tabMenu} />
                <Tab label="Projects" href="#projects" className={classes.tabMenu} />
                <Tab label="Hobbies" href="#hobby" className={classes.tabMenu} />
                <Tab label="Contact"  onClick={this.handleDialogClickOpen} className={classes.tabMenu} />
              </Tabs>
            </AppBar>
            <SwipeableTemporaryDrawer drawerState={this.state.drawerState} toggleDrawer={this.toggleDrawer}>
            <div className={classes.list}>
              <List>
              <div>
                  <ListItem button  component="a" href="#home">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" onClick={this.toggleDrawer(false)}/>
                  </ListItem>
                  <ListItem button  component="a" href="#blog" onClick={this.toggleDrawer(false)}>
                    <ListItemIcon>
                      <ArtTrack />
                    </ListItemIcon>
                    <ListItemText primary="Blog"/>
                  </ListItem>
                  <ListItem button  component="a" href="#projects" onClick={this.toggleDrawer(false)} >
                    <ListItemIcon>
                      <Work/>
                    </ListItemIcon>
                    <ListItemText primary="Projects"/>
                  </ListItem>
                  <ListItem button  component="a" href="#hobby" onClick={this.toggleDrawer(false)} >
                    <ListItemIcon>
                      <Toys/>
                    </ListItemIcon>
                    <ListItemText primary="Hobbies"  />
                  </ListItem>
                  <ListItem button  component="a" onClick={this.handleDialogClickOpen}>
                    <ListItemIcon>
                      <ContactMail />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                  </ListItem>
                </div>
              </List>
            </div>
            </SwipeableTemporaryDrawer>
        </Grid>
        <ResponsiveDialog fullScreen={fullScreen} open={false}/>
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
    toggleContactForm : (dialogState) => {
      return toggleContactForm(dispatch,dialogState);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles, { withTheme: true })(FullWidthTabs)));
