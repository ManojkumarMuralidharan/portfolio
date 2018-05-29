import React from 'react';
import { render } from 'react-dom';
import CSSGrid from '../Components/layout/masterLayout.js';

export default class App extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {

  }

  render() {
    return <CSSGrid />
  }
}
