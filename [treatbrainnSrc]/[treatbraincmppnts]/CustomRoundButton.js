// custom round button component

import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CustomRoundButton = ({
  onPress,
  onPressIn,
  onPressOut,
  btnImage,
  width = 60,
  height = 60,
  isDisabled = false,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <ImageBackground
        source={require('../../assets/orbizUi/homeMenuButton.png')}
        style={[st.orbizButton, { width, height }]}
        resizeMode="stretch"
      >
        <Image source={btnImage} style={[{ left: iconStyle }]} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  orbizButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomRoundButton;
