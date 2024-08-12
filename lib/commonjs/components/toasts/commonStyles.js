"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toastStyles = void 0;
var _reactNative = require("react-native");
const toastStyles = exports.toastStyles = _reactNative.StyleSheet.create({
  container: {
    top: 20,
    height: 70,
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2F4F4F",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 2,
    position: "absolute",
    zIndex: 100,
    gap: 10,
    overflow: "hidden"
  },
  fondoContainer: {
    opacity: 0.9,
    backgroundColor: "#FF5347"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  text: {
    fontSize: 14,
    color: "#D3D3D3" // Blanco un poco más oscuro
  }
});
//# sourceMappingURL=commonStyles.js.map