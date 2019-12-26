# Angular Firebase
 Rocket League Tracker built with Angular & Firebase


## Features

- Daily Rankings
  - Lets Users choose a "Best Player of the Day (anonymously)"
  - Display Rankings form the last x Amount of Days

- Monthly Best Player

- Sign Up to Play
  - By Clicking "sign up for today" you can register yourself to be a Player for the day


## Future Plan

- Language Service
  - Multi Language Dropdown in Navbar
  - Translation Service with ngx-translate
    - Pipe
    - Directive
    - Key

- Navbar
  - Implement Icons for different Routes
  - Implement Score-Display
  - Translation Dropdown

- Ranking
  - Implement Voting ability to fullest
  - Implement Pagination (Fix Firebase Date Query, Firebase-Bug?)
  - Implement Scheduled Function to Create a Ranking for each Day
  - Implement 2 Views (Switch) from MVP (Most valuable Player) to LVP (Least valuable Player)

- Ranking of the Month
  - Implement Charts for MVP and Tomatoe of the Month

- Profile
  - Implement Ability to change Information and set Profile-Picture
  - Implement Format Validation for Dates
  - Implement German Format

- Registration
  - Remove Age and Add Birthday (optional)


## Bugfix
- Icons Thumbs-Up/Thumbs-Down are not correctly disabled after sucessful voting.
- Date format-errors can cause bad UX
