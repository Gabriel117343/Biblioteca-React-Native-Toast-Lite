"use strict";

import { StyleSheet, Platform } from 'react-native';
export const toastStyles = StyleSheet.create({
  containerToast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // compatibilidad con web y mobile
    // sin padding: los offsets seguros los aplica el Toaster
    zIndex: Platform.select({
      web: 2147483000,
      default: 9999
    })
  },
  container: {
    position: 'absolute',
    borderWidth: 1,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 2,
    // z-index local para que quede por encima de hermanos
    zIndex: Platform.select({
      web: 2147483001,
      default: 10
    }),
    overflow: 'hidden'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    fontSize: 16,
    color: '#D3D3D3'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 10
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
    bottom: 0
  },
  progressBar: {
    height: '100%'
  }
});
export const positionStyles = StyleSheet.create({
  top: {
    alignSelf: 'center'
  },
  bottom: {
    alignSelf: 'center'
  },
  center: {
    alignSelf: 'center'
  },
  // el vertical lo hace centerFix
  'top-left': {
    left: 10
  },
  'top-right': {
    right: 10
  },
  'bottom-left': {
    left: 10
  },
  'bottom-right': {
    right: 10
  }
});