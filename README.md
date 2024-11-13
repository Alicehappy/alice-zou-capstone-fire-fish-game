The project is deployed here: https://gilded-gumption-2ec107.netlify.app/

## Run the project
Capstone frontend repo work together with Capstone backend repo:
https://github.com/Alicehappy/alice-zou-capstone-fire-fish-game-api
To run the project:

npm install

create .env file locally using the .env.sample file

npm run dev

# Project Title
**Fire Fish Game**

## Overview
The Fire Fish Game is a fun and interactive web-based educational game for children. It offers two game modes — a typing challenge and an animal selection game — designed to help kids learn typing skills and improve their knowledge of animals and creativiy.

### Problem Space

Toddlers having short attention span, often struggle with typing accuracy and speed, and many educational games are not engaging enough to keep them motivated.The Fire Fish Game provides an engaging way to practice typing, without overstimulating while also offering an interactive way to learn about animals.

### User Profile

The app is targeted at toddlers and young kids 24 months - 4 years, especially those looking to improve their typing skills or learn about animals. The user interface will be simple, colorful, and playful, designed to hold the attention of toddlers and young kids but without being overstimulating. Special considerations:
  
    • The app needs to be intuitive and visually engaging, at the same time without being overstimulating
    • Kid-friendly language and appealing animations are necessary to keep users engaged.
    • Provide a rewarding experience for completing tasks (e.g., scoring points).

### Features

    1.Home Page:
      •User enters their name.
      •User selects between two game modes: the Typing Game or the Animal Selection Game. 
    2.Typing Game:
      •Home page with a form to enter the user’s name.
      •Game page where fish swim across the screen with letters. The player types the correct letters, and the fish disappear.
      •A points system that awards 10 points for each correctly typed letter.
      •After all fish are gone, the player is taken to a Submit Score page.
      •A Scoreboard page displays the top scores.
    3.Save Score Page:
      •Allows users to save their score to the database and proceed to the scoreboard.
    4.Scoreboard Page:
     •Displays a list of the highest-scoring users limit to 10.
    5.Animal Selection Game Page:
     •A page with five dropdowns, each containing animals from a specific category (underwater, wild animals, birds, insects, farm animals).
     •The player selects one animal from each category, and the game displays the chosen animals.
     •Upon selecting animals (one to five based on screen sizes), then user can click create story button to navigate to story page
    6. Story page: where user could write a story based on the selected animal in the animal seleciton game page.


## Implementation

### Tech Stack

    1.Frontend:
      •React with react-router-dom for navigation.
      •Sass for styling, using BEM naming conventions.
      •GSAP for animations (moving fish and other interactive elements).
      •Particles for bubble particles animation effect
      •Responsive Layout
      •Reusable React components to manage form elements, dropdowns, using third-party library react-dropdown to provide better customization ability.
      •Styles organized with partials, including mixins, variables, and animations.
      •Axios for API requests
      •Fonts use modern, pretty, and well balanced Nunito
      •Use TypeScale to choose a well balanced Font size hierachy https://typescale.com/
    2.Backend:
      •Node.js with Express. OpenAI API for sentence generation
    3.Database: 
      •MySQL (for storing and retrieving user scores), Knex for database management.
    4.API: 
      •Custom backend API: To manage user scores and process animal selection for sentence generation.
  
### APIs

    •A backend API to handle score submissions 
    •APIs to handle generate default sentence for one, two and three animals in three categories
    •APIs to save the customized text input for one, two and three animals
    •APIs to save the customized text input for one, two and three animals
    •APIs to retrieve the list of customized text input for one, two and three animals


### Sitemap

    1.Home Page: Input field for user name and game selection options (Typing Game or Animal Selection Game).
    2.Typing Game Page: Fish with letters swim across the screen; users type letters to earn points.
    3.Submit Score Page: Allows the user to submit their score.
    4.Scoreboard Page: Displays top scores.
    5.Animal Selection Game Page: Dropdowns for selecting animals from various categories, image display, and sentence generation based on selected animals.

