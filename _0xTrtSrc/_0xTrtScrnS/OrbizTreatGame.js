import React, {
  useEffect as _uEF_kQpLxVnTaKs,
  useRef as _uRF_mZtRmQpLxVa,
  useState as _uST_sTrUvWxYzA,
} from 'react';
import {
  View as _vW_kQpLxVnTaKs,
  Text as _tXT_mZtRmQpLxVa,
  TextInput as _tIP_kQpLxVnTaKs,
  TouchableOpacity as _tOP_mZtRmQpLxVa,
  ImageBackground as _iBG_kQpLxVnTaKs,
  Image as _iMG_mZtRmQpLxVa,
  StyleSheet as _sSY_kQpLxVnTaKs,
  ScrollView as _sCV_mZtRmQpLxVa,
  Platform as _pLF_kQpLxVnTaKs,
} from 'react-native';
import { useNavigation as _uNV_mZtRmQpLxVa } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// my local imports ---------------------------------->
import CustomRoundButton from '../_0xTrtCmpN/CustomRoundButton';
import { useOrbizTreatStore as _uTS_kQpLxVnTaKs } from '../_0xTrtstrG/orbizTreatContext';
import { orbizGameTasks as _gTK_mZtRmQpLxVa } from '../_0xTrtDt$/orbizGameTasks';

const _bG_kQpLxVnTaKs = require('../../assets/orbizImages/orbizMainBack.png');

const _gOB_mZtRmQpLxVa = {
  easy: {
    label: 'Easy',
    points: 1,
    img: require('../../assets/orbizImages/easyOrb.png'),
  },
  medium: {
    label: 'Medium',
    points: 2,
    img: require('../../assets/orbizImages/mediumOrb.png'),
  },
  hard: {
    label: 'Hard',
    points: 3,
    img: require('../../assets/orbizImages/hardOrb.png'),
  },
};

const _dPL_kQpLxVnTaKs = 2;
const _mPL_mZtRmQpLxVa = 7;
const _aRD_kQpLxVnTaKs = [5, 10, 15, 20];
const _mDS_mZtRmQpLxVa = ['Manual', 'Mystery Orb'];

