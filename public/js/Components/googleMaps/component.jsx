import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {fetchLocations} from '../../redux/modules/reducerHandlers';



const styles = {
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};


class GoogleMapsContainer extends React.Component {

  componentDidMount() {
    this.props.getLocations();
  }
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '50%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative'
    }
    const { locations } = this.props.fieldState || [];
    const markers = locations ? locations.map(function(location, index){
      return(

        <Marker
          title = { location.name }
          onClick = { this.onMarkerClick }
          position = {{ lat: location.latitude, lng: location.longitude }}
          name = { location.name }
          address = { location.address }
          phone = { location.phone }
          key={index}
        />
      )
    }.bind(this)) : null;

    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        zoom = { 6 }
        initialCenter = {{ lat: 37.3773929, lng: -121.9227276 }}
      >
        {markers}
        { this.state.activeMarker ?
        (<InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              {this.state.activeMarker.name}
            </Typography>
            <Typography
              component = 'p'
            >
              {this.state.activeMarker.address} <br />
              {this.state.activeMarker.phone}
            </Typography>
          </Paper>
        </InfoWindow>) : null
      }
      </Map>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLocations : () => {
      return fetchLocations(dispatch);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleApiWrapper({
    api: process.env.googleMapsApiKey
})(GoogleMapsContainer))
