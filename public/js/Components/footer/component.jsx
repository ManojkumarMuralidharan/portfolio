import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

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
  },
  icons:{
    width: "45",
    height: "45"
  },
  footerText: {
    paddingTop: '2%',
    paddingBottom: '3%',
    textAlign: 'center',
    backgroundColor: '#f17d74',
    color: 'white',
    boxShadow: 'none'
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
            <IconButton variant="fab" href="https://www.linkedin.com/in/manojkumarmuralidharan" aria-label="add" className={classes.iconButton}>
             <img src="/images/linkedin.png" width="25" height="25" alt="facebook" />
            </IconButton>
            <IconButton variant="fab" href="https://github.com/manojkumarmuralidharan" aria-label="add" className={classes.iconButton}>
             <img src="/images/github.png" width="25" height="25" alt="github" />
            </IconButton>
            <IconButton variant="fab" href="https://www.instagram.com/mjwolfpack/" aria-label="add" className={classes.iconButton}>
             <img src="/images/instagram.png" width="25" height="25" alt="instagram" />
            </IconButton>
            <IconButton variant="fab" href="https://www.paypal.me/man0j/" aria-label="add" className={classes.iconButton}>
             <img src="/images/paypal.png" width="25" height="25" alt="paypal" />
            </IconButton>
            <IconButton variant="fab" href="https://a.co/hbOsTcM" aria-label="add" className={classes.iconButton}>
             <img src="/images/amazon.png" width="25" height="25" alt="amazon" />
            </IconButton>
            <IconButton variant="fab" href="mailto:manoj.wolfpack@gmail.com" aria-label="add" className={classes.iconButton}>
             <img src="/images/gmail.png" width="25" height="25" alt="gmail" />
            </IconButton>
            <IconButton variant="fab" href="https://manojio.slack.com/" aria-label="add" className={classes.iconButton}>
             <img src="/images/slack.png" width="25" height="25" alt="slack" />
            </IconButton>
            <IconButton variant="fab" href="https://twitter.com/search?q=manojwolfpack" aria-label="add" className={classes.iconButton}>
             <img src="/images/twitter.png" width="25" height="25" alt="twitter" />
            </IconButton>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.footerText} >
                This Page loaded in { this.props.fieldState.loadBar && this.props.fieldState.loadBar.loadTime } seconds
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.footerText} >
                © 2018. Manoj. All Rights Reserved.
              </Paper>
            </Grid>
            <Snackbar
              anchorOrigin={{vertical:'top',horizontal:'center'}}
              open={ this.props.fieldState.loadBar && this.props.fieldState.loadBar.open }
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">This Page loaded in { this.props.fieldState.loadBar && this.props.fieldState.loadBar.loadTime } seconds</span>}
            />
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
