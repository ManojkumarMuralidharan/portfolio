import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from '../tileData/component.jsx';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false
  };
  //
  // toggleDrawer = (side, open) => () => {
  //   this.setState({
  //     [side]: open,
  //   });
  // };

  render() {
    const { classes, children } = this.props;
    const { drawerState, toggleDrawer } = this.props;

    const sideList = (
      <div className={classes.list}>
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          disableBackdropTransition
          disableRestoreFocus
          open={drawerState}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
          >
            {children}
          </div>

        </SwipeableDrawer>

      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
