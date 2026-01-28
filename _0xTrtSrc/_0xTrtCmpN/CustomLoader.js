import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const CustomLoader = () => {
  const navigation = useNavigation();

  const welcomesLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    margin:0;
  }

  .loader-pulse {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #8f44fd;
    animation: load-pulse 0.85s infinite linear;
  }

  @keyframes load-pulse {
    0% { transform: scale(0.15); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
</style>
</head>
<body>
  <div class="loader-pulse"></div>
</body>
</html>
  `;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TreatOnboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/orbizImages/orbizMainBack.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('../../assets/orbizImages/loaderBuubles.png')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <View>
        {Platform.OS === 'android' ? (
          <Image
            source={require('../../assets/orbizImages/icon.png')}
            style={{
              marginBottom: 50,
              width: 240,
              height: 240,
              borderRadius: 70,
            }}
          />
        ) : (
          <Image
            source={require('../../assets/orbizImages/oboardimg1.png')}
            style={{ marginBottom: 50, width: 350, height: 280 }}
          />
        )}
        <Image
          source={require('../../assets/orbizImages/easyOrb.png')}
          style={{
            position: 'absolute',
            top: 150,
            right: -50,
            transform: [{ rotate: '-15deg' }],
          }}
        />
      </View>
      <View style={styles.loaderWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomesLoaderHTML }}
          style={{ width: 220, height: 90, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default CustomLoader;
