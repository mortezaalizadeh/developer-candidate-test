import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as personApiActions from '../../api/person/Actions';
import PeopleSelectorContainerComponent from './PeopleSelectorContainerComponent';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  personApiActions: bindActionCreators(personApiActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PeopleSelectorContainerComponent),
);
