import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';
import CardHeader  from '@material-ui/core/Card';
import CardTitle from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  const { classes, title, description, url } = props;
  return (
    <div>
      <Card className={classes.card}>
      <CardHeader
        title= {title || 'URL Avatar'}
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
            {title}
          </Typography>
          <Typography className={classes.typography} component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href="{url}">
            Share
          </Button>
          <Button size="small" color="primary" href="{url}">
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
