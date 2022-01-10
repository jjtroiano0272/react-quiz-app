import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';

export default function Card({
  id = nanoid(),
  question,
  incorrect_answers,
  correct_answer,
  data,
  setTakingQuiz,
  setScore,
}) {
  const choices = incorrect_answers.concat(correct_answer);
  const [userData, setUserData] = useState({
    numQuestions: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {}, [currentQuestion]);

  function handleAnswerButtonClick(answerOption) {
    // on click, advance slide
    answerOption === correct_answer
      ? setScore(prevScore => prevScore + 1)
      : console.log('incorrect answer');

    // console.log(carouselRef);
    // carouselRef.next();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setTakingQuiz(false);
    }
  }

  function randomizeChoices(items) {
    return items.sort(item =>
      item.type === 'multiple' ? Math.random - 0.5 : item
    );
    // Except if T/F, print in the order of T/F
    // .filter((item) => item.type === 'multiple')
  }

  return (
    // <li
    //   data-target='#carouselExampleIndicators'
    //   data-slide-to={id}
    //   // className={id === 1 && 'active'}
    // >
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

          {randomizeChoices(choices).map((answerOption, index, elements) => (
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
