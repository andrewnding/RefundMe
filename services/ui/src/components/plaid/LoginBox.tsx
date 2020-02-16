import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import PlaidLink, { PlaidLinkProps } from 'react-plaid-link'

const LoginBox = () => {
  // send token to client server
  const handleOnSuccess = (
    token: Parameters<PlaidLinkProps['onSuccess']>[0],
    metadata: Parameters<PlaidLinkProps['onSuccess']>[1]) :
    ReturnType<PlaidLinkProps['onSuccess']> => {
      axios.post('/api/plaid/get_access_token', {
          public_token: token,
      }).then((response: AxiosResponse) => {
          console.log(response);
      });
  }

  const handleOnExit = () => {
      // handle the case when your user exits Link
  }

  return (
    <PlaidLink
      clientName="Your app name"
      env="sandbox"
      product={["auth", "transactions"]}
      publicKey="04bdd52d45ea4c918bfd11712fbcc1"
      onExit={handleOnExit}
      onSuccess={handleOnSuccess}
    >
      Open Link and connect your bank!
    </PlaidLink>
  )
}

export default LoginBox