import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { toggleContactForm, writeUserFeeback } from '../../redux/modules/reducerHandlers';
import * as types from '../../constants/actionTypes';
import { isEmpty } from 'lodash';

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
    backgroundImage: "url('/images/contact.jpg')",
    backgroundAttachment: 'inherit',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
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
    button:{
      width: '30%',
      height: '85px',
      fontSize: '2rem'
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

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.toggleContactForm(false);
    this.setState({ open: false });
  };

  handleDialogClose = () => {
    this.props.toggleContactForm(false);
    this.setState({ open: false });
  };

  validateForm = () =>{
    const {firstName, lastName, email, phone, subject, message} = this.props.fieldState;
    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(phone) || isEmpty(message)){
      console.log('Empty form');
      return false;
    }
  }
  submitFeedBack = () => {
    const {firstName, lastName, email, phone, subject, message} = this.props.fieldState;
    if(!this.validateForm()){
      this.props.invalidForm();
      return;
    }
    this.props.writeUserFeeback(firstName, lastName, email, phone, subject, message);
    this.props.toggleContactForm(false);
  }

  render() {
    const { fullScreen, classes } = this.props;
    return (
      <Grid item lg={12} xs={12}>
          <Dialog
            fullScreen={fullScreen}
            open={this.props.fieldState.contactForm.display}
            onClose={this.handleDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
              How to get in touch 👋
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
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                value={this.props.fieldState.firstName||''}
                required
                onChange={this.props.onChange}
              />
              </Grid>
              <Grid item lg={6} xs={6}>
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                value={this.props.fieldState.lastName||''}
                required
                onChange={this.props.onChange}
              />
              </Grid>
              <Grid item lg={6} xs={6}>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={this.props.fieldState.email||''}
                required
                onChange={this.props.onChange}
              />
              </Grid>
              <Grid item lg={6} xs={6}>
              <TextField
                margin="dense"
                id="phone"
                label="Phone Number"
                type="phone"
                value={this.props.fieldState.phone||''}
                onChange={this.props.onChange}

              />
              </Grid>
              <Grid item lg={12} xs={12}>
              <TextField
                margin="dense"
                id="subject"
                label="Subject"
                type="text"
                value={this.props.fieldState.subject||''}
                fullWidth
                required
                onChange={this.props.onChange}
              />
              </Grid>
              <Grid item lg={12} xs={12}>
              <TextField
                margin="dense"
                id="message"
                label="Message"
                type="text"
                value={this.props.fieldState.message||''}
                multiline
                fullWidth
                rowsMax="5"
                rows="5"
                required
                onChange={this.props.onChange}
              />
              </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogButton}>
              <Button onClick={this.handleDialogClose} variant="raised" color="secondary" className={classes.button}>
                Cancel !
              </Button>
              <Button onClick={this.submitFeedBack} variant="raised" color="secondary"  className={classes.button}>
                Send !
              </Button>
            </DialogActions>
          </Dialog>
      </Grid>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
     onChange : (e) => {
       const dispatchObject = {};
       dispatchObject[`${e.target.id}`] = e.target.value;
       dispatch({
                type: types.UPDATE_FIELD,
                value: dispatchObject
       });
     },
     toggleContactForm : (dialogOpen) => {
       return toggleContactForm(dispatch,dialogOpen);
     },
     writeUserFeeback: (firstName, lastName, email, phone, subject, message) => {
       dispatch({
                type: types.WRITE_USER_FEEDBACK,
                value: {firstName, lastName, email, phone, subject, message}
       });
     },
     invalidForm: () => {
       dispatch({
         type: types.UPDATE_FIELD,
         value: {
           loadBar : {
             open : true,
             text: 'Please check your values in the Form'
           }
         }
       });
     }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles, { withTheme: true })(ResponsiveDialog)));
