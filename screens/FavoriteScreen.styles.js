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
    marginBottom: 15,
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
  countText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    paddingVertical: 10,
  },
  removeAllBtn: {
    backgroundColor: '#fdeef6',
    borderWidth: 1,
    borderColor: '#D01090',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  removeAllText: {
    color: '#D01090',
    fontWeight: 'bold',
  },
});

export default styles;