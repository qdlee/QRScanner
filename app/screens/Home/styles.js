import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    flex: 1,
    marginBottom: 5,
    paddingTop: 30,
    width: '100%',
    height: 300,
    textAlign: 'center',
    color: '#333333',
    backgroundColor: '#f5f5f5'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  frame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'green'
  },
  title: {
    marginBottom: 30,
    color: '#fff',
    fontSize: 20
  },
  cancel: {
    marginTop: 30,
    fontSize: 20,
    color: '#fff'
  },
  operation: {},
  btnRow: {
    flexDirection: 'row',
    width: '100%'
  },
  btnContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 1,
    marginRight: -1
  },
  btn: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
