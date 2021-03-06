import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Select from '@mui/material/Select';
import CardDeck from './CardDeck';
import categoryLegend from '../categoryLegend';

// TODO: Why the hell does setting it to an empty array cause it to function?
export default function Main(props) {
  const [triviaData, setTriviaData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inGameLoop, setInGameLoop] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Here we'll set numQuestions, difficulty,
  const [userPreferences, setUserPreferences] = useState({
    numQuestions: 10,
    difficulty: 'medium',
    category: 9, // Category 9 is for "All categories"
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
  }, [userPreferences, score]);

  // Checking user settings
  // useEffect(() => {
  //   const myVar = localStorage.getItem('userPreferences');
  //   setUserPreferences(myVar);
  // }, [userPreferences]);

  function handleReset() {
    setInGameLoop(false);
    setShowScore(false);
    setScore(0);
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function getValueByKey(object, key) {
    return Object.values(object).find(value => object[value] === key);
  }

  function renderGame() {
    // WELCOME SCREEN
    if (!inGameLoop && !showScore) {
      return (
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
            onClick={() => setInGameLoop(true)}
          >
            START
          </Button>
        </div>
      );
    }

    // PLAYING GAME
    if (inGameLoop && !showScore) {
      return (
        <>
          <CardDeck
            triviaData={triviaData}
            setInGameLoop={setInGameLoop}
            setScore={setScore}
            score={score}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
            showScore={showScore}
            setShowScore={setShowScore}
          />
          <Box textAlign='center'>
            <Button className='text-muted mt-2' onClick={() => handleReset()}>
              <SettingsOutlinedIcon />
            </Button>
          </Box>
        </>
      );
    }
    // SUMMARY/PLAY AGAIN
    if (!inGameLoop && showScore) {
      return (
        <>
          <Box textAlign='center'>
            <Button
              variant='contained'
              fullWidth
              className='mt-2'
              onClick={() => {
                setInGameLoop(true);
                setShowScore(false);
              }}
            >
              PLAY AGAIN
            </Button>
          </Box>
          <Box textAlign='center'>
            <Button className='text-muted mt-2' onClick={() => handleReset()}>
              CHANGE SETTINGS
            </Button>
          </Box>
        </>
      );
    }
  }

  return <div className='container pb-5'>{renderGame()}</div>;
}
