import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  logo: {
    width: 50,
    height: 44,
    resizeMode: 'cover',
  },
  topBarTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,

  },
  logContainer: {
    
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 370, 
  },
  emailBox: {
    flexDirection: 'column',
    paddingVertical: 10,
    
  },
  passBox: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 17,
    color: '#333',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 17,
  },
  submitBox: {
    justifyContent: 'center',
    paddingTop: 15,
  },
  submitBtn: {
    backgroundColor: '#848384',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;