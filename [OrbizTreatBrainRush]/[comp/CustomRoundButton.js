import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CustomRoundButton = ({
  onPress,
  btnImage,
  width = 60,
  height = 60,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <ImageBackground
        source={require('../../assets/orbizUi/homeMenuButton.png')}
        style={[st.orbizButton, { width, height }]}
        resizeMode="stretch"
      >
        <Image source={btnImage} style={{ bottom: 1 }} />
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