### Mockups

 •Mockups include six primary pages: Home, Typing Game, Submit Score, Scoreboard, Animal Selection Page, and Story page
 https://www.figma.com/design/iXW7FTQT38weJGkx0fce2V/Fire-Fish-Game?node-id=0-1&node-type=canvas&t=ADB4oIGkdrw9LbUt-0

### Data

    •users: id, name, score
    •scores: id, user_id, score
    •animals: id, name, category, image
    •stories: id, story_text, user_id
    •Data points will relate to users, scores for the typing game, and animal categories for the animal selection game.

### Sample of Endpoints

    1. POST /api/score: Submit the user’s score.
     •Request Body: { name: "userName", score: 100 }
     •Response: { success: true, message: "Score saved!" }
    2. GET /api/scoreboard: Fetch the top scores.
     •Response: [{ name: "userName", score: 100 }, ...]
    3. POST /api/stories: Save story of a user


## Roadmap

Summary of story points and their worth:

    * 1 point: ~ 30 minutes to complete
    * 2 points: ~ 1 hour to complete
    * 3 points: ~ half a workday to complete
    * 5 points: ~ whole workday to complete

Day 0 : Preparation the assets (5 points)

Day 1: Setup & Backend API Investigation (5 Points)

	•	Set up project environment (1 Point)
	•	Initialize the project using Vite for React, and GSAP for animations.
	•	Set up React Router for navigation across pages.
	•	Define the basic folder structure (components, pages, assets, fonts, styles/partials, etc.).
	•	Investigate OpenAI API (2 Points)
	•	Research the OpenAI npm library and how to integrate it into the backend.
	•	Define a basic function to send selected animals’ words from the frontend to the OpenAI API and get back a kid-friendly sentence.
	•	Setup Backend Endpoints (2 Points)
	•	Create the basic Express backend with necessary API endpoints for saving scores and generating sentences from OpenAI.

Day 2: Game Setup - Typing Game Logic (5 Points)

	•	Implement Home Page (2 Points)
	•	Create the input field for users to enter their names.
	•	Add options to select between the two games (typing game and animal selection game).
	•	Create Game Page for Typing Game (3 Points)
	•	Implement fish with letters using GSAP animations.
	•	Write logic for typing game where the user types letters, and fish disappear when correctly typed.
	•	Add scoring logic (10 points per correct letter).

Day 3: Game Flow & Backend Integration (5 Points)

	•	Finish Typing Game Logic (2 Points)
	•	Ensure that when all fish disappear, the game ends, and the user is redirected to the score submission page.
	•	Implement Backend Integration for Typing Game (3 Points)
	•	Set up database models for users and scores.
	•	Create API for saving scores.
	•	Connect the game page to the backend to save the score when the user submits it.

Day 4: Animal Selection Game (5 Points)

	•	Create Animal Selection Game Page (3 Points)
	•	Implement five dropdowns for selecting animals from each category (underwater, wild animals, birds, insects, farm animals).
	•	Show images of the selected animals on the page.
	•	Connect to Backend for Sentence Generation (2 Points)
	•	Integrate the OpenAI API on the backend to receive selected animal words.
	•	Display the generated sentence on the frontend.

Day 5: Scoreboard & Polish (5 Points)

	•	Implement Scoreboard Page (2 Points)
	•	Fetch and display the top scores from the database for the typing game.
	•	Polish & Bug Fixes (3 Points)
	•	Refine the UI with SCSS, ensure GSAP animations are smooth, and finalize game transitions.
	•	Ensure that all pages are working smoothly, handle any edge cases, and fix bugs.
	•	Write README with installation instructions and environment variables.

This roadmap follows a sprint-based approach with tasks broken down by point estimates, making it manageable to complete in 5 days. Each day has a clear focus, allowing time to investigate the OpenAI API and integrate it smoothly into the project.

---

## Future Implementations
	•	Implement Login and OAuth authorization functionality
	•	Extend the game to support multiplayer.
 	•	User can choose to save their customized text either private (only seen by user themselves) or public, which could be shared to be seen by other users
   	•	User can choose either only see their own inputs or include other users' inputs
  

   •Third party API: Open AI realted API for generating for animal-related content (e.g., kids friendly sentence from FrontEnd selections, optionally: facts, or images)
