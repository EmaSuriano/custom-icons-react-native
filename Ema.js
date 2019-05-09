import React from 'react';
import { Font } from 'expo';
import { View } from 'react-native';
import * as Icons from './src/Icon/index.native';

export default class Ema extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets-FA/FontAwesome.ttf'),
      'custom-font-icon': require('./assets/font/custom-font-icon.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return (
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.keys(Icons).map(icon => {
          const Icon = Icons[icon];
          return (
            <View style={{ borderColor: 'grey', borderWidth: 0.5, padding: 5 }} key={icon}>
              <Icon size={40} color="navy" />
            </View>
          );
        })}
      </View>
    );
  }
}
