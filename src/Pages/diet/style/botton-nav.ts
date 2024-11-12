import { StyleSheet } from "react-native";

export 
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    height: '100%',
    marginTop: '10%',
  },
  buttonContainer: {
    alignItems: 'center', 
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});
