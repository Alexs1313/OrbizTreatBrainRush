import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const CustomMenuButton = ({ onPress, btnText, width = 254, height = 80 }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        source={require('../../assets/orbizUi/homeMenuBigBtn.png')}
        style={[st.orbizLargeButton, { width, height }]}
        resizeMode="stretch"
      >
        <Text style={st.orbizTxt}>{btnText}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  orbizTxt: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  orbizLargeButton: {
    width: 254,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomMenuButton;
