// @ts-nocheck

import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import Button from '@mui/material/Button';

interface Test {}

const SideBarClock: Test = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SideBarClockContainer>
      <div>
        <Link href={`/`}>
          <Button color="inherit">Home</Button>
        </Link>
      </div>
      <ClockContainer>
        <span>{time.toLocaleTimeString()}</span>
      </ClockContainer>
    </SideBarClockContainer>
  );
};

const SideBarClockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
`;

const ClockContainer = styled.div`
  width: 100px;
`;

export default SideBarClock;
