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
     color: '#fff',
     backgroundColor: '#2196f3',
     '&:hover':{
       backgroundColor: 'green'
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
  [`${theme.breakpoints.down('md')}`]: {
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
   this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
   this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid container className={classes.appBar}>
        <Grid item lg={2} >
            <Typography className={classes.siteTitle}>
              SITE TITLE
            </Typography>
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
                <Tab label="test"  icon={ <MenuIcon className={classes.icon}/>} className={classes.menuDrawer} onClick={this.toggleDrawer(true)}/>
                <Tab label="Home"  variant='outlined' className={classes.tabMenu} onClick={this.toggleDrawer(true)}/>
                <Tab label="Blog"  className={classes.tabMenu} />
                <Tab label="Hobbies"  className={classes.tabMenu} />
                <Tab label="Contact"  onClick={this.handleDialogClickOpen} className={classes.tabMenu} />
              </Tabs>
            </AppBar>
            <SwipeableTemporaryDrawer drawerState={this.state.drawerState} toggleDrawer={this.toggleDrawer}/>
        </Grid>
        <Grid item lg={12} xs={12}>
            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                How to get in touch 👋🏼
              </DialogTitle>
              <DialogContent>
                <DialogContentText className={classes.dialogOpeningText}>
                 Like my work / Want to get a cuppa coffee / Want me to speak at your event ?
                 Fill out the following info , and I’ll do my best to get back to you.
                 <br/>
                 Thank you!
                </DialogContentText>
                <Grid container>
                <Grid item lg={12} xs={12}>
                <Paper className={classes.contactPaperDiv}>
                </Paper>
                </Grid>

                <Grid item lg={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  type="text"
                  required
                />
                </Grid>
                <Grid item lg={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="lastName"
                  label="Last Name"
                  type="text"
                  required
                />
                </Grid>
                <Grid item lg={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  required
                />
                </Grid>
                <Grid item lg={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phone"
                  label="Phone Number"
                  type="phone"

                />
                </Grid>
                <Grid item lg={12} xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="subject"
                  label="Subject"
                  type="text"
                  fullWidth
                  required
                />
                </Grid>
                <Grid item lg={12} xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="message"
                  label="Message"
                  type="text"
                  multiline
                  fullWidth
                  rowsMax="5"
                  rows="5"
                  required
                />
                </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className={classes.dialogButton}>
                <Button onClick={this.handleDialogClose} variant="raised" color="secondary" className={classes.button}>
                  Naah !
                </Button>
                <Button onClick={this.handleDialogClose} variant="raised" color="secondary"  className={classes.button}>
                  Yea !
                </Button>
              </DialogActions>
            </Dialog>
        </Grid>
      </Grid>

    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
