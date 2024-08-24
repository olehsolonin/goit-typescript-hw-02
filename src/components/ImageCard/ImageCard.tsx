import React from 'react';

interface ImageCardProps {
  imgUrl: string;
  imgAlt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imgUrl, imgAlt }) => {
  return (
    <div>
      <img src={imgUrl} alt={imgAlt} />
    </div>
  );
};

export default ImageCard;
