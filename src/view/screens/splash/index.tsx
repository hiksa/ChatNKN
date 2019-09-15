import { connect } from 'react-redux';
import Component from './Component';
import { initiateApp } from '../../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    init: () => dispatch(initiateApp())
    // init: () => console.log('init')
  }
};

const splashContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default splashContainer;
