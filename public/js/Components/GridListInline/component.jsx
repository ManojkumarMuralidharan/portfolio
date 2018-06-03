import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
//import tileData from '../tileData/component.jsx';
import MediaCard from '../cards/component.jsx';
const styles = theme => ({
  override: {
    GridListTile: {
          backgroundColor: 'red',
    }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    padding: '2px',
    width: '90%',
    height: '100%',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  [`${theme.breakpoints.down('md')}`]: {
    gridListTile: {

    },
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 */
  const tileData = [
    {
      img: '/images/1.jpeg',
      title: 'Project_1',
      author: 'author',
    },
    {
      img: '/images/2.jpeg',
      title: 'Project_2',
      author: 'author',
    },

    {
      img: '/images/3.jpeg',
      title: 'Project_3',
      author: 'author',
    },

    {
      img: '/images/4.jpeg',
      title: 'Project_4',
      author: 'author',
    },

    {
      img: '/images/5.jpeg',
      title: 'Project_5',
      author: 'author',
    },

    {
      img: '/images/6.jpeg',
      title: 'Project_6',
      author: 'author',
    }
  ];

function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} rows={2.8} classes={{tile: classes.gridListTile }} >
          <MediaCard titleFromProps={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);

//
// <GridListTile key={tile.img}>
//   <img src={tile.img} alt={tile.title} />
//   <GridListTileBar
//     title={tile.title}
//     classes={{
//       root: classes.titleBar,
//       title: classes.title,
//     }}
//     actionIcon={
//       <IconButton>
//
//       </IconButton>
//     }
//   />
// </GridListTile>
