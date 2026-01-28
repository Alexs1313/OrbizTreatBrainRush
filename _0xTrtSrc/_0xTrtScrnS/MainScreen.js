import {
  useFocusEffect as _uFE_kQpLxVnTaKs,
  useNavigation as _uNV_mZtRmQpLxVa,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback as _uCB_kLmNpQrStVw,
  useEffect as _uEF_pQrStVwXyZ,
  useState as _uST_sTrUvWxYzA,
} from 'react';
import {
  Image as _iMG_qpLxVnTaKsRm,
  ImageBackground as _iBG_kQpLxVnTaKs,
  Linking as _lNK_mZtRmQpLxVa,
  Modal as _mDL_qpLxVnTaKsRm,
  Platform as _pLF_kQpLxVnTaKs,
  ScrollView as _sCV_mZtRmQpLxVa,
  Share as _sHR_kQpLxVnTaKs,
  StyleSheet as _sSY_mZtRmQpLxVa,
  Text as _tXT_kQpLxVnTaKs,
  TouchableOpacity as _tOP_mZtRmQpLxVa,
  View as _vW_kQpLxVnTaKs,
} from 'react-native';
import CustomRoundButton from '../_0xTrtCmpN/CustomRoundButton';
import CustomMenuButton from '../_0xTrtCmpN/CustomMenuButton';
import { BlurView as _bRV_kQpLxVnTaKs } from '@react-native-community/blur';
import { useOrbizTreatStore as _uTS_mZtRmQpLxVa } from '../_0xTrtstrG/orbizTreatContext';
import Toast from 'react-native-toast-message';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';

const _bG_kQpLxVnTaKs = require('../../assets/orbizImages/orbizMainBack.png');

