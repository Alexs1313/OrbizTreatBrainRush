import { useNavigation as _uNV_9xQmTrL7pZaVnK4s } from '@react-navigation/native';
import { useState as _uST_7qPzLxVnT3mA9rKb } from 'react';
import {
  Image as _iMG_6tVmQpLxZ7nR3aKs,
  ImageBackground as _iBG_4pLxQnZ8tVmR2aKs,
  Platform as _pLF_8tVmQpLxZ7nR3aKs,
  ScrollView as _sCV_6mQpZtLxV8nR3aKs,
  StyleSheet as _sSY_8tVmQpLxZ7nR3aKs,
  Text as _tXT_3aKsQpLxVnZ8tRm2,
  TouchableOpacity as _tOP_7nR3aKsQpLxV8tZm,
  View as _vW_9tVmQpLxZ7nR3aKs,
} from 'react-native';

const TreatOnboarding = () => {
  const [_ix_4pLxQnZ8tVmR2aKs, _sIx_9tVmQpLxZ7nR3aKs] =
    _uST_7qPzLxVnT3mA9rKb(0);
  const _nv_9xQmTrL7pZaVnK4s = _uNV_9xQmTrL7pZaVnK4s();

  const _bG_6mQpZtLxV8nR3aKs = require('../../assets/orbizImages/orbizMainBack.png');

  const _vw_8tVmQpLxZ7nR3aKs = [
    {
      orbizttl: 'Welcome to Orbiz Treat BrainRush',
      orbizdesc:
        'A fast and fun party game where every challenge lasts just 10 seconds. Get ready to think quick and play even quicker.',
      orbizimg:
        _pLF_8tVmQpLxZ7nR3aKs.OS === 'ios'
          ? require('../../assets/orbizImages/oboardimg1.png')
          : require('../../assets/orbizImages/icon.png'),
    },
    {
      orbizttl: 'Play Your Way',
      orbizdesc:
        'Pick a difficulty manually or let the Random Orb choose for you. Every round feels different, surprising, and exciting.',
      orbizimg: require('../../assets/orbizImages/oboardimg2.png'),
    },
    {
      orbizttl: 'Complete the Challenge in 10 Seconds',
      orbizdesc:
        'Answer fast, vote as a group, and earn points each round. Easy, Medium, or Hard — the tougher the task, the more points you get.',
      orbizimg: require('../../assets/orbizImages/oboardimg3.png'),
    },
    {
      orbizttl: 'Climb the Scoreboard and Unlock Orbiz',
      orbizdesc:
        'Finish all rounds to see the final results and unlock special achievement orbs as you progress through the game.',
      orbizimg: require('../../assets/orbizImages/oboardimg4.png'),
    },
  ];

  const _nx_2Rm9xQpLzT7nVaKs = () => {
    _ix_4pLxQnZ8tVmR2aKs < 3
      ? _sIx_9tVmQpLxZ7nR3aKs(_ix_4pLxQnZ8tVmR2aKs + 1)
      : _nv_9xQmTrL7pZaVnK4s.navigate('MainScreen');
  };

  return (
    <_iBG_4pLxQnZ8tVmR2aKs
      source={_bG_6mQpZtLxV8nR3aKs}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <_sCV_6mQpZtLxV8nR3aKs
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <_vW_9tVmQpLxZ7nR3aKs style={_st.s_box}>
          <_vW_9tVmQpLxZ7nR3aKs>
            <_iMG_6tVmQpLxZ7nR3aKs
              source={_vw_8tVmQpLxZ7nR3aKs[_ix_4pLxQnZ8tVmR2aKs].orbizimg}
              resizeMode="contain"
              style={[
                _ix_4pLxQnZ8tVmR2aKs === 0 && {
                  marginBottom: 30,
                  width: 350,
                  height: 280,
                },
                _pLF_8tVmQpLxZ7nR3aKs.OS === 'android' && {
                  width: 240,
                  height: 240,
                  borderRadius: 70,
                },
              ]}
            />

            {_ix_4pLxQnZ8tVmR2aKs === 0 && (
              <>
                <_iMG_6tVmQpLxZ7nR3aKs
                  source={require('../../assets/orbizImages/bubble1.png')}
                  style={{ position: 'absolute', right: -140, top: 100 }}
                />
                <_iMG_6tVmQpLxZ7nR3aKs
                  source={require('../../assets/orbizImages/bubble2.png')}
                  style={{ position: 'absolute', left: -50, top: -80 }}
                />
              </>
            )}
          </_vW_9tVmQpLxZ7nR3aKs>

          <_vW_9tVmQpLxZ7nR3aKs>
            <_iBG_4pLxQnZ8tVmR2aKs
              source={require('../../assets/orbizUi/orbizBoard.png')}
              style={_st.s_board}
            >
              <_vW_9tVmQpLxZ7nR3aKs style={{ paddingHorizontal: 20 }}>
                <_tXT_3aKsQpLxVnZ8tRm2 style={_st.s_title}>
                  {_vw_8tVmQpLxZ7nR3aKs[_ix_4pLxQnZ8tVmR2aKs].orbizttl}
                </_tXT_3aKsQpLxVnZ8tRm2>
                <_tXT_3aKsQpLxVnZ8tRm2 style={_st.s_desc}>
                  {_vw_8tVmQpLxZ7nR3aKs[_ix_4pLxQnZ8tVmR2aKs].orbizdesc}
                </_tXT_3aKsQpLxVnZ8tRm2>
              </_vW_9tVmQpLxZ7nR3aKs>
            </_iBG_4pLxQnZ8tVmR2aKs>

            <_tOP_7nR3aKsQpLxV8tZm
              style={{ top: -40, alignSelf: 'center' }}
              onPress={_nx_2Rm9xQpLzT7nVaKs}
              activeOpacity={0.8}
            >
              <_iBG_4pLxQnZ8tVmR2aKs
                source={require('../../assets/orbizUi/orbizNextButton.png')}
                style={_st.s_btn}
              >
                <_iMG_6tVmQpLxZ7nR3aKs
                  source={require('../../assets/orbizImages/orbizPlay.png')}
                  style={{ left: 2, bottom: 1 }}
                />
              </_iBG_4pLxQnZ8tVmR2aKs>
            </_tOP_7nR3aKsQpLxV8tZm>
          </_vW_9tVmQpLxZ7nR3aKs>
        </_vW_9tVmQpLxZ7nR3aKs>
      </_sCV_6mQpZtLxV8nR3aKs>
    </_iBG_4pLxQnZ8tVmR2aKs>
  );
};

const _st = _sSY_8tVmQpLxZ7nR3aKs.create({
  s_box: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 30,
  },
  s_title: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  s_desc: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 2,
    lineHeight: 22,
  },
  s_board: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  s_btn: {
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TreatOnboarding;
