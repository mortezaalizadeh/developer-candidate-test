import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as personApiActions from '../../api/person/Actions';
import * as localStateActions from '../../framework/localState/Actions';
import PersonResultContainerComponent from './PersonResultContainerComponent';

const mapStateToProps = state => {
  return {
    unorderedPersons: state.personApi.get('persons').toJS(),
    sortOrder: state.localState.get('sortOrder'),
    sortColumn: state.localState.get('sortColumn'),
    page: state.localState.get('pageNumber'),
    rowsPerPage: state.localState.get('rowsPerPage'),
  };
};

const mapDispatchToProps = dispatch => ({
  personApiActions: bindActionCreators(personApiActions, dispatch),
  localStateActions: bindActionCreators(localStateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonResultContainerComponent);
