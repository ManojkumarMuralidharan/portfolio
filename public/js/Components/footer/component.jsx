import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import SnackbarComposite from '../snackbar/component.jsx';

/**
*
* Icons-source
* https://www.iconfinder.com/icons/1181205/gmail_google_mail_icon#size=256
*/
const styles = theme => ({
  root: theme.mixins.gutters({

  }),
  grid: {
    padding : '0px',
    textAlign: 'center',
  },
  iconsContainer:{
    paddingTop: '2%',
    paddingBottom: '2%',
    background: '#ffffff'
  },
  iconButton:{
    '&:hover':{
      transform: 'scale(1.2)'
    },
     margin: theme.spacing(1),
  },
  icons:{
    width: '50%',
    height: 'auto'
  },
  footerGrow:{
    flexGrow: 1,
  },
  footerText: {
    paddingTop: '2%',
    paddingBottom: '3%',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.87)',
    color: 'rgba(255,255,255,0.9)',
    boxShadow: 'none',
    fontFamily: "'Exo', sans-serif",
    height: '100%'
  },
  [`${theme.breakpoints.down('md')}`]: {
    footerText: {
        fontSize: '1.5rem',
    },
    iconButton:{
      paddingLeft: '3%',
      paddingRight: '3%'
    },
    icons:{
      width: '30px',
      height: 'auto',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  [`${theme.breakpoints.only('md')}`]: {
    icons:{
      width: '30px'
    },
  }
});
class Footer extends React.Component {
  constructor(props){
      super(props);
  }

  render() {
    const { classes } = this.props;
    return (
        <footer>
          <Grid container className={classes.grid} alignContent='center' alignItems='center'>
            <Grid item xs={12} lg={12} className={classes.iconsContainer}>
            <Fab  href="https://www.linkedin.com/in/manojkumarmuralidharan" aria-label="add" className={classes.iconButton}>
             <img src="/images/linkedin.png" className={classes.icons} alt="facebook" />
            </Fab>
            <Fab  href="https://github.com/manojkumarmuralidharan" aria-label="add" className={classes.iconButton}>
             <img src="/images/github.png" className={classes.icons} alt="github" />
            </Fab>
            <Fab  href="https://www.instagram.com/mjwolfpack/" aria-label="add" className={classes.iconButton}>
             <img src="/images/instagram.png" className={classes.icons} alt="instagram" />
            </Fab>
            <Fab  href="https://www.paypal.me/man0j/" aria-label="add" className={classes.iconButton}>
             <img src="/images/paypal.png" className={classes.icons} alt="paypal" />
            </Fab>
            <Fab  href="https://a.co/hbOsTcM" aria-label="add" className={classes.iconButton}>
             <img src="/images/amazon.png" className={classes.icons} alt="amazon" />
            </Fab>
            <Fab  href="mailto:manoj.wolfpack@gmail.com" aria-label="add" className={classes.iconButton}>
             <img src="/images/gmail.png" className={classes.icons} alt="gmail" />
            </Fab>
            <Fab  href="https://manojio.slack.com/" aria-label="add" className={classes.iconButton}>
             <img src="/images/slack.png" className={classes.icons} alt="slack" />
            </Fab>
            <Fab  href="https://twitter.com/search?q=manojwolfpack" aria-label="add" className={classes.iconButton}>
             <img src="/images/twitter.png" className={classes.icons} alt="twitter" />
            </Fab>
            </Grid>
            <Grid container className={classes.iconsContainer}>
              <Grid item xs={6} sm={6} className={classes.footerGrow}>
                <Paper className={classes.footerText} >
                  This Page loaded in { this.props.fieldState.loadBar && this.props.fieldState.loadBar.loadTime } seconds
                </Paper>
              </Grid>
              <Grid item xs={6} sm={6} className={classes.footerGrow}>
                <Paper className={classes.footerText} >
                  © 2018. Manoj. All Rights Reserved.
                </Paper>
              </Grid>
            </Grid>
            <SnackbarComposite />
          </Grid>
          </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(Footer)));
