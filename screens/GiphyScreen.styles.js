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
  boxin: {
    flexDirection: 'column',
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    shadowColor: 'rgb(245, 203, 205)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  boxinHead: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 18,
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Courier New',
    fontSize: 22,
    paddingBottom: 15,
    color: '#1A1A1A',
    fontWeight: '700',
    borderBottomWidth: 3,
    borderBottomColor: '#f017c8',
  },
  boxinImg: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  boxinLower: {
    flexDirection: 'row',
    minHeight: 100,
    alignItems: 'center',
  },
  descText: {
    fontSize: 18,
    fontFamily: 'arial',
    fontWeight: '300',
  },
  boxinDesc: {
    flex: 2,
    padding: 10,
  },
  boxinFav: {
    flex: 1,
    paddingRight: 21,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;