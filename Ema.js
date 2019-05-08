import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
import { createIconSet } from 'react-native-vector-icons';
import glyphMapFA from './assets/FontAwesome.json';
import { ArrowDown, ArrowLeft } from './src/Icon/index.native';
// import omioFontIconFA from './omio-assets/omio-font-icon.json';

const FontAwesomeIcon = createIconSet(glyphMapFA, 'FontAwesome', 'FontAwesome.ttf');
// const CustomIcon = createIconSet(omioFontIconFA, 'omio-font-icon', 'omio-font-icon.ttf');
export default class Ema extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets/FontAwesome.ttf'),
      'omio-font-icon': require('./omio-assets/omio-font-icon.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <React.Fragment>
        <ArrowDown size={80} color="blue" />
        <ArrowLeft size={80} color="blue" />
      </React.Fragment>
    );
    return <FontAwesomeIcon name="plane" size={30} color="#900" />;
  }
}
