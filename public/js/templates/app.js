import React from 'react';
import CSSGrid from '../Components/layout/masterLayout.jsx';

export default class App extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {

  }

  render() {
    return (
      <CSSGrid />
    );
  }
}
