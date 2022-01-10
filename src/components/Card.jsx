import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';

export default function Card({
  id = nanoid(),
  triviaData,
  question,
  incorrect_answers,
  correct_answer,
  setInGameLoop,
  setScore,
  score,
  currentQuestion,
  setCurrentQuestion,
}) {
  const choices = incorrect_answers.concat(correct_answer);

  useEffect(() => {}, [currentQuestion]);

  function handleAnswerButtonClick(selectedAnswer) {
    console.log(
      `selectedAnswer: ${selectedAnswer}\ncorrect_answer: ${correct_answer}`
    );
    selectedAnswer === correct_answer
      ? setScore(score + 1)
      : console.log('incorrect answer');

    // console.log(carouselRef);
    // carouselRef.next();
    currentQuestion + 1 < triviaData.length
      ? setCurrentQuestion(currentQuestion + 1)
      : setInGameLoop(false);

    setCurrentQuestion(currentQuestion + 1);
  }

  function shuffleChoices(arr1, arr2) {
    const allChoices = arr1.concat(arr2);

    return allChoices.sort((a, b) => 0.5 - Math.random());
  }

  return (
    <div className='card bg-light text-dark mb-3 my-5 mx-4'>
      {/* <div className='card-badge bg-light text-dark'>{badgeText}</div> */}

      {/* FIXME:  */}
      <div className='card-body'>
        <h5
          className='card-title d-flex mb-4'
          dangerouslySetInnerHTML={{ __html: question }}
        />

        <Stack spacing={2} direction='column'>
          {/* If selected, variant is 'contained' */}

          {shuffleChoices(incorrect_answers, correct_answer).map(
            (choice, index) => (
              <Button
                variant={'outlined'}
                onClick={() => handleAnswerButtonClick(choice)}
                key={index}
              >
                {choice}
              </Button>
            )
          )}
        </Stack>
      </div>
    </div>
    // </li>
  );
}
