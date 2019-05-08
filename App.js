import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ema from './Ema';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js start working on your app!</Text>
        <Ema />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
