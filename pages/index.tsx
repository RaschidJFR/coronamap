import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, Image } from 'react-native';
import { A } from '@expo/html-elements';
import FormContainer from '../components/FormContainer';
import EmailInput from '../components/TextInput/Email';
import PasswordInput from '../components/TextInput/Password';
import SubmitButton from '../components/SubmitButton';
import { MIN_MARGIN_Y, MARGIN_Y, MAX_MARGIN_Y } from '../styles';
import { BLUE_COLOR, INACTIVE_TEXT_COLOR } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    height: 160,
    width: 160,
  },
  formContainer: {
    width: '100%',
    marginTop: MIN_MARGIN_Y,
  },
  forgotPasswordButton: {
    marginTop: MAX_MARGIN_Y,
    color: INACTIVE_TEXT_COLOR.toString(),
  },
  signupButton: {
    // alignSelf: 'flex-end',
    marginTop: 3 * MARGIN_Y,
    color: BLUE_COLOR.toString(),
  },
});

export default function App(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <FormContainer
        showErrorsOnly
        progress={{ message: '', status: null }}
        style={styles.formContainer}>
        <EmailInput value={email} onChangeText={text => setEmail(text)} />
        <PasswordInput value={password} onChangeText={text => setPassword(text)} />
      </FormContainer>
      <SubmitButton label="Sign in" disabled={false} onPress={() => {}} />
      <A href="/reset-password" style={styles.forgotPasswordButton}>
        Forgot my password
      </A>
      <A href="/signup" style={styles.signupButton}>
        Sign Up
      </A>
    </View>
  );
}

App.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
  };
};
