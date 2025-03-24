import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/assets/lottie-files/animation-success.json';

const AnimationSuccess = ({open = true}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    open && <Lottie
        options={defaultOptions}
        height={260}
        width={260}
      />
  );
};

export default AnimationSuccess;
