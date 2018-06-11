import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
  //constructor(props) {
    // super(props);
    // this.state = {date: new Date()};
  //   const uluru = {lat: -25.344, lng: 131.036};
  // // The map, centered at Uluru
  // const map = new google.maps.Map(
  //     document.getElementById('map'), {zoom: 4, center: uluru});
  // // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({position: uluru, map: map});
  //}
  // componentDidMount(){
  //  const script = document.createElement("script");
  //  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCFPdnYci1JU1RP4n2qq8qELMkRHEa6L1M";
  //  script.async = true;
  //  document.body.appendChild(script);
  // }
  // render() {
  //   console.log(window.google);
  //   return (<div>
  //
  //     </div>);
  // }
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

    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 6 }
        initialCenter = {{ lat: 37.3773929, lng: -121.9227276 }}
      >



        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Coyote Lake Harvey Bear Ranch County Park' }
          position = {{ lat: 37.093373, lng: -121.5453609 }}
          name = { 'Coyote Lake Harvey Bear Ranch County Park' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              Coyote Lake Harvey Bear Ranch County Park
            </Typography>
            <Typography
              component = 'p'
            >
              10840 Coyote Lake Rd, Gilroy, CA 95020 <br />
              (408) 842-7800
            </Typography>
          </Paper>
        </InfoWindow>

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Mare Island Preserve' }
          position = {{ lat: 37.3919722, lng: -122.2572242 }}
          name = { 'Mare Island Preserve' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              Mare Island Preserve
            </Typography>
            <Typography
              component = 'p'
            >
              167 O'Hara Ct, Vallejo, CA 94592 <br />
              (707) 249-9633
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    api: ('AIzaSyCFPdnYci1JU1RP4n2qq8qELMkRHEa6L1M')
})(GoogleMapsContainer)
