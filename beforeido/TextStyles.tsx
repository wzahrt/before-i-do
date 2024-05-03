import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  subheading: {
    fontSize: 20,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  loginHeader: {
    fontSize: 40,
    color: 'black',
    marginBottom: 50
  }, 
  loginInstr: {
    fontSize: 20,
    color: 'black',
    // marginBottom: 300
    padding: 30
  },  
  loginButtonText: {
    fontSize: 20,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#FD3C56',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 7
  }, 
  signUpButtonText: {
    fontSize: 14,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    borderRadius: 5,
  },
  signUpButton: {
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderRadius: 20
  },
});
