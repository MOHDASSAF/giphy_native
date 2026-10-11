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
  },
  topBarTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },

   logo: {
    width: 50,
    height: 44,
    resizeMode: 'cover',
  },
  emailText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },

  pictureWrapper: {
  alignSelf: 'center',
  marginTop: 30,
},
profilePic: {
  width: 120,
  height: 120,
  borderRadius: 60,
},
placeholderPic: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#eee',
  justifyContent: 'center',
  alignItems: 'center',
},
placeholderText: {
  color: '#999',
},

logoutBtn: {
  backgroundColor: '#D01090',
  marginHorizontal: 40,
  marginTop: 40,
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
},
logoutBtnText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

});

export default styles;