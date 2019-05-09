import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
// import { createIconSet } from 'react-native-vector-icons';
// import glyphMapFA from './assets-FA/FontAwesome.json';
import * as Icons from './src/Icon/index.native';
import { View } from 'react-native';
// const FontAwesomeIcon = createIconSet(glyphMapFA, 'FontAwesome', 'FontAwesome.ttf');

export default class Ema extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets-FA/FontAwesome.ttf'),
      'omio-font-icon': require('./assets/font/omio-font-icon.ttf'),
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
              <Icon size={20} color="navy" />
            </View>
          );
        })}
      </View>
    );
    return <Icons.Chevron size={80} color="blue" />;
    // return <FontAwesomeIcon name="plane" size={30} color="#900" />;
  }
}
