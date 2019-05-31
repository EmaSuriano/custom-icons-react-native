import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Font } from 'expo';
import * as Icons from './src/Icon';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 40,
  },
  icon: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  iconName: {
    marginTop: 10,
    fontFamily: 'roboto-mono',
    color: 'grey',
  },
});

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-mono': require('./assets/font/RobotoMono-Regular.ttf'),
      'custom-font-icon': require('./assets/font/custom-font-icon.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.entries(Icons).map(([icon, Icon]) => (
            <View style={styles.icon} key={icon}>
              <Icon size={80} color="navy" />
              <Text style={styles.iconName}>{`<${icon} />`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
