import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
//import tileData from '../tileData/component.jsx';
import MediaCard from '../cards/component.jsx';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from 'react-redux';
import {fetchGitRepositories} from '../../redux/modules/reducerHandlers';
import _ from 'lodash';
import PortalCard from '../portalCard/component.jsx';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  override: {
    GridListTile: {
      backgroundColor: 'red',
      height: 'auto'
    }
  },
  actionButton:{
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif;',
    border: '1px solid rgba(63, 81, 181, 0.5);'
  },
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'visible',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: '10%',
    paddingRight: '10%',
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
  slideArrowRight : {
    color: '#14B6D4',
    cursor: 'pointer',
    fontSize: '2rem',
    top: '50%',
  	right: '1rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3%'
  },
  mediaCard :{
    display : 'inline'
  },
  dot : {
    height: '0.56rem',
    width: '0.56rem',
    maxWidth: '1.56rem',
    backgroundColor: '#4285f4',
    borderRadius: '50%',
    margin: '1% 1%',
    cursor: 'pointer'
  },
  selected : {
    height: '0.76rem',
    width: '0.76rem',
    maxWidth: '1.56rem',
    backgroundColor: '#4285f4',
    borderRadius: '50%',
    margin: '1% 1%',
    cursor: 'pointer',
    paddingLeft: '0px'
  },
  controlDots:{
    position: 'relative',
    bottom: '0',
    margin: '10px 0',
    textAlign: 'center',
    listStyle: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '0px'
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
  [`${theme.breakpoints.down('md')}`]: {
    gridListTile: {
      width: 'auto',
      margin: '0 auto'
    },
  },
  [`${theme.breakpoints.down('sm')}`]: {
    gridListTile: {
      width: '300px',
      margin: '0 auto'
    },
  }
});

class SingleLineGridList extends React.Component {

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillUnmount() {
   window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let cols = 3;
    switch (true){

    case window.innerWidth < 880:
        // I'm guessing this is an error
        cols = 1;
        break;
    case window.innerWidth < 1290:
        cols = 2;
        break;
    default:
        cols = 3;
    }
    this.setState({ width: window.innerWidth, height: window.innerHeight, cols: cols});
  }

  constructor (props) {
		super(props);

		this.state = {
			currentStartIndex: 0,
      size: 3,
      width: 0,
      height: 0
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.resetStartIndex = this.resetStartIndex.bind(this);

	}
  resetStartIndex(event){
    const index = event.target.value;
    //0 1 2 3 4
    if((index+this.state.size) <= this.props.nodes.length){
      this.setState({
        currentStartIndex: index
      });
    }

  }
	previousSlide () {
    const { nodes } = this.props;
		const { currentStartIndex } = this.state;
		const shouldRetainIndex = currentStartIndex === 0;
		const index =  shouldRetainIndex ? currentStartIndex : currentStartIndex - 1;

		this.setState({
			currentStartIndex: index
		});
	}

	nextSlide () {
    const { nodes } = this.props;
    const { currentStartIndex, cols } = this.state;
    const size = (nodes && (nodes.length  <  cols))  ? nodes.length : cols;
    const lastIndex = nodes ? nodes.length - 1  : 0;
		const shouldRetainIndex = (currentStartIndex + size - 1) === lastIndex;
		const index =  shouldRetainIndex ?  currentStartIndex : currentStartIndex + 1 ;

		this.setState({
			currentStartIndex: index
		});
	}

  render(){
    const { classes, nodes } = this.props;
    const { currentStartIndex, size, cols } = this.state;
    const edges = (nodes ? nodes.slice(currentStartIndex, (currentStartIndex+cols) ) : null);
    return edges ? (
      <div>
      <div className={classes.root}>
        <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9001;"  className={classes.slideArrowLeft}/>
        <GridList className={classes.gridList} spacing={(cols*10)}  cols={ ((nodes.length < cols) ? nodes.length : cols) }>
        {
          Array.prototype.map.call(edges,((tile, index) => {
            return(
              <GridListTile key={index} style={{height:'auto'}} classes={{tile: classes.gridListTile }} >
                <MediaCard title={tile.name}  description={tile.description} url={tile.url}  />
              </GridListTile>
            );
          }))
        }
        </GridList>
        <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9002;" className={classes.slideArrowRight}/>
      </div>
      <div>
        <ul className={classes.controlDots}>
        {
          Array.prototype.map.call(nodes,((tile, index) => {
              const selected = ( index >= currentStartIndex) && (index < (currentStartIndex + cols));
              const dotClass = selected ? 'selected' : 'dot';
              return (<li className={ classes[dotClass]} key={`dot-${index}`} value={index} onClick={this.resetStartIndex}></li>);
          }))
        }
        </ul>
      </div>
      </div>
    ) : (<PortalCard/>);
  }
}


const Arrow = ({ direction, clickFunction, glyph, className }) => (
	<div
		className={ className }
		onClick={ clickFunction }>
		{ glyph }
	</div>
);

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(SingleLineGridList)));
