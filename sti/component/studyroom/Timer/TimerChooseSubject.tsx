// @ts-nocheck
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Button
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState, useRecoilValue } from 'recoil';
import { choosedSubjects, subjectTimes } from '../../../lib/recoil/timerState';
import styled from '@emotion/styled';

export default function TimerChooseSubjects() {
  const [choosedSbjs, setChoosedSbjs] = useRecoilState(choosedSubjects);

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const addSelectedSbjs = () => {
    const tmp = subjects.filter(inList);
    setChoosedSbjs(tmp);
  };

  function inList(value) {
    if (personName.includes(value.name)) {
      return value;
    }
  }
  const subjects = [
    { id: 0, name: '국어' },
    { id: 1, name: '수학' },
    { id: 2, name: '영어' },
    { id: 3, name: '한국사' },
    { id: 4, name: '탐구1' },
    { id: 5, name: '탐구2' },
    { id: 6, name: '외국어' }
  ];

  return (
    <SbjandBtn>
      <FormControl sx={{ m: 1, width: '222px' }}>
        <InputLabel id="demo-multiple-chip-label">과목</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {subjects.map((subject) => (
            <MenuItem
              key={subject.name}
              value={subject.name}
              style={getStyles(subject.name, personName, theme)}
            >
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Button
          variant="contained"
          color="secondary"
          sx={{ color: 'primary.light', mt: 1 }}
          onClick={() => {
            addSelectedSbjs();
          }}
        >
          시험보러 바로가기
        </Button>
      </div>
    </SbjandBtn>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const SbjandBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
