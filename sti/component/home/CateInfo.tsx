// @ts-nocheck

import React from 'react';
import styled from '@emotion/styled';

interface Test { }

const CateInfo: Test = ({cate}) => {

  return (
    <cateInfoContainer>
      {cate}
    </cateInfoContainer>
  );
};


export default CateInfo