import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Home from '../home/component.jsx';
import Articles from '../articles/component.jsx';
import Projects from '../projects/component.jsx';
import Hobbies from '../hobbies/component.jsx';
import { Route } from "react-router-dom";

const styles = theme => ({

});

class MainContent extends React.Component  {

  constructor (props) {
		super(props);
	}

  componentDidMount() {

  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Articles} />
          <Route path="/projects" component={Projects} />
          <Route path="/hobbies" component={Hobbies} />
      </div>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(MainContent)));
