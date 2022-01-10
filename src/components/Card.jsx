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
  showScore,
  setShowScore,
}) {
  const choices = incorrect_answers.concat(correct_answer);

  useEffect(() => {}, [currentQuestion]);

  function handleAnswerButtonClick(selectedAnswer) {
    selectedAnswer === triviaData[currentQuestion].correct_answer
      ? setScore(score + 1)
      : alert(
          `Sorry! The correct answer was ${triviaData[currentQuestion].correct_answer}! Try again.`
        );

    if (currentQuestion + 1 < triviaData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setInGameLoop(false);
      setShowScore(true);
    }

    setCurrentQuestion(currentQuestion + 1);
  }

  function shuffleChoices(arr1, arr2) {
    const allChoices = arr1.concat(arr2);

    return allChoices.sort((a, b) => 0.5 - Math.random());
  }

  return (
    <div className='card bg-light text-dark mb-3 my-5 mx-4'>
      <div className='card-body'>
        <h5
          className='card-title d-flex mb-4'
          dangerouslySetInnerHTML={{
            __html: triviaData[currentQuestion].question,
          }}
        />

        <Stack spacing={2} direction='column'>
          {/* If selected, variant is 'contained' */}
          {/*  */}
          {/* {shuffleChoices(incorrect_answers, correct_answer).map(
            (choice, index) => (
              <Button
                variant={'outlined'}
                onClick={() => handleAnswerButtonClick(choice)}
                key={index}
              >
                {choice}
              </Button>
            )
          )} */}
          {triviaData[currentQuestion].incorrect_answers
            .concat(triviaData[currentQuestion].correct_answer)
            .sort((a, b) => 0.5 - Math.random())
            .map((answerOption, index) => (
              <Button
                variant={'outlined'}
                onClick={() => handleAnswerButtonClick(answerOption)}
                key={index}
              >
                {answerOption}
              </Button>
            ))}
        </Stack>
      </div>
    </div>
    // </li>
  );
}
