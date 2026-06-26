import React from 'react';
import * as S from '../AppStyle'; 

export const AboutPage: React.FC = () => {
  return (
    <S.InfoPageContainer>
      <h2>About Project</h2>
      <p>
        Pixema — Modern Movie Aggregator developed with React 19, TypeScript, and RTK Query.
      </p>
    </S.InfoPageContainer>
  );
};