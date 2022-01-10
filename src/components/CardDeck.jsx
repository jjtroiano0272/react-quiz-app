import React, { useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from './common/carouselResponsivePoints.jsx';
import Card from './Card';
import Button from '@mui/material/Button';

export default function CardDeck({
  triviaData,
  setInGameLoop,
  setScore,
  score,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      showDots={false}
      keyBoardControl={true}
      customTransition='all .5'
      transitionDuration={500}
      containerClass='carousel-container'
      arrows={false}
      renderButtonGroupOutside={true}
      removeArrowOnDeviceType={['tablet', 'mobile']}
    >
      {triviaData.map((item, index) => (
        <div>
          <Card
            key={index}
            question={item.question}
            incorrect_answers={item.incorrect_answers}
            correct_answer={item.correct_answer}
            triviaData={triviaData}
            setInGameLoop={setInGameLoop}
            setScore={setScore}
            score={score}
            currentQuestion={currentQuestion}
          />
        </div>
      ))}
    </Carousel>
  );
}
