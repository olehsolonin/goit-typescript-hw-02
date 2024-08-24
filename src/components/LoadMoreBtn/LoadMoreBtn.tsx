import React from 'react';

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
  return <button onClick={handleLoadMore}>Load more</button>;
};

export default LoadMoreBtn;
