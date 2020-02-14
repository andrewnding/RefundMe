import { connect } from 'react-redux'
import SignUpBox from 'components/sign-up/SignUpBox'
import { RootState, IPersonCreateParams } from 'types'
import { personCreate } from 'actions/person'

interface StateProps {}

interface DispatchProps {
  personCreate: (args: IPersonCreateParams) => any,
}

interface OwnProps {}

export interface ISignUpBox extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {}
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {
    personCreate: (args: IPersonCreateParams) => dispatch(personCreate(args)),
  }
}

const SignUpBoxContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(SignUpBox)

export default SignUpBoxContainer