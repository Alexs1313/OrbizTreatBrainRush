import React from 'react';
import {
  View as _vW_A9tQmR8LxZ7pKs2,
  Text as _tX_B3pR7mQZ8LxKs9,
  Image as _iM_Q8ZLxR7pKs2mT,
  ImageBackground as _iB_pZL8Q7RKmTsx2,
  StyleSheet as _sS_Q8mZL7RxTpKs2,
  Platform as _pL_T7ZQ8mRxKs2,
  ScrollView as _sC_QZ8mL7RxTpKs2,
} from 'react-native';
import CustomRoundButton from '../_0xTrtCmpN/CustomRoundButton';
import { useOrbizTreatStore as _uO_QZ7mL8RxTpKs2 } from '../_0xTrtstrG/orbizTreatContext';

const _bG_QZ7mL8RxTpKs2 = require('../../assets/orbizImages/orbizMainBack.png');

const _aL_QZ7mL8RxTpKs2 = [
  {
    id: 1,
    achttl: 'Star Winner',
    achsbttl: 'Complete your first full game.',
    achicon: require('../../assets/orbizImages/star.png'),
  },
  {
    id: 2,
    achttl: 'Sweet Bomb',
    achsbttl: 'Score points in 5 rounds in a row.',
    achicon: require('../../assets/orbizImages/rainbow_bomb.png'),
  },
  {
    id: 3,
    achttl: 'Lollipop Pro',
    achsbttl: 'Reach a total score of 50 points.',
    achicon: require('../../assets/orbizImages/lollipop.png'),
  },
  {
    id: 4,
    achttl: 'Grape Squad',
    achsbttl: 'Play 10 rounds in Party Mode.',
    achicon: require('../../assets/orbizImages/grape.png'),
  },
  {
    id: 5,
    achttl: 'Watermelon Brain',
    achsbttl: 'Complete a Hard-level task.',
    achicon: require('../../assets/orbizImages/watermelon.png'),
  },
  {
    id: 6,
    achttl: 'Plum Veteran',
    achsbttl: 'Complete 10 full games.',
    achicon: require('../../assets/orbizImages/plum.png'),
  },
];

export default function OrbizTreatAchievements({ navigation }) {
  const { unlockedIds } = _uO_QZ7mL8RxTpKs2();

  const _iU_QZ7mL8RxTpKs2 = id => unlockedIds.includes(id);

  return (
    <_iB_pZL8Q7RKmTsx2
      source={_bG_QZ7mL8RxTpKs2}
      style={_s_QZ7mL8RxTpKs2.s_bg_A1}
    >
      <_sC_QZ8mL7RxTpKs2
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <_vW_A9tQmR8LxZ7pKs2 style={_s_QZ7mL8RxTpKs2.s_cnt_B2}>
          <_tX_B3pR7mQZ8LxKs9 style={_s_QZ7mL8RxTpKs2.s_ttl_C3}>
            Achievements
          </_tX_B3pR7mQZ8LxKs9>

          <_vW_A9tQmR8LxZ7pKs2 style={_s_QZ7mL8RxTpKs2.s_grid_D4}>
            {_aL_QZ7mL8RxTpKs2.map(it => {
              const _u = _iU_QZ7mL8RxTpKs2(it.id);

              return (
                <_iB_pZL8Q7RKmTsx2
                  key={it.id}
                  source={require('../../assets/orbizUi/achieveBoard.png')}
                  style={_s_QZ7mL8RxTpKs2.s_board_E5}
                  resizeMode="stretch"
                >
                  <_vW_A9tQmR8LxZ7pKs2 style={_s_QZ7mL8RxTpKs2.s_card_F6}>
                    <_iM_Q8ZLxR7pKs2mT
                      source={it.achicon}
                      style={[
                        _s_QZ7mL8RxTpKs2.s_icon_G7,
                        !_u && _s_QZ7mL8RxTpKs2.s_iconLock_H8,
                      ]}
                    />

                    <_tX_B3pR7mQZ8LxKs9 style={_s_QZ7mL8RxTpKs2.s_ttl2_I9}>
                      {it.achttl}
                    </_tX_B3pR7mQZ8LxKs9>

                    <_tX_B3pR7mQZ8LxKs9 style={_s_QZ7mL8RxTpKs2.s_sub_J0}>
                      {it.achsbttl}
                    </_tX_B3pR7mQZ8LxKs9>
                  </_vW_A9tQmR8LxZ7pKs2>
                </_iB_pZL8Q7RKmTsx2>
              );
            })}
          </_vW_A9tQmR8LxZ7pKs2>

          <_vW_A9tQmR8LxZ7pKs2 style={_s_QZ7mL8RxTpKs2.s_bot_K1}>
            <CustomRoundButton
              onPress={() => navigation.goBack()}
              btnImage={require('../../assets/orbizImages/homeicon.png')}
              width={53}
              height={53}
            />
          </_vW_A9tQmR8LxZ7pKs2>
        </_vW_A9tQmR8LxZ7pKs2>
      </_sC_QZ8mL7RxTpKs2>
    </_iB_pZL8Q7RKmTsx2>
  );
}

const _s_QZ7mL8RxTpKs2 = _sS_Q8mZL7RxTpKs2.create({
  s_bg_A1: { flex: 1, resizeMode: 'cover' },

  s_cnt_B2: {
    flex: 1,
    paddingTop: _pL_T7ZQ8mRxKs2.OS === 'ios' ? 66 : 50,
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  s_ttl_C3: {
    marginBottom: 10,
    fontSize: 22,
    color: '#2B2B2B',
    fontFamily: 'Sansation-Bold',
  },

  s_grid_D4: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
  },

  s_board_E5: { width: 162, height: 198, marginBottom: 12 },

  s_card_F6: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  s_icon_G7: { width: 80, height: 80, resizeMode: 'contain' },

  s_iconLock_H8: { tintColor: 'rgba(0,0,0,0.55)' },

  s_ttl2_I9: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 6,
  },

  s_sub_J0: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Sansation-Regular',
  },

  s_bot_K1: {
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    flex: 1,
  },
});
