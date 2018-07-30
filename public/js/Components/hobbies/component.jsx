import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader, CardTitle } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import GoogleApiWrapper from '../googleMaps/component.jsx';


const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  grid: {
    paddingBottom : theme.spacing.unit * 6,
    textAlign: 'center',
  },
  selfPaper:{
    height: theme.spacing.unit * 20,
    position: 'relative',
    background: '#ffffff',
    boxShadow: 'none'
  },
  identity: {
    background: '#ffffff',
    fontFamily: "\"palanquin\", Verdana, Tahoma",
  },
  selfText:{
    fontFamily: "'roboto-thin', sans-serif;",
    fontSize: "1.355rem",
    lineHeight: "1.56429em",
    paddingBottom: theme.spacing.unit * 4,
  },
  divider:{
    marginLeft: '25%',
    marginRight: '25%',
    marginBottom: '4%',
    marginTop: '1%',
  },
  titleText:{
    paddingBottom: '5%',
    fontSize: '1.5rem',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;',
    boxShadow: 'none'
  },
  selfCamping: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/self-camping.jpg)',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '0',
    position: 'absolute',
    top: '-1%',
    left: '50%',
    transform: 'translate(-50%, -55%)'
  },
  backgroundHobby: {
    backgroundImage: "url('/images/Hobby.jpg')",
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '350px'
  },
  mapsContainer: {
    height: theme.spacing.unit * 51,
    position: 'relative'
  },
  [`${theme.breakpoints.down('md')}`]: {
    backgroundHobby:{
      backgroundAttachment: 'unset'
    },
    identity: {
      background: '#ffffff',
      fontFamily: "'Muli', Verdana, Tahoma",
    },
    selfText:{
      fontFamily: "'Muli', sans-serif;",
      fontSize: "2.5rem",
      opacity: '0.8'
    }
  }
});

class Hobbies extends React.Component  {

  constructor (props) {
		super(props);
	}

  componentDidMount() {
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid container className={classes.grid} alignContent='center' alignItems='center' id="home" name="home">
        <Grid item xs={12} className={classes.backgroundHobby}>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.identity} >
          <Paper  className={classes.selfPaper} elevation={2}>
            <Paper className={classes.selfCamping}></Paper>
          </Paper>
          <Typography className={classes.titleText}>
            Camping
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.mapsContainer}>
          <GoogleApiWrapper/>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Divider className={classes.divider}/>
        </Grid>
      </Grid>
    );
  }
}

Hobbies.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(Hobbies)));
