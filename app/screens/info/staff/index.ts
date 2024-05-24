import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: -10,
  },
  body: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginLeft: 31,
    marginRight: 15,
    marginTop: 16,
  },
  item: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  leftContent: {
    flexDirection: 'row',
  },
  main: {
    flex: 1,
  },
  merchantInfor: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 25,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#323232',
    paddingTop: 9,
    paddingLeft: 24,
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  line: {
    height: 1,
    backgroundColor: '#E7EFFF',
    marginTop: 9,
  },
  image: {
    width: width / 2 - 48,
    height: 82,
    borderRadius: 8,
  },

  label: {
    fontSize: 14,
    color: '#84888D',
    alignSelf: 'center',
  },
});
