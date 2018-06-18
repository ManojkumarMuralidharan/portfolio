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

const styles = {
  card: {
    maxWidth: '100%',
    height: '99%'
  },
  media: {
    height: '45vh',
    backgroundImage: 'url("/images/contemplative-reptile.jpg")',
  },
  typographyDescription:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;'
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
};

function MediaCard(props) {
  const { classes, title, description, url } = props;
  return (
    <div className={classes.card}>
      <Card className={classes.card}>
      <CardHeader
        title= {title || 'URL Avatar'}
        subtitle='Subtitle'
        classes={{
          title: classes.typographyDescription,
          subheader: classes.subHeader,
        }}
        avatar={<Avatar style={{backgroundColor : red[500], fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif', fontSize:'0.75rem'}}>JS</Avatar>}
      >
      </CardHeader>
        <CardMedia
          className={classes.media}
          image="/images/contemplative-reptile.jpg"
          title="Contemplative Reptile"
          style={{backgroundImage:'url("/images/contemplative-reptile.jpg")', height: '22vh'}}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.typographyDescription} component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" className={classes.actionButton} color="primary" href="{url}">
            Share
          </Button>
          <Button size="small" className={classes.actionButton} color="primary" href="{url}">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
