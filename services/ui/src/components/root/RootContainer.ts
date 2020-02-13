import { connect } from 'react-redux'
import Root from 'components/root/Root'
import { getLoggedInPerson } from 'actions/person'
import { RootState } from 'types'

interface StateProps {}

interface DispatchProps {
  getLoggedInPerson: () => any,
}

interface OwnProps {}

export interface IRoot extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {
  }
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {
    getLoggedInPerson: () => dispatch(getLoggedInPerson()),
  }
}

const RootContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Root)

export default RootContainer