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
import { connect } from 'react-redux';
import {fetchGitRepositories} from '../../redux/modules/reducerHandlers';
import _ from 'lodash';

const styles = theme => ({
  override: {
    GridListTile: {
      backgroundColor: 'red',
      height: 'auto'
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
  },
  gridListTile: {
    padding: '2px',
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

class SingleLineGridList extends React.Component {

  componentDidMount() {
    this.props.getRepositories();
  }
  constructor(props) {
    super(props);
  }
  render(){
    const { classes } = this.props;
    const edges = _.get(this.props,['fieldState','github','data','search','edges']);

    return edges ? (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
        {
          Array.prototype.map.call(edges,((edge, index) => {
            const tile = edge.node;
            return(<GridListTile key={index} style={{height:'auto', overflowY: 'hidden'}} classes={{tile: classes.gridListTile }} >
            <MediaCard title={tile.name}  description={tile.description} url={tile.url}  />
            </GridListTile>);
          }))
        }
        </GridList>
      </div>
    ) : (<div><p>Test</p></div>);
  }
}

SingleLineGridList.propTypes = {
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
)((withStyles(styles)(SingleLineGridList)));
