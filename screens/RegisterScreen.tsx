import React, {useState} from 'react';
import {InputAccessoryView, Keyboard, Pressable, View} from 'react-native';
import {TextInput} from 'react-native';
import {KeyboardAvoidingView, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {theme} from '../theme';
import {Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const RegisterScreen = ({navigation}: RouterProps): JSX.Element => {
  const [currentFocus, setCurrentFocus] = useState('');
  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}>
        <View style={styles.container}>
          <Text style={styles.loginText}>Create Account</Text>

          <View>
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'username' && styles.inputShadow,
              ]}>
              <Feather name="user" color={'grey'} size={24} />
              <TextInput
                onFocus={() => setCurrentFocus('username')}
                placeholder="Your name"
                keyboardType="default"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'email' && styles.inputShadow,
              ]}>
              <Ionicon name="mail-outline" color={'grey'} size={24} />
              <TextInput
                onFocus={() => setCurrentFocus('email')}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'password' && styles.inputShadow,
              ]}>
              <SimpleLineIcon name="lock" color={'grey'} size={24} />
              <TextInput
                secureTextEntry={true}
                onFocus={() => setCurrentFocus('password')}
                placeholder="Password"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                currentFocus === 'cpassword' && styles.inputShadow,
              ]}>
              <SimpleLineIcon name="lock" color={'grey'} size={24} />
              <TextInput
                secureTextEntry={true}
                onFocus={() => setCurrentFocus('cpassword')}
                placeholder="Confirm password"
                placeholderTextColor={'grey'}
                inputAccessoryViewID="dismissKeyboard"
                style={styles.text}
              />
            </View>
          </View>
          <View style={{marginTop: 24, alignItems: 'flex-end'}}>
            <Button
              title="Sign up"
              onPress={() => navigation.navigate('HomeScreen')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.signupLine}>
        <Text style={{color: theme.colors.text, marginRight: 4}}>
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: theme.colors.primary}}>Login</Text>
        </Pressable>
      </View>
      <InputAccessoryView nativeID="dismissKeyboard">
        <View style={styles.dismissWrapper}>
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <MaterialIcon
              name="keyboard-hide"
              size={28}
              style={{color: theme.colors.primary}}
            />
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  keyboardAvoid: {margin: 16, flex: 1, alignItems: 'center'},
  loginText: {
    color: theme.colors.text,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  inputWrapper: {
    marginTop: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },

  inputShadow: {
    shadowColor: '#1F51FF',
    shadowOffset: {width: 2, height: 6},
    shadowOpacity: 0.75,
    shadowRadius: 8,
  },
  text: {
    width: '100%',
    fontSize: 16,
    color: theme.colors.text,
  },
  signupLine: {
    paddingBottom: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dismissWrapper: {
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    backgroundColor: theme.colors.card,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
  },
});
