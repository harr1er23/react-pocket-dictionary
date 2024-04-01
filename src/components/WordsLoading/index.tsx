import React from "react";

import ContentLoader from "react-content-loader";

type WordsLoadingProps = {
  length: number;
};

const WordsLoading: React.FC<WordsLoadingProps> = ({ length }) => {
  return length ? (
    <>
      {[...Array(length)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width={310}
          height={170}
          viewBox="0 0 310 170"
          backgroundColor="#dedede"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="300" height="150" />
        </ContentLoader>
      ))}
    </>
  ) : (
    <></>
  );
};

export default WordsLoading;
