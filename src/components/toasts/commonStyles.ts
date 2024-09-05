import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  containerToast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // alignItems: 'center',
  },
  container: {
    position: 'absolute',
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    zIndex: 1000,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: '#D3D3D3',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 15,
  },
  progressContainer: {
    height: 3,
    width: '100%',
    paddingHorizontal: 0,
    margin: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    opacity: 0.6,
    // overflow: 'hidden',
    bottom: 0,
  },
  progressBar: {
    height: '100%',
  },
});
export const positionStyles = StyleSheet.create({
  top: {
    top: 10,
    alignSelf: 'center',
  },
  bottom: {
    bottom: 10,
    alignSelf: 'center',
  },
  center: {
    top: '50%',
    alignSelf: 'center',
  },
  'top-left': {
    top: 10,
    left: 10,
  },
  'top-right': {
    top: 10,
    right: 10,
  },
  'bottom-left': {
    bottom: 10,
    left: 10,
  },
  'bottom-right': {
    bottom: 10,
    right: 10,
  },
});
