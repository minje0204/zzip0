// @ts-nocheck

import React, { useState } from 'react';
import ThemeVidList from './ThemeVidList';
import styled from '@emotion/styled';
import home from '../../styles/Home.module.css';
interface Test {}

const ThemeSelect: Test = ({}) => {
  const themeNameList = [
    'christmas',
    'city',
    'beach',
    'cafe',
    'games',
    'library',
    'pets',
    'lofi'
  ];
  const [selectedTheme, setSelectedTheme] = useState('christmas');
  return (
    <div className={home.homecontainer}>
      <ThemeSelectBar>
        <ThemeTitle>Themes</ThemeTitle>
        {themeNameList.map((theme) => (
          <Theme
            onClick={() => {
              setSelectedTheme(theme);
            }}
          >
            {theme}
          </Theme>
        ))}
      </ThemeSelectBar>
      <ThemeVids>
        <ThemeVidList selectedTheme={selectedTheme} />
      </ThemeVids>
    </div>
  );
};

export default ThemeSelect;

const ThemeSelectBar = styled.div({
  background: '#F5F3F2',
  border: 'solid 1px black',
  display: 'flex',
  width: '1000px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'space-evenly'
});

const ThemeTitle = styled.div({
  fontSize: '25px'
});

const Theme = styled.button({
  background: '#F5F3F2',
  border: 'solid 1px black',
  width: '100px',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  width: '100px',
  height: '40px',
  alignItems: 'center',
  cursor: 'pointer'
});

const ThemeVids = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '10px 0px'
});
