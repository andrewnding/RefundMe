import { connect } from 'react-redux'
import LoginBox from 'components/login/LoginBox'
import { personLogin } from 'actions/person'
import { RootState, ILoginActionParams } from 'types'

interface StateProps {
  loggedIn: boolean,
}

interface DispatchProps {
  personLogin: (args: ILoginActionParams) => any,
}

interface OwnProps {}

export interface ILoginBox extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {
    loggedIn: state.person.loggedIn,
  }
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {
    personLogin: (args: ILoginActionParams) => dispatch(personLogin(args)),
  }
}

const LoginBoxContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox)

export default LoginBoxContainer