export default function OrbizTreatGame() {
  const _nv_mZtRmQpLxVa = _uNV_mZtRmQpLxVa();

  const [_ph_kQpLxVnTaKs, _sPh_mZtRmQpLxVa] = _uST_sTrUvWxYzA('start');
  const [_pc_mZtRmQpLxVa, _sPc_kQpLxVnTaKs] = _uST_sTrUvWxYzA(_dPL_kQpLxVnTaKs);
  const [_rd_kQpLxVnTaKs, _sRd_mZtRmQpLxVa] = _uST_sTrUvWxYzA(
    _aRD_kQpLxVnTaKs[0],
  );
  const [_md_mZtRmQpLxVa, _sMd_kQpLxVnTaKs] = _uST_sTrUvWxYzA(
    _mDS_mZtRmQpLxVa[0],
  );
  const [_pl_kQpLxVnTaKs, _sPl_mZtRmQpLxVa] = _uST_sTrUvWxYzA([]);
  const [_cr_mZtRmQpLxVa, _sCr_kQpLxVnTaKs] = _uST_sTrUvWxYzA(1);
  const [_cp_kQpLxVnTaKs, _sCp_mZtRmQpLxVa] = _uST_sTrUvWxYzA(0);
  const [_co_mZtRmQpLxVa, _sCo_kQpLxVnTaKs] = _uST_sTrUvWxYzA(null);
  const [_rv_kQpLxVnTaKs, _sRv_mZtRmQpLxVa] = _uST_sTrUvWxYzA(false);
  const [_sq_mZtRmQpLxVa, _sSq_kQpLxVnTaKs] = _uST_sTrUvWxYzA(false);
  const [_tk_kQpLxVnTaKs, _sTk_mZtRmQpLxVa] = _uST_sTrUvWxYzA(null);
  const [_ts_mZtRmQpLxVa, _sTs_kQpLxVnTaKs] = _uST_sTrUvWxYzA(10);
  const [_tr_kQpLxVnTaKs, _sTr_mZtRmQpLxVa] = _uST_sTrUvWxYzA(false);
  const [_op_mZtRmQpLxVa, _sOp_kQpLxVnTaKs] = _uST_sTrUvWxYzA(false);
  const [_sp_kQpLxVnTaKs, _sSp_mZtRmQpLxVa] = _uST_sTrUvWxYzA(false);
  const [_sv_mZtRmQpLxVa, _sSv_kQpLxVnTaKs] = _uST_sTrUvWxYzA('easy');
  const [_cf_kQpLxVnTaKs, _sCf_mZtRmQpLxVa] = _uST_sTrUvWxYzA(false);
  const [_wn_mZtRmQpLxVa, _sWn_kQpLxVnTaKs] = _uST_sTrUvWxYzA(false);
  const [_ne_kQpLxVnTaKs, _sNe_mZtRmQpLxVa] = _uST_sTrUvWxYzA({});

  const _dR_kQpLxVnTaKs = _uRF_mZtRmQpLxVa(null);
  const _tR_mZtRmQpLxVa = _uRF_mZtRmQpLxVa(null);
  const _sR_kQpLxVnTaKs = _uRF_mZtRmQpLxVa(null);
  const _cR_mZtRmQpLxVa = _uRF_mZtRmQpLxVa(null);
  const _wR_kQpLxVnTaKs = _uRF_mZtRmQpLxVa(null);

  const {
    recordRound: _rRd_mZtRmQpLxVa,
    recordGameCompleted: _rGc_kQpLxVnTaKs,
    isEnabledNotifications: _nOn_mZtRmQpLxVa,
  } = _uTS_kQpLxVnTaKs();

  _uEF_kQpLxVnTaKs(() => {
    return () => _clTm_kQpLxVnTaKs();
  }, []);

  _uEF_kQpLxVnTaKs(() => {
    if (!_pl_kQpLxVnTaKs || _pl_kQpLxVnTaKs.length === 0) return;

    const _er_mZtRmQpLxVa = {};
    const _nm_kQpLxVnTaKs = _pl_kQpLxVnTaKs.map(p => p.name.trim());

    const _ct_mZtRmQpLxVa = {};
    _nm_kQpLxVnTaKs.forEach(n => {
      if (!n) return;
      _ct_mZtRmQpLxVa[n] = (_ct_mZtRmQpLxVa[n] || 0) + 1;
    });

    _sNe_mZtRmQpLxVa(_er_mZtRmQpLxVa);
  }, [_pl_kQpLxVnTaKs]);

  const _pkTk_kQpLxVnTaKs = _df_mZtRmQpLxVa => {
    const _ts_kQpLxVnTaKs = _gTK_mZtRmQpLxVa[_df_mZtRmQpLxVa];
    const _ix_mZtRmQpLxVa = Math.floor(Math.random() * _ts_kQpLxVnTaKs.length);
    return _ts_kQpLxVnTaKs[_ix_mZtRmQpLxVa];
  };

  const _clTm_kQpLxVnTaKs = () => {
    if (_dR_kQpLxVnTaKs.current) {
      clearTimeout(_dR_kQpLxVnTaKs.current);
      _dR_kQpLxVnTaKs.current = null;
    }
    if (_tR_mZtRmQpLxVa.current) {
      clearInterval(_tR_mZtRmQpLxVa.current);
      _tR_mZtRmQpLxVa.current = null;
    }
    if (_sR_kQpLxVnTaKs.current) {
      clearInterval(_sR_kQpLxVnTaKs.current);
      _sR_kQpLxVnTaKs.current = null;
    }
    if (_cR_mZtRmQpLxVa.current) {
      clearTimeout(_cR_mZtRmQpLxVa.current);
      _cR_mZtRmQpLxVa.current = null;
    }
    if (_wR_kQpLxVnTaKs.current) {
      clearTimeout(_wR_kQpLxVnTaKs.current);
      _wR_kQpLxVnTaKs.current = null;
    }
  };

  const _gtNm_mZtRmQpLxVa = () => {
    const _nx_kQpLxVnTaKs = Array.from({ length: _pc_mZtRmQpLxVa }, (_, i) => ({
      id: i + 1,
      name: '',
      score: 0,
    }));

    _sPl_mZtRmQpLxVa(_nx_kQpLxVnTaKs);
    _sPh_mZtRmQpLxVa('names');

    if (_nOn_mZtRmQpLxVa) {
      Toast.show({ text1: 'Enter player names.' });
    }
  };

  const _cnNm_kQpLxVnTaKs = () =>
    Object.keys(_ne_kQpLxVnTaKs).length === 0 &&
    _pl_kQpLxVnTaKs.length >= 2 &&
    _pl_kQpLxVnTaKs.every(p => p.name.trim() !== '');

  const _plGm_mZtRmQpLxVa = () => {
    if (!_cnNm_kQpLxVnTaKs()) {
      Toast.show({ text1: 'Fill all player names first.' });
      return;
    }

    _sPl_mZtRmQpLxVa(_pv => _pv.map(p => ({ ...p, score: 0 })));
    _sCr_kQpLxVnTaKs(1);
    _sCp_mZtRmQpLxVa(0);
    _sPh_mZtRmQpLxVa('playing');
    _rsTr_kQpLxVnTaKs();
  };

  const _rsTr_kQpLxVnTaKs = () => {
    _sCo_kQpLxVnTaKs(null);
    _sRv_mZtRmQpLxVa(false);
    _sSq_kQpLxVnTaKs(false);
    _sTk_mZtRmQpLxVa(null);
    _sTs_kQpLxVnTaKs(10);
    _sTr_mZtRmQpLxVa(false);
    _sOp_kQpLxVnTaKs(false);
    _clTm_kQpLxVnTaKs();
  };

  const _stTm_mZtRmQpLxVa = () => {
    _sTr_mZtRmQpLxVa(true);
    _sTs_kQpLxVnTaKs(10);

    let _sc_kQpLxVnTaKs = 10;

    if (_tR_mZtRmQpLxVa.current) clearInterval(_tR_mZtRmQpLxVa.current);

    _tR_mZtRmQpLxVa.current = setInterval(() => {
      _sc_kQpLxVnTaKs -= 1;
      _sTs_kQpLxVnTaKs(_sc_kQpLxVnTaKs);

      if (_sc_kQpLxVnTaKs <= 0) {
        clearInterval(_tR_mZtRmQpLxVa.current);
        _tR_mZtRmQpLxVa.current = null;
        _sTr_mZtRmQpLxVa(false);

        _sOp_kQpLxVnTaKs(true);

        if (_nOn_mZtRmQpLxVa)
          Toast.show({ text1: 'Time is up! Make your choice.' });
      }
    }, 980);
  };

  const _spn_kQpLxVnTaKs = () => {
    if (_sp_kQpLxVnTaKs || _tr_kQpLxVnTaKs || _sq_mZtRmQpLxVa) return;

    _sSp_mZtRmQpLxVa(true);

    const _df_mZtRmQpLxVa = ['easy', 'medium', 'hard'];
    let _ix_kQpLxVnTaKs = 0;

    _sR_kQpLxVnTaKs.current = setInterval(() => {
      _sSv_kQpLxVnTaKs(_df_mZtRmQpLxVa[_ix_kQpLxVnTaKs % 3]);
      _ix_kQpLxVnTaKs++;
    }, 80);

    setTimeout(() => {
      if (_sR_kQpLxVnTaKs.current) {
        clearInterval(_sR_kQpLxVnTaKs.current);
        _sR_kQpLxVnTaKs.current = null;
      }

      const _rdm_mZtRmQpLxVa = _df_mZtRmQpLxVa[Math.floor(Math.random() * 3)];
      _sSv_kQpLxVnTaKs(_rdm_mZtRmQpLxVa);
      _sSp_mZtRmQpLxVa(false);
      _slOb_mZtRmQpLxVa(_rdm_mZtRmQpLxVa);
    }, 1200);
  };

  const _dcSn_kQpLxVnTaKs = _ok_mZtRmQpLxVa => {
    _sOp_kQpLxVnTaKs(false);
    _clTm_kQpLxVnTaKs();

    if (_ok_mZtRmQpLxVa && _co_mZtRmQpLxVa) {
      const _pt_kQpLxVnTaKs = _gOB_mZtRmQpLxVa[_co_mZtRmQpLxVa].points;

      _sPl_mZtRmQpLxVa(_pv =>
        _pv.map((p, i) =>
          i === _cp_kQpLxVnTaKs
            ? { ...p, score: p.score + _pt_kQpLxVnTaKs }
            : p,
        ),
      );

      if (_rRd_mZtRmQpLxVa) {
        _rRd_mZtRmQpLxVa({
          scored: true,
          points: _pt_kQpLxVnTaKs,
          mode: _md_mZtRmQpLxVa,
          difficulty: _co_mZtRmQpLxVa,
        });
      }

      console.log('confetti!!');
      _sCf_mZtRmQpLxVa(true);

      if (_nOn_mZtRmQpLxVa)
        Toast.show({ text1: 'Great job! You earned points.' });

      if (_cR_mZtRmQpLxVa.current) clearTimeout(_cR_mZtRmQpLxVa.current);

      _cR_mZtRmQpLxVa.current = setTimeout(() => {
        _sCf_mZtRmQpLxVa(false);
        _cR_mZtRmQpLxVa.current = null;
        _adTr_kQpLxVnTaKs();
      }, 1800);
    } else {
      if (_rRd_mZtRmQpLxVa) {
        _rRd_mZtRmQpLxVa({
          scored: false,
          points: 0,
          mode: _md_mZtRmQpLxVa,
          difficulty: _co_mZtRmQpLxVa || 'none',
        });
      }
      _adTr_kQpLxVnTaKs();
    }
  };

  const _adTr_kQpLxVnTaKs = () => {
    _rsTr_kQpLxVnTaKs();

    const _nx_mZtRmQpLxVa = _cp_kQpLxVnTaKs + 1;

    if (_nx_mZtRmQpLxVa >= _pl_kQpLxVnTaKs.length) {
      if (_cr_mZtRmQpLxVa >= _rd_kQpLxVnTaKs) {
        if (_rGc_kQpLxVnTaKs) _rGc_kQpLxVnTaKs();
        _sPh_mZtRmQpLxVa('results');
      } else {
        _sPh_mZtRmQpLxVa('intermediate');
      }
    } else {
      _sCp_mZtRmQpLxVa(_nx_mZtRmQpLxVa);
    }
  };

  const _nxRd_mZtRmQpLxVa = () => {
    _sCr_kQpLxVnTaKs(v => v + 1);
    _sCp_mZtRmQpLxVa(0);
    _sPh_mZtRmQpLxVa('playing');
    _rsTr_kQpLxVnTaKs();
    console.log('next round =>');
  };

  _uEF_kQpLxVnTaKs(() => {
    if (_ph_kQpLxVnTaKs === 'results') {
      _sWn_kQpLxVnTaKs(true);

      if (_wR_kQpLxVnTaKs.current) clearTimeout(_wR_kQpLxVnTaKs.current);

      _wR_kQpLxVnTaKs.current = setTimeout(() => {
        _sWn_kQpLxVnTaKs(false);
        _wR_kQpLxVnTaKs.current = null;
      }, 4000);
    } else {
      if (_wR_kQpLxVnTaKs.current) {
        clearTimeout(_wR_kQpLxVnTaKs.current);
        _wR_kQpLxVnTaKs.current = null;
      }
      _sWn_kQpLxVnTaKs(false);
    }

    return () => {
      if (_wR_kQpLxVnTaKs.current) {
        clearTimeout(_wR_kQpLxVnTaKs.current);
        _wR_kQpLxVnTaKs.current = null;
      }
    };
  }, [_ph_kQpLxVnTaKs]);

  const _chPc_kQpLxVnTaKs = _dl_mZtRmQpLxVa =>
    _sPc_kQpLxVnTaKs(v =>
      Math.max(2, Math.min(_mPL_mZtRmQpLxVa, v + _dl_mZtRmQpLxVa)),
    );

  const _chRd_mZtRmQpLxVa = _dl_kQpLxVnTaKs => {
    const _ix_mZtRmQpLxVa = _aRD_kQpLxVnTaKs.indexOf(_rd_kQpLxVnTaKs);
    const _nx_kQpLxVnTaKs = Math.max(
      0,
      Math.min(_aRD_kQpLxVnTaKs.length - 1, _ix_mZtRmQpLxVa + _dl_kQpLxVnTaKs),
    );
    _sRd_mZtRmQpLxVa(_aRD_kQpLxVnTaKs[_nx_kQpLxVnTaKs]);
  };

  const _chMd_kQpLxVnTaKs = _dl_mZtRmQpLxVa => {
    const _ix_kQpLxVnTaKs = _mDS_mZtRmQpLxVa.indexOf(_md_mZtRmQpLxVa);
    const _nx_mZtRmQpLxVa = Math.max(
      0,
      Math.min(_mDS_mZtRmQpLxVa.length - 1, _ix_kQpLxVnTaKs + _dl_mZtRmQpLxVa),
    );
    _sMd_kQpLxVnTaKs(_mDS_mZtRmQpLxVa[_nx_mZtRmQpLxVa]);
  };

  const _slOb_mZtRmQpLxVa = _df_kQpLxVnTaKs => {
    if (_tr_kQpLxVnTaKs || _sq_mZtRmQpLxVa || _sp_kQpLxVnTaKs) return;

    _sCo_kQpLxVnTaKs(_df_kQpLxVnTaKs);
    _sRv_mZtRmQpLxVa(true);
    _sSq_kQpLxVnTaKs(false);
    _sTk_mZtRmQpLxVa(null);
    _sOp_kQpLxVnTaKs(false);

    if (_dR_kQpLxVnTaKs.current) {
      clearTimeout(_dR_kQpLxVnTaKs.current);
      _dR_kQpLxVnTaKs.current = null;
    }

    _dR_kQpLxVnTaKs.current = setTimeout(() => {
      _sRv_mZtRmQpLxVa(false);

      const _tk_mZtRmQpLxVa = _pkTk_kQpLxVnTaKs(_df_kQpLxVnTaKs);
      _sTk_mZtRmQpLxVa(_tk_mZtRmQpLxVa);
      _sSq_kQpLxVnTaKs(true);
      _sOp_kQpLxVnTaKs(false);

      _stTm_mZtRmQpLxVa();
      _dR_kQpLxVnTaKs.current = null;
    }, 2500);
  };

  const _cpPl_mZtRmQpLxVa = _pl_kQpLxVnTaKs[_cp_kQpLxVnTaKs] || { name: '' };

  const _RsCd_kQpLxVnTaKs = ({
    title: _tt_mZtRmQpLxVa,
    showTrophy: _tr_kQpLxVnTaKs,
  }) => {
    const _sr_mZtRmQpLxVa = [..._pl_kQpLxVnTaKs].sort(
      (a, b) => b.score - a.score,
    );

    return (
      <_vW_kQpLxVnTaKs style={_st.s_centerArea}>
        {_tr_kQpLxVnTaKs && (
          <_iMG_mZtRmQpLxVa
            source={require('../../assets/orbizImages/orbizTrophy.png')}
            style={{
              width: 120,
              height: 120,
              marginBottom: -20,
              marginTop: 10,
            }}
          />
        )}

        <_iBG_kQpLxVnTaKs
          source={require('../../assets/orbizUi/orbizSetupBoard.png')}
          style={_st.s_setupBoard}
          resizeMode="contain"
        >
          <_vW_kQpLxVnTaKs
            style={{
              paddingHorizontal: 35,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <_tXT_mZtRmQpLxVa style={_st.s_cardTitle}>
              {_tt_mZtRmQpLxVa}
            </_tXT_mZtRmQpLxVa>

            <_vW_kQpLxVnTaKs style={{ width: '100%', marginTop: 6 }}>
              {_sr_mZtRmQpLxVa.map(p => (
                <_vW_kQpLxVnTaKs key={p.id} style={_st.s_scoreRow}>
                  <_tXT_mZtRmQpLxVa
                    style={{
                      color: '#fff',
                      fontFamily: 'Sansation-Bold',
                      fontSize: 18,
                    }}
                  >
                    {p.name}
                  </_tXT_mZtRmQpLxVa>
                  <_tXT_mZtRmQpLxVa
                    style={{
                      color: '#fff',
                      fontFamily: 'Sansation-Bold',
                      fontSize: 18,
                    }}
                  >
                    {p.score}
                  </_tXT_mZtRmQpLxVa>
                </_vW_kQpLxVnTaKs>
              ))}
            </_vW_kQpLxVnTaKs>
          </_vW_kQpLxVnTaKs>
        </_iBG_kQpLxVnTaKs>

        <_vW_kQpLxVnTaKs style={{ alignItems: 'center', marginTop: 12 }}>
          {_ph_kQpLxVnTaKs === 'intermediate' ? (
            <_vW_kQpLxVnTaKs style={{ gap: 15, top: -40 }}>
              <CustomRoundButton
                onPress={_nxRd_mZtRmQpLxVa}
                btnImage={require('../../assets/orbizImages/orbizPlay.png')}
              />
              <CustomRoundButton
                onPress={() => _nv_mZtRmQpLxVa.goBack()}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
              />
            </_vW_kQpLxVnTaKs>
          ) : (
            <_vW_kQpLxVnTaKs style={{ top: -40 }}>
              <CustomRoundButton
                onPress={() => _nv_mZtRmQpLxVa.goBack()}
                btnImage={require('../../assets/orbizImages/homeicon.png')}
              />
            </_vW_kQpLxVnTaKs>
          )}
        </_vW_kQpLxVnTaKs>
      </_vW_kQpLxVnTaKs>
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
      >
        <_vW_kQpLxVnTaKs
          style={[
            _st.s_startWrap,
            _ph_kQpLxVnTaKs === 'playing' && { justifyContent: 'flex-start' },
            (_ph_kQpLxVnTaKs === 'results' ||
              _ph_kQpLxVnTaKs === 'intermediate') && {
              justifyContent: 'flex-end',
              flex: 1,
            },
          ]}
        >
          {_ph_kQpLxVnTaKs === 'start' && (
            <_vW_kQpLxVnTaKs style={_st.s_centerArea}>
              {_pLF_kQpLxVnTaKs.OS === 'ios' && (
                <_iMG_mZtRmQpLxVa
                  source={require('../../assets/orbizImages/oboardimg1.png')}
                  style={{ width: 350, height: 220 }}
                />
              )}

              <_iBG_kQpLxVnTaKs
                source={require('../../assets/orbizUi/orbizBoard.png')}
                style={_st.s_mainBoard}
              >
                <_vW_kQpLxVnTaKs style={{ paddingHorizontal: 20 }}>
                  <_tXT_mZtRmQpLxVa style={_st.s_orbizTitle}>
                    Ready to Start?
                  </_tXT_mZtRmQpLxVa>
                  <_tXT_mZtRmQpLxVa style={_st.s_orbizSubtitle}>
                    A fast, sweet brain-challenge game you play in seconds. Pick
                    a mode, beat the task, and race your friends for the highest
                    score.
                  </_tXT_mZtRmQpLxVa>
                </_vW_kQpLxVnTaKs>
              </_iBG_kQpLxVnTaKs>

              <_vW_kQpLxVnTaKs style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={() => {
                    _sPh_mZtRmQpLxVa('setup');
                    if (_nOn_mZtRmQpLxVa)
                      Toast.show({
                        text1: 'Game setup started! Choose your settings.',
                      });
                  }}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                />
                <CustomRoundButton
                  onPress={() => _nv_mZtRmQpLxVa.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </_vW_kQpLxVnTaKs>

              <_iMG_mZtRmQpLxVa
                source={require('../../assets/orbizImages/gameBubble1.png')}
                style={{ position: 'absolute', right: -20, top: 190 }}
              />
              <_iMG_mZtRmQpLxVa
                source={require('../../assets/orbizImages/gameBubble2.png')}
                style={{ position: 'absolute', left: 0, top: 0 }}
              />
            </_vW_kQpLxVnTaKs>
          )}

          {_ph_kQpLxVnTaKs === 'setup' && (
            <_vW_kQpLxVnTaKs style={_st.s_centerArea}>
              <_vW_kQpLxVnTaKs style={_st.s_topBubble}>
                <_iMG_mZtRmQpLxVa
                  source={require('../../assets/orbizImages/settingsBubble.png')}
                  style={{ marginTop: 30 }}
                />
              </_vW_kQpLxVnTaKs>

              <_iBG_kQpLxVnTaKs
                source={require('../../assets/orbizUi/orbizSetupBoard.png')}
                style={_st.s_setupBoard}
                resizeMode="contain"
              >
                <_vW_kQpLxVnTaKs
                  style={{ paddingHorizontal: 20, alignItems: 'center' }}
                >
                  <_tXT_mZtRmQpLxVa
                    style={[_st.s_orbizTitle, { marginBottom: 20 }]}
                  >
                    Game Setup
                  </_tXT_mZtRmQpLxVa>

                  <_vW_kQpLxVnTaKs style={_st.s_settingRow}>
                    <_tXT_mZtRmQpLxVa style={_st.s_settingLabel}>
                      Players:
                    </_tXT_mZtRmQpLxVa>
                    <_vW_kQpLxVnTaKs style={_st.s_chevRow}>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chPc_kQpLxVnTaKs(-1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                      <_tXT_mZtRmQpLxVa style={_st.s_settingValue}>
                        {_pc_mZtRmQpLxVa}
                      </_tXT_mZtRmQpLxVa>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chPc_kQpLxVnTaKs(1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                    </_vW_kQpLxVnTaKs>
                  </_vW_kQpLxVnTaKs>

                  <_vW_kQpLxVnTaKs style={_st.s_settingRow}>
                    <_tXT_mZtRmQpLxVa style={_st.s_settingLabel}>
                      Rounds:
                    </_tXT_mZtRmQpLxVa>
                    <_vW_kQpLxVnTaKs style={_st.s_chevRow}>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chRd_mZtRmQpLxVa(-1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                      <_tXT_mZtRmQpLxVa style={_st.s_settingValue}>
                        {_rd_kQpLxVnTaKs}
                      </_tXT_mZtRmQpLxVa>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chRd_mZtRmQpLxVa(1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                    </_vW_kQpLxVnTaKs>
                  </_vW_kQpLxVnTaKs>

                  <_vW_kQpLxVnTaKs style={_st.s_settingRow}>
                    <_tXT_mZtRmQpLxVa style={_st.s_settingLabel}>
                      Mode:
                    </_tXT_mZtRmQpLxVa>
                    <_vW_kQpLxVnTaKs style={_st.s_chevRow}>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chMd_kQpLxVnTaKs(-1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/prevarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                      <_tXT_mZtRmQpLxVa style={_st.s_settingValue}>
                        {_md_mZtRmQpLxVa}
                      </_tXT_mZtRmQpLxVa>
                      <_tOP_mZtRmQpLxVa
                        style={_st.s_chevBtn}
                        onPress={() => _chMd_kQpLxVnTaKs(1)}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={require('../../assets/orbizUi/nextarr.png')}
                        />
                      </_tOP_mZtRmQpLxVa>
                    </_vW_kQpLxVnTaKs>
                  </_vW_kQpLxVnTaKs>
                </_vW_kQpLxVnTaKs>
              </_iBG_kQpLxVnTaKs>

              <_vW_kQpLxVnTaKs style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={_gtNm_mZtRmQpLxVa}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                />
                <CustomRoundButton
                  onPress={() => _nv_mZtRmQpLxVa.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </_vW_kQpLxVnTaKs>
            </_vW_kQpLxVnTaKs>
          )}

          {_ph_kQpLxVnTaKs === 'names' && (
            <_vW_kQpLxVnTaKs style={_st.s_centerArea}>
              <_vW_kQpLxVnTaKs style={_st.s_topBubble}>
                <_iMG_mZtRmQpLxVa
                  source={require('../../assets/orbizImages/settingsBubble.png')}
                  style={{ marginTop: 30 }}
                />
              </_vW_kQpLxVnTaKs>

              <_iBG_kQpLxVnTaKs
                source={require('../../assets/orbizUi/orbizSetupBoard.png')}
                style={_st.s_setupBoard}
                resizeMode="contain"
              >
                <_vW_kQpLxVnTaKs
                  style={{
                    paddingHorizontal: 25,
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <_tXT_mZtRmQpLxVa style={_st.s_cardTitle}>
                    Players Names
                  </_tXT_mZtRmQpLxVa>

                  <_vW_kQpLxVnTaKs style={{ width: '100%', marginTop: 6 }}>
                    {_pl_kQpLxVnTaKs.map((p, idx) => (
                      <_vW_kQpLxVnTaKs key={p.id} style={_st.s_playerRow}>
                        <_tXT_mZtRmQpLxVa style={_st.s_playerLabel}>
                          Player {idx + 1}:
                        </_tXT_mZtRmQpLxVa>
                        <_tIP_kQpLxVnTaKs
                          value={p.name}
                          maxLength={20}
                          onChangeText={t =>
                            _sPl_mZtRmQpLxVa(prev =>
                              prev.map(pp =>
                                pp.id === p.id ? { ...pp, name: t } : pp,
                              ),
                            )
                          }
                          style={[
                            _st.s_nameInput,
                            _ne_kQpLxVnTaKs[p.id] ? _st.s_inputError : null,
                          ]}
                        />
                      </_vW_kQpLxVnTaKs>
                    ))}
                  </_vW_kQpLxVnTaKs>
                </_vW_kQpLxVnTaKs>
              </_iBG_kQpLxVnTaKs>

              <_vW_kQpLxVnTaKs style={{ gap: 15, top: -40 }}>
                <CustomRoundButton
                  onPress={_plGm_mZtRmQpLxVa}
                  btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                  isDisabled={!_cnNm_kQpLxVnTaKs()}
                  width={53}
                  height={53}
                />
                <CustomRoundButton
                  onPress={() => _nv_mZtRmQpLxVa.goBack()}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                  width={53}
                  height={53}
                />
              </_vW_kQpLxVnTaKs>
            </_vW_kQpLxVnTaKs>
          )}

          {_ph_kQpLxVnTaKs === 'playing' && (
            <_vW_kQpLxVnTaKs style={_st.s_playArea}>
              <_tXT_mZtRmQpLxVa style={_st.s_playerTitle}>
                {_cpPl_mZtRmQpLxVa.name || 'Player'}
              </_tXT_mZtRmQpLxVa>

              {!_sq_mZtRmQpLxVa &&
                !_tk_kQpLxVnTaKs &&
                _md_mZtRmQpLxVa !== 'Mystery Orb' && (
                  <_tXT_mZtRmQpLxVa
                    style={{
                      color: '#2B2B2B',
                      fontSize: 20,
                      fontFamily: 'Sansation-Bold',
                      marginBottom: 120,
                      textAlign: 'center',
                    }}
                  >
                    Tap Category once you are ready
                  </_tXT_mZtRmQpLxVa>
                )}

              <_vW_kQpLxVnTaKs style={_st.s_orbRow}>
                {!_co_mZtRmQpLxVa ? (
                  <>
                    <_vW_kQpLxVnTaKs style={_st.s_orbCol}>
                      <_tOP_mZtRmQpLxVa
                        onPress={() => _slOb_mZtRmQpLxVa('easy')}
                        style={_st.s_smallOrbWrap}
                        disabled={_md_mZtRmQpLxVa === 'Mystery Orb'}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={_gOB_mZtRmQpLxVa.easy.img}
                          style={_st.s_centerOrbImg}
                        />
                      </_tOP_mZtRmQpLxVa>
                      {_md_mZtRmQpLxVa !== 'Mystery Orb' && (
                        <_tXT_mZtRmQpLxVa style={_st.s_orbLabel}>
                          Easy
                        </_tXT_mZtRmQpLxVa>
                      )}
                    </_vW_kQpLxVnTaKs>

                    <_vW_kQpLxVnTaKs style={_st.s_orbCol}>
                      <_tOP_mZtRmQpLxVa
                        onPress={() => _slOb_mZtRmQpLxVa('medium')}
                        style={_st.s_centerOrbWrap}
                        disabled={_md_mZtRmQpLxVa === 'Mystery Orb'}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={_gOB_mZtRmQpLxVa.medium.img}
                          style={_st.s_centerOrbImg}
                        />
                      </_tOP_mZtRmQpLxVa>
                      {_md_mZtRmQpLxVa !== 'Mystery Orb' && (
                        <_tXT_mZtRmQpLxVa style={_st.s_orbLabel}>
                          Medium
                        </_tXT_mZtRmQpLxVa>
                      )}
                    </_vW_kQpLxVnTaKs>

                    <_vW_kQpLxVnTaKs style={_st.s_orbCol}>
                      <_tOP_mZtRmQpLxVa
                        onPress={() => _slOb_mZtRmQpLxVa('hard')}
                        style={_st.s_smallOrbWrap}
                        disabled={_md_mZtRmQpLxVa === 'Mystery Orb'}
                      >
                        <_iMG_mZtRmQpLxVa
                          source={_gOB_mZtRmQpLxVa.hard.img}
                          style={_st.s_centerOrbImg}
                        />
                      </_tOP_mZtRmQpLxVa>
                      {_md_mZtRmQpLxVa !== 'Mystery Orb' && (
                        <_tXT_mZtRmQpLxVa style={_st.s_orbLabel}>
                          Hard
                        </_tXT_mZtRmQpLxVa>
                      )}
                    </_vW_kQpLxVnTaKs>
                  </>
                ) : (
                  !_sq_mZtRmQpLxVa && <_vW_kQpLxVnTaKs />
                )}
              </_vW_kQpLxVnTaKs>

              <_vW_kQpLxVnTaKs style={_st.s_taskArea}>
                {_sq_mZtRmQpLxVa && _tk_kQpLxVnTaKs ? (
                  <>
                    <_vW_kQpLxVnTaKs>
                      <_iBG_kQpLxVnTaKs
                        source={require('../../assets/orbizUi/orbizQuestBoard.png')}
                        style={_st.s_questBoard}
                        resizeMode="contain"
                      >
                        <_vW_kQpLxVnTaKs
                          style={{
                            paddingHorizontal: 25,
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <_tXT_mZtRmQpLxVa style={_st.s_taskText}>
                            {_tk_kQpLxVnTaKs}
                          </_tXT_mZtRmQpLxVa>
                        </_vW_kQpLxVnTaKs>
                      </_iBG_kQpLxVnTaKs>

                      {_op_mZtRmQpLxVa && (
                        <_vW_kQpLxVnTaKs
                          style={{
                            gap: 25,
                            top: -40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <CustomRoundButton
                            onPress={() => _dcSn_kQpLxVnTaKs(false)}
                            btnImage={require('../../assets/orbizImages/noIcon.png')}
                          />
                          <CustomRoundButton
                            onPress={() => _dcSn_kQpLxVnTaKs(true)}
                            btnImage={require('../../assets/orbizImages/yesIcon.png')}
                          />
                        </_vW_kQpLxVnTaKs>
                      )}
                    </_vW_kQpLxVnTaKs>

                    {_ts_mZtRmQpLxVa >= 1 && (
                      <_vW_kQpLxVnTaKs
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <_iMG_mZtRmQpLxVa
                          resizeMode="contain"
                          source={require('../../assets/orbizImages/timer.gif')}
                          style={{
                            width: 155,
                            height: 155,
                            marginTop: 30,
                            marginBottom: 30,
                          }}
                        />
                        {_pLF_kQpLxVnTaKs.OS === 'android' && (
                          <_tXT_mZtRmQpLxVa style={_st.s_timerText}>
                            {_ts_mZtRmQpLxVa}
                          </_tXT_mZtRmQpLxVa>
                        )}
                      </_vW_kQpLxVnTaKs>
                    )}
                  </>
                ) : (
                  <_tXT_mZtRmQpLxVa style={_st.s_helperText} />
                )}
              </_vW_kQpLxVnTaKs>

              <_vW_kQpLxVnTaKs
                style={{ flex: 1, justifyContent: 'flex-end', gap: 15 }}
              >
                {!_co_mZtRmQpLxVa && _md_mZtRmQpLxVa === 'Mystery Orb' && (
                  <CustomRoundButton
                    onPress={_spn_kQpLxVnTaKs}
                    width={53}
                    height={53}
                    btnImage={require('../../assets/orbizImages/orbizPlay.png')}
                    isDisabled={_sp_kQpLxVnTaKs || _tr_kQpLxVnTaKs}
                  />
                )}
                <CustomRoundButton
                  onPress={() => _nv_mZtRmQpLxVa.goBack()}
                  width={53}
                  height={53}
                  btnImage={require('../../assets/orbizImages/homeicon.png')}
                />
              </_vW_kQpLxVnTaKs>
            </_vW_kQpLxVnTaKs>
          )}

          {_ph_kQpLxVnTaKs === 'intermediate' && (
            <_RsCd_kQpLxVnTaKs title="Current Results" showTrophy={false} />
          )}

          {_ph_kQpLxVnTaKs === 'results' && (
            <_vW_kQpLxVnTaKs>
              <_RsCd_kQpLxVnTaKs title="Final Results" showTrophy={true} />
              {_wn_mZtRmQpLxVa && (
                <_iMG_mZtRmQpLxVa
                  source={require('../../assets/orbizImages/win.gif')}
                  style={{
                    width: 380,
                    height: 380,
                    position: 'absolute',
                    top: 50,
                    left: -20,
                  }}
                />
              )}
            </_vW_kQpLxVnTaKs>
          )}

          {_cf_kQpLxVnTaKs && (
            <_vW_kQpLxVnTaKs style={_st.s_confetti}>
              <_iMG_mZtRmQpLxVa
                source={require('../../assets/orbizImages/confetti.gif')}
                style={{ width: 380, height: 380 }}
              />
            </_vW_kQpLxVnTaKs>
          )}

          {_rv_kQpLxVnTaKs && _co_mZtRmQpLxVa && (
            <_vW_kQpLxVnTaKs style={_st.s_revealOverlay} pointerEvents="none">
              <_iMG_mZtRmQpLxVa
                source={_gOB_mZtRmQpLxVa[_co_mZtRmQpLxVa].img}
                style={_st.s_revealOrbImg}
              />
            </_vW_kQpLxVnTaKs>
          )}
        </_vW_kQpLxVnTaKs>
      </_sCV_mZtRmQpLxVa>
    </_iBG_kQpLxVnTaKs>
  );
}

const _st = _sSY_kQpLxVnTaKs.create({
  s_rootWrap: {
    alignItems: 'center',
    paddingTop: _pLF_kQpLxVnTaKs.OS === 'ios' ? 36 : 18,
    paddingBottom: 60,
  },
  s_startWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    flex: 1,
  },
  s_setupBoard: {
    width: 335,
    height: 409,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  s_orbizTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  s_orbizSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Sansation-Regular',
    fontStyle: 'italic',
    paddingHorizontal: 5,
  },
  s_orbLabel: {
    color: '#2B2B2B',
    fontSize: 20,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginTop: 12,
  },
  s_timerText: {
    color: '#f461beff',
    fontSize: 56,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'Sansation-Bold',
    zIndex: 120,
  },
  s_orbCol: { alignItems: 'center', marginTop: 90 },
  s_mainBoard: {
    width: 359,
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  s_centerArea: { width: '100%', alignItems: 'center' },
  s_questBoard: {
    width: 337,
    minHeight: 194,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  s_cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Sansation-Bold',
  },
  s_topBubble: { marginTop: 6, marginBottom: 6, alignItems: 'center' },
  s_playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 10,
    justifyContent: 'center',
  },
  s_playerLabel: {
    color: '#fff',
    width: 72,
    fontFamily: 'Sansation-Bold',
    fontSize: 14,
  },
  s_nameInput: {
    backgroundColor: '#D9D9D9',
    width: 150,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: _pLF_kQpLxVnTaKs.OS === 'ios' ? 5 : 2,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    fontSize: 15,
    fontFamily: 'Sansation-Bold',
    color: '#333333',
  },
  s_inputError: { borderColor: '#FF0707', borderWidth: 2 },
  s_settingRow: { width: '100%', alignItems: 'center', marginTop: 10 },
  s_settingLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    marginBottom: 3,
  },
  s_settingValue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Sansation-Bold',
    marginHorizontal: 12,
  },
  s_chevRow: { flexDirection: 'row', alignItems: 'center' },
  s_chevBtn: { padding: 8, borderRadius: 8 },
  s_playArea: { width: '100%', alignItems: 'center', paddingTop: 80, flex: 1 },
  s_playerTitle: {
    color: '#2B2B2B',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
    marginBottom: 18,
  },
  s_orbRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 18,
  },
  s_smallOrbWrap: { alignItems: 'center' },
  s_centerOrbWrap: { alignItems: 'center' },
  s_centerOrbImg: { width: 110, height: 110, resizeMode: 'contain' },
  s_taskArea: { marginTop: 18, width: '86%', alignItems: 'center' },
  s_taskText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
  },
  s_helperText: { color: '#bdbdbd', fontStyle: 'italic' },
  s_scoreRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  s_confetti: {
    position: 'absolute',
    top: '12%',
    alignSelf: 'center',
    zIndex: 1000,
  },
  s_revealOverlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2000,
  },
  s_revealOrbImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 180,
  },
});
