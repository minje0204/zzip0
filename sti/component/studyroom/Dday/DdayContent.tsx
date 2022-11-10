// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

//api
import { getDday, delDday } from '../../../lib/api/dday';

import { useRecoilState } from 'recoil';
import { DdayUpdate } from '../../../lib/recoil/dday';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Test {}

const DdayContent: Test = () => {
  const [ddayInfo, setDdayInfo] = useState([]);
  const [updateDday, setUpdateDday] = useRecoilState(DdayUpdate);
  const DeleteDday = (id) => {
    const data = {
      ddayId: id
    };
    if (confirm('삭제하시겠습니까?') === true) {
      delDday(data).then((res) => {});
      setUpdateDday(!updateDday);
    }
  };
  useEffect(() => {
    getDday().then((res) => {
      setDdayInfo(res.data);
    });
  }, [updateDday]);

  return (
    <>
      <table>
        {ddayInfo.map((dday) => (
          <DdayContentContainer key={dday.ddayId}>
            <td style={{ width: '30%' }}>
              {dday.ddayLeft <= 0 ? (
                <div id="ddayLeft">D+{dday.ddayLeft * -1}</div>
              ) : (
                <div id="ddayLeft">D{dday.ddayLeft * -1}</div>
              )}
            </td>
            <td style={{ width: '60%' }}>
              <div id="ddayTitle">{dday.ddayTitle}</div>
              <div>{dday.ddayDate}</div>
            </td>
            <td style={{ width: '10%' }}>
              <DdayDeleteBtn
                onClick={() => {
                  DeleteDday(dday.ddayId);
                  setUpdateDday(!updateDday);
                }}
              >
                <HighlightOffIcon />
              </DdayDeleteBtn>
            </td>
          </DdayContentContainer>
        ))}
      </table>
    </>
  );
};

export default DdayContent;

const DdayContentContainer = styled.tr`
  height: 80px;
  #ddayLeft {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 5px;
  }
  #ddayTitle {
    font-size: 18px;
    font-weight: bold;
  }
`;
const DdayDeleteBtn = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;
