## Additions & Changes (+/~)

- [x] Trivia Databse to pull from
- [x] User gets to choose number of questions
- [x] Questions are presented one-at-a-time as swipable cards
- [x] MUI design
- [x] Setting user's settings
- [x] The card must advance NO MATTER which answer you pick (correct or incorrect)
- [x] Multipe choice questions are not randomized (10JAN22)
- [o] Allow user to select the category of questions, or multiple, or random, or all categories
- [x] Change game logic var names
- [x] Restructure game logic [12JAN2022]
- [ ] Print T/F questions in the order 'True, False'
- [ ] Add a summary screen once the 10 questions have been reached, with a "PLAY AGAIN" button. This will reset state and make takingQuiz to be false
- [ ] Keyboard-navigation support: numbers [1,4] select the answer you want
- [ ] Prettier JSX formatting
- [ ] Bootstrap sizing (it's too wide on >md screens)
- [ ] ~ Render the footer at the BOTTOM OF THE VIEWPORT ALWAYS
- [ ] Full scope of Dark/Light theme
- [ ] Select inputs sizing
- [ ] It currently counts both correct AND incorrect choices as adding +1 to the slide count
- [ ] Prevent previously shown/answered questions from showing up again (or atleast within a day)
- [ ] Use dangerouslysetInnerHTML on answer options
- [ ] As per the API (at least on free tier, you CANNOT make a call with multiple categories)
- [ ] Flip the card over to reveal the correct answer?
- [ ] Change favicon
- [ ] Interesting or wild/flashy :root background that shows up only if you scroll out of bounds of page

### UX

- [ ] Buttons on mobile should be a little bigger

## Parts that should be offloaded into a standablone component for tidy code!!!

- [ ]

### Bugs to fix

- [x] (07JAN22) Printing the data.question etc. properties ends up rendering the " char as &quot; and other ones too. Find a work around.
- [x] ButtonGroup settings as to programmatially advance slide (10JAN22)
- [x] (07JAN22) Display dots for number of questions and current placement at bottom of card
- [x] (07JAN22) Progress to next card of carousel once answer is selected (10JAN22)
- [x] <li> appearing as descendant of <li>
- [ ] Answer options don't convert special characters
- [ ] Fixing the unique key props
- [ ] (07JAN22) Button variant is changed to 'contained' once a choice is made, button is clicked on
- [ ] Some of prettier's formatting, like [JSX{} blocks]
- [ ] (10JAN22) A different randomization pattern...there might be bias towards placing the correct answer as the final option

## Sources/Thanks to

- [ ] https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
