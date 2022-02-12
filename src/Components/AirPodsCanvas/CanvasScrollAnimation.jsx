import { useEffect, useRef } from 'react';
import './Styles/CanvasScrollAnimation.css';

const img = new Image();

export const CanvasScrollAnimation = ({ width, height, frameCount, link }) => {
  const scrollHandler = (context) => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1, context));
  };

  const updateImage = (index, context) => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  };

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  
  const currentFrame = index =>
    `${link}${index.toString().padStart(4, '0')}.jpg`;

  const canvasRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    window.addEventListener('scroll', () => scrollHandler(context));
    img.src = currentFrame(1);
    canvasRef.current.width = 1158;
    canvasRef.current.height = 770;
    img.onload = () => context.drawImage(img, 0, 0);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  preloadImages();
  return <canvas ref={canvasRef} width={width} height={height} />;
};

CanvasScrollAnimation.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};
