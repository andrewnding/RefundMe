import { connect } from 'react-redux'
import LoginBox from 'components/plaid/LoginBox'
import { RootState } from 'types'

interface StateProps {
  id: string,
}

interface DispatchProps {}

interface OwnProps {}

export interface ILoginBox extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {
    id: state.person.id,
  }
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {}
}

const LoginBoxContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox)

export default LoginBoxContainer