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

function getRepos(classes) {
  console.log('coming inside: client');
  return (<Query
  query={gql`
    {
      search(query: "user:manojkumarmuralidharan topic:public-manoj", type: REPOSITORY, first: 30) {
        edges {
          node {
              ... on Repository{
                    name
                    url
                    description
                    repositoryTopics(first: 30 ){
                      edges{
                        node {
                          topic {
                            name
                          }
                        }
                      }

                    }

                  }
                }
              }
            }
          }`
    }
    >
      {({loading, error, data}) => {

        console.log('data',JSON.stringify(data));
        if(!data.search) return (<div><p>Test</p></div>);
        const tileData=data.search.edges;
        return (<div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
          {
          Array.prototype.map.call(tileData,((edge, index) => {
              const tile = edge.node;
              console.log(tile);
            return(<GridListTile key={index} rows={2.8} classes={{tile: classes.gridListTile }} >
            <MediaCard title={tile.name}  description={tile.description} url={tile.url}  />
            </GridListTile>);
          }))}
          </GridList>
        </div>);
      }}
    </Query>);
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 */
  const tileData = [

  ];

function SingleLineGridList(props) {
  const { classes } = props;
  return getRepos(classes);
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
