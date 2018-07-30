import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader, CardTitle } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { fetchGitRepositories } from '../../redux/modules/reducerHandlers';
import SingleLineGridList from '../GridListInline/component.jsx';

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
  backgroundProjects: {
      backgroundImage: "url('/images/coffee-projects-menu.webp')",
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '350px'
  },
  projectImage: {
    borderRadius: '50%',
    width: '240px',
    height: '240px',
    backgroundImage:'url(/images/projects.jpg)',
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
  [`${theme.breakpoints.down('md')}`]: {
    identity: {
      background: '#ffffff',
      fontFamily: "'Muli', Verdana, Tahoma",
    },
    backgroundProjects:{
      backgroundAttachment: 'unset'
    },
  }
});

class Projects extends React.Component  {

  constructor (props) {
		super(props);
	}

  componentDidMount() {
    if(!this.props.fieldState.github){
      this.props.getRepositories();
    }
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Grid container className={classes.grid} alignContent='center' alignItems='center' id="home" name="home">

              <Grid item xs={12} className={classes.backgroundProjects}>
              </Grid>
              <Grid item xs={12} lg={12} className={classes.identity} >
                <Paper  className={classes.selfPaper} elevation={2}>
                  <Paper className={classes.projectImage}></Paper>
                </Paper>
              </Grid>

              <Grid item xs={12} lg={12} >
                <SingleLineGridList style={{paddingLeft: '20%', paddingRight: '20%',overflowY: 'hidden'}} nodes={this.props.fieldState.github} logoUrl='/images/logo.svg' sectionTitle='Projects'/>
                <Divider className={classes.divider} id="blog" name="blog" />
              </Grid>

      </Grid>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRepositories : () => {
      return fetchGitRepositories(dispatch);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(Projects)));
