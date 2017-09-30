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
    paddingTop: 10,
    width: '100%',
    height: 60,
    textAlign: 'center',
    color: '#333333',
    backgroundColor: '#fff'
  },
  history: {
    flex: 1,
    width: '100%'
  },
  sectionTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'left'
  },
  historyList: {
    backgroundColor: '#fff'
  },
  historyItem: {
    // paddingLeft: 15,
    // paddingRight: 15,
    position: 'relative',
    height: 40,
    borderTopColor: '#333',
    borderTopWidth: 1
  },
  historyItemInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexWrap: 'nowrap',
    flexDirection: 'row'
  },
  deleteShow: {
    left: -100
  },
  historyText: {
    paddingLeft: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  historyOp: {
    width: 100,
    backgroundColor: 'red'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  frame: {
    width: 240,
    height: 240,
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
