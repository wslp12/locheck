/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function ProfileImg(props: {
  src: string;
  alt: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}) {
  const { src, alt, onClick } = props;
  return (
    <img
      onClick={onClick}
      src={src}
      alt={alt}
      style={{
        width: '90px',
        height: '90px',
        maxWidth: '100px',
        borderRadius: '55px',
      }}
    />
  );
}

export default ProfileImg;
