import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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
    paddingBottom: '2%',
    textAlign: 'center',
    backgroundColor: '#f17d74',
    color: 'white',
  }
});

function Footer(props) {
  const { classes } = props;
  return (
        <Grid container className={classes.grid} alignContent='center' alignItems='center'>
          <Grid item xs={12} lg={12} className={classes.iconsContainer}>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/linkedin.png" width="25" height="25" alt="facebook" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/github.png" width="25" height="25" alt="github" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/instagram.png" width="25" height="25" alt="instagram" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/paypal.png" width="25" height="25" alt="paypal" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/amazon.png" width="25" height="25" alt="amazon" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/gmail.png" width="25" height="25" alt="gmail" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/slack.png" width="25" height="25" alt="slack" />
          </IconButton>
          <IconButton variant="fab" aria-label="add" className={classes.iconButton}>
           <img src="/images/twitter.png" width="25" height="25" alt="twitter" />
          </IconButton>
          </Grid>
          <Grid item xs={12} >
            <Paper className={classes.footerText} >
              © 2018. Manoj. All Rights Reserved.
            </Paper>
          </Grid>
        </Grid>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
