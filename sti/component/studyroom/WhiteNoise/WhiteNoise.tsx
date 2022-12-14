// @ts-nocheck
import { useRef, useEffect } from 'react';
import styled from 'styled-components';
// css
import widget from '../../../styles/Widget.module.css';
import noise from '../../../styles/Noise.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// recoil
import { useRecoilState } from 'recoil';
import { NoiseModalOpen } from '../../../lib/recoil/Modal';
import { noiseBEState } from '../../../lib/recoil/noise';
// component
import NoiseExam from './NoiseExam';
import NoiseItem from './NoiseItem';
import NoiseWaves from './NoiseWaves';
import NoiseFirePlace from './NoiseFirePlace';
//api
import { getNoise } from '../../../lib/api/noise';

interface Test {}

const WhiteNoise: Test = () => {
  const nodeRef = useRef(null);
  const [noiseOpen, setNoiseOpen] = useRecoilState(NoiseModalOpen);
  const [noises, setNoises] = useRecoilState(noiseBEState);
  useEffect(() => {
    getNoise().then((res) => {
      setNoises(res.data);
    });
  }, []);
  return (
    <>
      {noiseOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 350, y: 200 }}>
          <div ref={nodeRef} className={(widget.widget, noise.widget)}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/audio-waves.png`}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '5px'
                  }}
                ></img>
                <b>White Noises</b>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button
                  id={widget.widgetCloseBtn}
                  onClick={() => {
                    setNoiseOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div className={(widget.widgetContent, noise.WidgetContent)}>
              {noises.map((noise) => (
                <NoiseItem key={noise.noiseId} data={noise} />
              ))}
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

const NoiseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WhiteNoise;
