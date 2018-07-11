import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader  from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  cardContainer: {
    width: '300px',
    height: '100%',
    margin: '0 auto',
    paddingBottom: '3%'
  },
  card: {
    width: '300px',
    height: '100%',
    margin: '0 auto'
  },
  media: {
    height: '45vh',
    backgroundImage: 'url("/images/contemplative-reptile.jpg")',
  },
  typographyDescription:{
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeHolderShimmer',
    animationTimingFunction: 'linear',
    background: 'linear-gradient(to right,  #f3f0ec 8%, #e6e1e1 18%, #f5f1f1 33%)',
    backgroundSize: '800px 104px',
    padding: '10%'
  },
  actionButton:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;',
    border: '1px solid rgba(63, 81, 181, 0.5);'
  },
  cardContent:{
    minHeight: '56px'
  },
  cardActions:{
    display: 'block'
  },
  subHeader:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize:'1.15rem'
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[500],
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  wrapperCell: {
    display: 'flex',
    marginBottom: '30px'
  },
  slideArrowLeft : {
    color: '#14B6D4',
    cursor: 'pointer',
    fontSize: '2rem',
    top: '50%',
    left: '1rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3%'
  },
  '@keyframes placeHolderShimmer': {
      '0%':{
          backgroundPosition: '-468px 0'
      },
      '100%':{
          backgroundPosition: '468px 0'
      }
  },
  avatar: {
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeHolderShimmer',
    animationTimingFunction: 'linear',
    background: 'linear-gradient(to right,  #f3f0ec 8%, #e6e1e1 18%, #f5f1f1 33%)',
    backgroundSize: '800px 104px',
    color: '#3f51b5',
    margin: '0 auto',
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;'
  },
  image: {
    width: 'auto',
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeHolderShimmer',
    animationTimingFunction: 'linear',
    background: 'linear-gradient(to right,  #f3f0ec 8%, #e6e1e1 18%, #f5f1f1 33%)',
    backgroundSize: '800px 104px',
    height: '96px',
    position: 'relative',
    margin: '0 auto'
  },
  'textLine': {
    width: 'auto',
    margin: '4% auto',
    animationDuration: '1.25s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: 'placeHolderShimmer',
    animationTimingFunction: 'linear',
    background: 'linear-gradient(to right,  #f3f0ec 8%, #e6e1e1 18%, #f5f1f1 33%)',
    backgroundSize: '800px 104px',
    padding: '4%'
  },
  [`${theme.breakpoints.down('md')}`]: {
    card: {
      width: 'auto',
      height: '100%',
      margin: '0 auto'
    },
  }
});

function PortalCard(props) {
  const { classes } = props;
  return (
    <div className={classes.cardContainer} >
      <Card className={classes.card}>
      <CardHeader
        classes={{
          title: classes.typographyDescription,
          subheader: classes.subHeader,
        }}
        avatar={<Avatar className={classes.avatar}></Avatar>}
      >
      </CardHeader>
        <CardContent className={classes.image}>
        </CardContent>
        <CardContent className={classes.textLine}>
        </CardContent>
        <CardContent className={classes.textLine}>
        </CardContent>
        <CardContent className={classes.textLine}>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button size="small" className={classes.actionButton} color="primary" href="{url}">
            Loading
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

PortalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortalCard);
