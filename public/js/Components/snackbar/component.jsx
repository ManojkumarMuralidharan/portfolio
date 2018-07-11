import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import * as types from '../../constants/actionTypes';

/**
*
* Icons-source
* https://www.iconfinder.com/icons/1181205/gmail_google_mail_icon#size=256
*/
const styles = theme => ({
  root: theme.mixins.gutters({

  })
});
class SnackbarComposite extends React.Component {
  constructor(props){
      super(props);
      this.snackbarClose = this.snackbarClose.bind(this);
  }
  snackbarClose(){
    this.props.closeSnackbar();
  }
  render() {
    const { classes,fieldState } = this.props;
    return (
             <Snackbar
             classes={classes}
              anchorOrigin={{vertical:'top',horizontal:'center'}}
              open={ this.props.fieldState.loadBar.open }
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              onClose={this.snackbarClose}
              autoHideDuration={this.props.fieldState.loadBar.autoHideDuration}
              message={<span id="message-id">{this.props.fieldState.loadBar.text}</span>}
            />
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeSnackbar: () => {
        dispatch({
           type: types.UPDATE_FIELD,
           value: {
             loadBar : {
               open : false,
               text: ''
             }
           }
        });
    }
 };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withStyles(styles)(SnackbarComposite)));
