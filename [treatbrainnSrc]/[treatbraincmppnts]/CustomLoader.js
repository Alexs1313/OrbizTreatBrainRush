// custom loader component

import { WebView } from 'react-native-webview';
import React, { useEffect, useRef } from 'react';

import { View, StyleSheet, ImageBackground, Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const CustomLoader = () => {
  const navigation = useNavigation();
  const bubblesFloat = useRef(new Animated.Value(0)).current;

  const orbFlyUp = useRef(new Animated.Value(0)).current;

  const orbOpacity = useRef(new Animated.Value(1)).current;

  const webviewloaderhtml = `
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
    const spinOrbsTimer = setTimeout(() => {
      navigation.replace('TreatOnboarding');
    }, 6000);

    return () => clearTimeout(spinOrbsTimer);
  }, [navigation]);

  useEffect(() => {
    const bubblesAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bubblesFloat, {
          toValue: -18,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(bubblesFloat, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]),
    );

    bubblesAnimation.start();

    return () => bubblesAnimation.stop();
  }, [bubblesFloat]);

  useEffect(() => {
    const orbAnimation = Animated.parallel([
      Animated.timing(orbFlyUp, {
        toValue: -460,
        duration: 7200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(5200),
        Animated.timing(orbOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]);

    orbAnimation.start();

    return () => orbAnimation.stop();
  }, [orbFlyUp, orbOpacity]);

  return (
    <ImageBackground
      source={require('../../assets/orbizImages/loaderBack.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Animated.Image
        source={require('../../assets/orbizImages/loaderBuubles.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: [{ translateY: bubblesFloat }],
        }}
      />

      <Animated.Image
        source={require('../../assets/orbizImages/easyOrb.png')}
        style={{
          position: 'absolute',
          bottom: 150,
          right: 80,
          opacity: orbOpacity,
          transform: [{ translateY: orbFlyUp }, { rotate: '-15deg' }],
        }}
      />
      <View style={styles.orbsAnimWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{ html: webviewloaderhtml }}
          style={{ width: 220, height: 90, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  orbsAnimWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default CustomLoader;
