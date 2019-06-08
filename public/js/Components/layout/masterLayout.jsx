import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TabContainer from '../tabContainer/tabContainer.jsx';
import Footer from '../footer/component.jsx';
//import BackgroundImage from '../../../images/background.jpg';
import MainContent from '../mainContent/component.jsx';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing(3)}px`,
  },
  backgroundPaper:{
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: `${theme.spacing(0)}px`,
    boxShadow: "none",
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  [`${theme.breakpoints.down('md')}`]: {
    backgroundGrid: {
      marginBottom: '0'
    }
  }
});

function CSSGrid(props) {
  const { classes } = props;

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <TabContainer />
        </Grid>
        <Grid item xs={12}>
          <MainContent/>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Footer/>
        </Grid>
      </Grid>
    </div>
  );
}

CSSGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);
