import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader, CardTitle } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  grid: {
    padding : '0px',
    textAlign: 'center',
  },
  quotes: {
    height: theme.spacing.unit * 60,
    background: '#f6f9ff',
  },
  bio: {
    height: theme.spacing.unit * 20,
    background: '#f6f9ff',
  },
  selfPaper:{
    height: theme.spacing.unit * 40,
    position: 'relative',
    background: '#f6f9ff',
  },
  identity: {
    background: '#f6f9ff',
  },
  selfImage: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/self.jpg)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  }
});

function MainContent(props) {
  const { classes, theme } = props;
  return (
    <Grid container className={classes.grid} alignContent='center' alignItems='center'>
      <Grid item xs={12} lg={4} className={classes.identity} >
        <Paper  className={classes.selfPaper} elevation={2}>
          <Paper className={classes.selfImage}></Paper>
        </Paper>
        <Paper  className={classes.bio} elevation={2}>
          <Typography component="p">
            I love problem solving and I enjoy working on improvising user interaction. I wish to develop novel solution using the might of today's technology to make life easier and enjoyable. I work on web and mobile applications and strive to build apps that could make life simple and enjoyable for everyone.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Paper className={classes.quotes} elevation={2}>
          <Typography component="p">
            Some one said something.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContent);
