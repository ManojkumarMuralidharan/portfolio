import React from 'react';
import { render } from 'react-dom';
import Grid from './FullWidthGrid';

export default class App extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
   
  }

  render() {
    return <Grid />
  }
}
