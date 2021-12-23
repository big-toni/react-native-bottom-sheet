import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height,
    position: 'absolute',
    bottom: -height,
  },
});

export default styles;
