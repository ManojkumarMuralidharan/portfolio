import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader, CardTitle } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const styles = {
  card: {
    maxWidth: '100%',
  },
  media: {
    height: '45vh',
    backgroundImage: 'url("/images/contemplative-reptile.jpg")',
  },
  typography: {
    fontFamily: '"roboto-thin", "Helvetica", "Arial", sans-serif;'
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[500],
  },
};

function MediaCard(props) {
  const { classes, titleFromProps } = props;
  return (
    <div>
      <Card className={classes.card}>
      <CardHeader
        title= {titleFromProps || 'URL Avatar'}
        subtitle='Subtitle'
        avatar={<Avatar style={{backgroundColor : red[500]}}>JS</Avatar>}
      >
      </CardHeader>
        <CardMedia
          className={classes.media}
          image="/images/contemplative-reptile.jpg"
          title="Contemplative Reptile"
          style={{backgroundImage:'url("/images/contemplative-reptile.jpg")', height: '22vh'}}
        />
        <CardContent>
          <Typography className={classes.typography} gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography className={classes.typography} component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
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
