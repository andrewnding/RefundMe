import { connect } from 'react-redux'
import NavigationBar from 'components/navigation-bar/NavigationBar'
import { personLogout } from 'actions/person'
import { RootState } from 'types'

interface StateProps {
  email: string,
  firstName: string,
  lastName: string,
  loggedIn: boolean,
}

interface DispatchProps {
  personLogout: () => any,
}

interface OwnProps {}

export interface INavigationBar extends StateProps, DispatchProps, OwnProps {}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => {
  return {
    email: state.person.email,
    firstName: state.person.firstName,
    lastName: state.person.lastName,
    loggedIn: state.person.loggedIn,
  }
}

const mapDispatchToProps: (dispatch: any) => DispatchProps = (dispatch: any) => {
  return {
    personLogout: () => dispatch(personLogout()),
  }
}

const NavigationBarContainer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)

export default NavigationBarContainer