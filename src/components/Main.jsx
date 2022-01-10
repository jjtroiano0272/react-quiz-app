import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardDeck from './CardDeck';
import categoryLegend from '../categoryLegend';

export default function Main(props) {
  // TODO: Why the hell does setting it to an empty array cause it to function?
  const [triviaData, setTriviaData] = useState([]);
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Here we'll set numQuestions, difficulty,
  const [userPreferences, setUserPreferences] = useState({
    numQuestions: 10,
    difficulty: 'medium',
    // URL: &category= [9, 32]
    // You'll get this response and spit it back to the user
    // If there is no category selected, nothing is appended to the URL
    category: 9,
  });
  const { numQuestions, category, difficulty } = userPreferences;

  // TODO: After loop, store userPreferences in localstorage and just re-read it, with an option to change this at the top.
  const apiEndpoint = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}`;

  useEffect(() => {
    async function getData() {
      await axios
        .get(apiEndpoint)
        .then(response => setTriviaData(response.data.results))
        .catch(err => alert('Whoa! Something done goofed! ', err));
    }

    getData();

    const myVar = localStorage.getItem('userPreferences');
    // setUserPreferences(myVar);
    console.log(
      `Number of questions selected: ${userPreferences.numQuestions}\nDifficulty: ${userPreferences.difficulty}`
    );
  }, [userPreferences, score]);

  // Checking user settings
  // useEffect(() => {
  //   const myVar = localStorage.getItem('userPreferences');
  //   setUserPreferences(myVar);
  // }, [userPreferences]);

  async function renderChoices(data) {
    const numChoices =
      data.correct_answer.length + data.incorrect_answers.length;

    return (
      // Filter the keys by 'correct_answer' and 'incorrect_answers' to return one array with the choices back
      // const result = words.filter(word => word.length > 6);

      <div></div>
    );
  }

  const handleChangePreferences = (event, item) => {
    // setUserPreferences({
    //   numQuestions: event.target.value,
    //   difficulty: event.target.value,
    // });
    // setUserPreferences({ numQuestions: event.target.value });
  };

  console.log(triviaData);
  console.log(categoryLegend);

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function getValueByKey(object, key) {
    return Object.values(object).find(value => object[value] === key);
  }

  return (
    <div className='container'>
      {/* Welcome screen */}
      {!takingQuiz ? (
        <div>
          {/* Dropdown menu */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id='demo-simple-select-label'>
              Number of Questions
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Number of Questions'
              value={userPreferences.numQuestions}
              onChange={e =>
                setUserPreferences({
                  ...userPreferences,
                  numQuestions: e.target.value,
                })
              }
            >
              {[...Array(7).keys()].slice(1).map((num, index) => (
                <MenuItem value={num * 5} key={index}>
                  {num * 5}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Selecting Difficulty */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id='select-label-difficulty'>Difficulty</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Difficulty'
              value={userPreferences.difficulty}
              onChange={e =>
                setUserPreferences({
                  ...userPreferences,
                  difficulty: e.target.value,
                })
              }
            >
              {['Easy', 'Medium', 'Hard'].map((choice, index) => (
                <MenuItem value={choice.toLowerCase()} key={index}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Selecting Category */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id='select-label-difficulty'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Category'
              value={userPreferences.category}
              onChange={e =>
                setUserPreferences({
                  ...userPreferences,
                  category: e.target.value,
                })
              }
            >
              {/* value is the actual data passed to the API call.
                    We need to get the KEY for the VALUE */}
              {/* Object.keys(object).find(key => object[key] === value) */}
              {/* KEY: category */}
              {/* VALUE: Object.values(Categ) */}
              {Object.values(categoryLegend).map((category, index) => (
                <MenuItem
                  value={getKeyByValue(categoryLegend, category)}
                  key={index}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            style={{ marginTop: '5rem' }}
            variant='contained'
            size='large'
            fullWidth
            onClick={() => setTakingQuiz(true)}
          >
            START
          </Button>
        </div>
      ) : (
        // Play the actual game
        <div>
          <CardDeck
            data={triviaData}
            setTakingQuiz={setTakingQuiz}
            setScore={setScore}
          />
          <Box textAlign='center'>
            <Button
              className='text-muted mt-2'
              onClick={() => setTakingQuiz(false)}
            >
              RESET
            </Button>
          </Box>
        </div>
      )}

      {/* TODO: probably offload this */}
      {/* TODO: Might need a toggleSelect prop */}
      {/* TODO: Also might want to just offload this all into a renderSelections function */}
    </div>
  );
}
