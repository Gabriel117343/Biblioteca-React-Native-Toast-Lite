import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  containerToast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 10,

    position: 'absolute',
    height: 70,

    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F4F4F',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,

    zIndex: 1000,
    gap: 10,
    overflow: 'hidden',
  },
  fondoContainer: {
    backgroundColor: '#FF5347',
    opacity: 0.9,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 14,
    color: '#D3D3D3', // Blanco un poco más oscuro
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
