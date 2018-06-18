import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
//import tileData from '../tileData/component.jsx';
import MediaCard from '../cards/component.jsx';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from 'lodash';

const styles = theme => ({
  override: {
    GridListTile: {
      backgroundColor: 'red',
      height: 'auto',
      width: '100%'
    },
    li: {
      width: '100%'
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
    height: 'auto'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '100%'
  },
  gridListTile: {
    padding: '2px'
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

  ];

class MediumArticles extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			data: [],
      url: 'https://medium.com/@thebrianemory/latest?format=json'
		}
	}
  componentDidMount() {
		fetch('/medium')
      .then(r => r.json())
			.then(data => this.setState({ data : _.values(data.payload.references.Post)}))
			.catch(error => console.log(error))
	}
  render(){
    const { classes } = this.props;
    const { data } = this.state;
    // if(!_.isEmpty(data)){
    //   console.log('data'+JSON.stringify(data));
    // }else{
    //   console.log('no data yet');
    // }
    //return getPosts(classes);
    if(_.isEmpty(data)) return (<div><p>Test</p></div>);

    return (<div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
      {
      Array.prototype.map.call(data,((edge, index) => {
          const tile = edge;
          console.log('tile:',tile);
        return(<GridListTile key={index} style={{height:'auto', maxWidth: '100%', overflowY: 'hidden'}} classes={{tile: classes.gridListTile }} >
        <MediaCard title={tile.slug}  description={tile.content.subtitle} url={tile.url}  />
        </GridListTile>);
      }))}
      </GridList>
    </div>);
  }
}

MediumArticles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediumArticles);
