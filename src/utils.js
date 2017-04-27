import { connect } from 'react-redux';

export function createConnectedComponent({
  Component,
  mapStateToProps,
  mapDispatchToProps,
}) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
}
