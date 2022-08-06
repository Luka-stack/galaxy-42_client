import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline';

import { ALL_PLANETS, Planet } from '../lib/graphql/planets';
import { Card } from './card';

interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
  visibleSlides: number;
}

const PrevArrow = ({ currentSlide, onClick }: CustomArrowProps) => {
  if (!currentSlide || currentSlide < 1) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="absolute -translate-y-1/2 -left-10 top-1/2"
    >
      <ArrowCircleLeftIcon className="w-12 transition-opacity duration-500 ease-out opacity-0 cursor-pointer group-hover:opacity-100 text-gx-purple-500 hover:scale-110" />
    </div>
  );
};

const NextArrow = ({
  currentSlide,
  visibleSlides,
  slideCount,
  onClick,
}: CustomArrowProps) => {
  if (currentSlide && currentSlide + visibleSlides === slideCount) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="absolute -translate-y-1/2 -right-10 top-1/2"
    >
      <ArrowCircleRightIcon className="w-12 transition-opacity duration-500 ease-out opacity-0 cursor-pointer group-hover:opacity-100 text-gx-purple-500 hover:scale-110" />
    </div>
  );
};

export const LatestPlanets = () => {
  const { loading, data } = useQuery(ALL_PLANETS);

  const [slidesNum, setSlideNum] = useState(1);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow visibleSlides={slidesNum} />,
    nextArrow: <NextArrow visibleSlides={slidesNum} />,
  };

  useEffect(() => {
    const resize = () => {
      if (window.outerWidth >= 1770) {
        setSlideNum(4);
      } else if (window.outerWidth >= 1280) {
        setSlideNum(3);
      } else if (window.outerWidth >= 1024) {
        setSlideNum(2);
      } else {
        setSlideNum(1);
      }
    };

    resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <Slider
        {...settings}
        className="grid w-11/12 grid-flow-col py-2 group auto-cols-max"
        slidesToShow={slidesNum}
      >
        {data.planets.map((planet: Planet, index: number) => (
          <Card planet={planet} index={index} key={planet.uuid} />
        ))}
      </Slider>
    </div>
  );
};
