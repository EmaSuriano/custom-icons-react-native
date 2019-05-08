import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './assets/glyphMap.json';

const CustomIcon = createIconSet(glyphMap, 'FontAwesome', 'FontAwesome.ttf');

export default class Ema extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets/FontAwesome.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }
    return <CustomIcon name="rocket" size={30} color="#900" />;
  }
}