const MainScreen = () => {
  const [_shRw_kQpLxVnTaKs, _sShRw_mZtRmQpLxVa] = _uST_sTrUvWxYzA(false);

  const _nv_kQpLxVnTaKs = _uNV_mZtRmQpLxVa();

  const {
    isEnabledMusic: _mOn_mZtRmQpLxVa,
    setIsEnabledMusic: _sMon_kQpLxVnTaKs,
    isEnabledNotifications: _nOn_kQpLxVnTaKs,
    setIsEnabledNotifications: _sNon_mZtRmQpLxVa,
  } = _uTS_mZtRmQpLxVa();

  const [_mx_kQpLxVnTaKs, _sMx_mZtRmQpLxVa] = _uST_sTrUvWxYzA(0);
  const [_sd_mZtRmQpLxVa, _sSd_kQpLxVnTaKs] = _uST_sTrUvWxYzA(null);

  const _cy_kQpLxVnTaKs = [
    'ambient-piano-and-strings-10711.mp3',
    'ambient-piano-and-strings-10711.mp3',
  ];

  _uFE_kQpLxVnTaKs(
    _uCB_kLmNpQrStVw(() => {
      _pLF_kQpLxVnTaKs.OS === 'android' && Orientation.lockToPortrait();
      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  _uFE_kQpLxVnTaKs(
    _uCB_kLmNpQrStVw(() => {
      _ldMs_kQpLxVnTaKs();
      _ldNt_mZtRmQpLxVa();
    }, []),
  );

  _uEF_pQrStVwXyZ(() => {
    _plMs_mZtRmQpLxVa(_mx_kQpLxVnTaKs);

    return () => {
      if (_sd_mZtRmQpLxVa) {
        _sd_mZtRmQpLxVa.stop(() => {
          _sd_mZtRmQpLxVa.release();
          console.log('sound release!');
        });
      }
    };
  }, [_mx_kQpLxVnTaKs]);

  const _plMs_mZtRmQpLxVa = _ix_kQpLxVnTaKs => {
    if (_sd_mZtRmQpLxVa) {
      _sd_mZtRmQpLxVa.stop(() => {
        _sd_mZtRmQpLxVa.release();
      });
    }

    const _pth_mZtRmQpLxVa = _cy_kQpLxVnTaKs[_ix_kQpLxVnTaKs];

    const _nw_kQpLxVnTaKs = new Sound(
      _pth_mZtRmQpLxVa,
      Sound.MAIN_BUNDLE,
      _er_kQpLxVnTaKs => {
        if (_er_kQpLxVnTaKs) {
          console.log('Error =>', _er_kQpLxVnTaKs);
          return;
        }

        _nw_kQpLxVnTaKs.play(_ok_mZtRmQpLxVa => {
          if (_ok_mZtRmQpLxVa) {
            _sMx_mZtRmQpLxVa(
              _pv_kQpLxVnTaKs => (_pv_kQpLxVnTaKs + 1) % _cy_kQpLxVnTaKs.length,
            );
          } else {
            console.log('Error =>');
          }
        });

        _sSd_kQpLxVnTaKs(_nw_kQpLxVnTaKs);
      },
    );
  };

  _uEF_pQrStVwXyZ(() => {
    const _svVol_kQpLxVnTaKs = async () => {
      try {
        const _raw_mZtRmQpLxVa = await AsyncStorage.getItem('toggleOrbizSound');
        const _on_kQpLxVnTaKs = JSON.parse(_raw_mZtRmQpLxVa);

        _sMon_kQpLxVnTaKs(_on_kQpLxVnTaKs);
        if (_sd_mZtRmQpLxVa) {
          _sd_mZtRmQpLxVa.setVolume(_on_kQpLxVnTaKs ? 1 : 0);
        }
      } catch (_e_mZtRmQpLxVa) {
        console.error('Error =>', _e_mZtRmQpLxVa);
      }
    };

    _svVol_kQpLxVnTaKs();
  }, [_sd_mZtRmQpLxVa]);

  _uEF_pQrStVwXyZ(() => {
    if (_sd_mZtRmQpLxVa) {
      _sd_mZtRmQpLxVa.setVolume(_mOn_mZtRmQpLxVa ? 1 : 0);
    }
  }, [_mOn_mZtRmQpLxVa]);

  const _ldMs_kQpLxVnTaKs = async () => {
    try {
      const _raw_kQpLxVnTaKs = await AsyncStorage.getItem('toggleOrbizSound');
      const _on_mZtRmQpLxVa = JSON.parse(_raw_kQpLxVnTaKs);
      _sMon_kQpLxVnTaKs(_on_mZtRmQpLxVa);

      console.log('success!');
    } catch (_e_kQpLxVnTaKs) {
      console.error('Error loading settings =>', _e_kQpLxVnTaKs);
    }
  };

  const _ldNt_mZtRmQpLxVa = async () => {
    try {
      const _raw_kQpLxVnTaKs = await AsyncStorage.getItem(
        'toggleOrbizNotifications',
      );
      if (_raw_kQpLxVnTaKs !== null) {
        const _on_mZtRmQpLxVa = JSON.parse(_raw_kQpLxVnTaKs);
        _sNon_mZtRmQpLxVa(_on_mZtRmQpLxVa);

        console.log('success!');
      }
    } catch (_e_mZtRmQpLxVa) {
      console.error('Error!', _e_mZtRmQpLxVa);
    }
  };

  const _tgNt_kQpLxVnTaKs = async _nv_mZtRmQpLxVa => {
    Toast.show({
      text1: !_nOn_kQpLxVnTaKs
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem(
        'toggleOrbizNotifications',
        JSON.stringify(_nv_mZtRmQpLxVa),
      );
      _sNon_mZtRmQpLxVa(_nv_mZtRmQpLxVa);
    } catch (_e_kQpLxVnTaKs) {
      console.log('Error', _e_kQpLxVnTaKs);
    }
  };

  const _tgSd_mZtRmQpLxVa = async _nv_kQpLxVnTaKs => {
    _nOn_kQpLxVnTaKs &&
      Toast.show({
        text1: !_mOn_mZtRmQpLxVa
          ? 'Background music turned on!'
          : 'Background music turned off!',
      });

    try {
      await AsyncStorage.setItem(
        'toggleOrbizSound',
        JSON.stringify(_nv_kQpLxVnTaKs),
      );
      _sMon_kQpLxVnTaKs(_nv_kQpLxVnTaKs);
    } catch (_e_mZtRmQpLxVa) {
      console.log('Error =>', _e_mZtRmQpLxVa);
    }
  };

  const _shGp_kQpLxVnTaKs = () => {
    _sHR_kQpLxVnTaKs.share({
      message:
        'Check out Orbiz Treat Brain Rush! A fun and fast-paced word challenge game. Download it now!',
    });
  };

  const _shAp_mZtRmQpLxVa = () => {
    _lNK_mZtRmQpLxVa.openURL(
      'https://apps.apple.com/us/app/orbiz-brainrush-treat/id6758398371',
    );
  };

  return (
    <_iBG_kQpLxVnTaKs
      source={_bG_kQpLxVnTaKs}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <_sCV_mZtRmQpLxVa
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <_vW_kQpLxVnTaKs style={_st.s_orbizShell}>
          <_vW_kQpLxVnTaKs>
            <_iBG_kQpLxVnTaKs
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={_st.s_orbizBoard}
              resizeMode="stretch"
            >
              <_vW_kQpLxVnTaKs style={{ gap: 20 }}>
                <CustomMenuButton
                  onPress={() => _nv_kQpLxVnTaKs.navigate('OrbizTreatGame')}
                  btnText="Play"
                />

                <CustomMenuButton
                  onPress={() => _sShRw_mZtRmQpLxVa(true)}
                  btnText="Rules"
                />

                <CustomMenuButton
                  onPress={() =>
                    _nv_kQpLxVnTaKs.navigate('OrbizTreatAchievements')
                  }
                  btnText="Achievements"
                />
              </_vW_kQpLxVnTaKs>
            </_iBG_kQpLxVnTaKs>

            <_vW_kQpLxVnTaKs style={_st.s_orbizBottomRow}>
              {_pLF_kQpLxVnTaKs.OS !== 'android' && (
                <CustomRoundButton
                  onPress={() => _tgSd_mZtRmQpLxVa(!_mOn_mZtRmQpLxVa)}
                  btnImage={
                    _mOn_mZtRmQpLxVa
                      ? require('../../assets/orbizImages/orbizMusicOff.png')
                      : require('../../assets/orbizImages/inactiveSound.png')
                  }
                />
              )}

              <CustomRoundButton
                onPress={
                  _pLF_kQpLxVnTaKs.OS === 'ios'
                    ? _shAp_mZtRmQpLxVa
                    : _shGp_kQpLxVnTaKs
                }
                btnImage={require('../../assets/orbizImages/orbizShare.png')}
              />

              <CustomRoundButton
                onPress={() => _tgNt_kQpLxVnTaKs(!_nOn_kQpLxVnTaKs)}
                btnImage={
                  _nOn_kQpLxVnTaKs
                    ? require('../../assets/orbizImages/orbizNotif.png')
                    : require('../../assets/orbizImages/inactivNotf.png')
                }
              />
            </_vW_kQpLxVnTaKs>
          </_vW_kQpLxVnTaKs>
        </_vW_kQpLxVnTaKs>

        <_iMG_qpLxVnTaKsRm
          source={require('../../assets/orbizImages/homeBubble1.png')}
          style={{ position: 'absolute', left: 0, top: 0 }}
        />
        <_iMG_qpLxVnTaKsRm
          source={require('../../assets/orbizImages/homeBubble2.png')}
          style={{ position: 'absolute', right: 0, top: 90 }}
        />
        <_iMG_qpLxVnTaKsRm
          source={require('../../assets/orbizImages/homeBubble3.png')}
          style={{ position: 'absolute', left: 0, top: 290 }}
        />
        <_iMG_qpLxVnTaKsRm
          source={require('../../assets/orbizImages/homeBubble4.png')}
          style={{ position: 'absolute', right: 30, bottom: 30 }}
        />

        <_mDL_qpLxVnTaKsRm
          transparent
          animationType="fade"
          visible={_shRw_kQpLxVnTaKs}
          statusBarTranslucent={_pLF_kQpLxVnTaKs.OS === 'android'}
        >
          <_vW_kQpLxVnTaKs style={_st.s_orbizModalBackdrop}>
            <_bRV_kQpLxVnTaKs
              blurType="light"
              blurAmount={0}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />

            {_pLF_kQpLxVnTaKs.OS === 'android' ? null : (
              <_iMG_qpLxVnTaKsRm
                source={require('../../assets/orbizImages/oboardimg1.png')}
                style={{ top: 40, zIndex: 1, width: 350, height: 200 }}
              />
            )}

            <_iBG_kQpLxVnTaKs
              source={require('../../assets/orbizUi/homeMenuBoard.png')}
              style={_st.s_orbizRulesBoard}
              resizeMode="stretch"
            >
              <_tOP_mZtRmQpLxVa
                style={{ position: 'absolute', top: 40, right: 40 }}
                onPress={() => _sShRw_mZtRmQpLxVa(false)}
              >
                <_iMG_qpLxVnTaKsRm
                  source={require('../../assets/orbizImages/closeIcon.png')}
                  style={{ zIndex: 2 }}
                />
              </_tOP_mZtRmQpLxVa>

              <_vW_kQpLxVnTaKs>
                <_tXT_kQpLxVnTaKs style={_st.s_orbizRulesTitle}>
                  Game Rules
                </_tXT_kQpLxVnTaKs>
                <_tXT_kQpLxVnTaKs style={_st.s_orbizRulesBody}>
                  This is a fast party word-challenge game. You get a task and
                  must name 3, 4, or 5 things depending on the difficulty. Easy
                  gives 1 point, Medium gives 2 points, Hard gives 3 points.
                  Play in two modes: choose the difficulty yourself or let the
                  random mode pick it for you. Score points, compete with
                  friends, and see who wins.
                </_tXT_kQpLxVnTaKs>
              </_vW_kQpLxVnTaKs>
            </_iBG_kQpLxVnTaKs>
          </_vW_kQpLxVnTaKs>
        </_mDL_qpLxVnTaKsRm>
      </_sCV_mZtRmQpLxVa>
    </_iBG_kQpLxVnTaKs>
  );
};

const _st = _sSY_mZtRmQpLxVa.create({
  s_orbizShell: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 30,
    paddingTop: 20,
  },
  s_orbizBoard: {
    width: 345,
    height: 430,
    alignItems: 'center',
    justifyContent: 'center',
  },
  s_orbizBottomRow: {
    top: -40,
    gap: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  s_orbizRulesBoard: {
    width: 381,
    height: 457,
    alignItems: 'center',
    justifyContent: 'center',
  },
  s_orbizRulesTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
    marginBottom: 20,
  },
  s_orbizRulesBody: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 22,
    lineHeight: 24,
  },
  s_orbizModalBackdrop: {
    flex: 1,
    backgroundColor:
      _pLF_kQpLxVnTaKs.OS === 'android' ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
