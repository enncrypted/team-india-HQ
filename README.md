# Team India Fan HQ

An unofficial, fan-made supporters hub for Team India. This project is a front-end web application showcasing squad profiles, countdowns to upcoming fixtures, an interactive Fan Zone (polls and quizzes), and a fan membership card generator.

## Codebase Overview

The project is built using vanilla web technologies without a heavy framework, ensuring fast load times and straightforward customization:

- **`index.html`**: The main structure of the application, featuring semantic HTML sections for the Hero, Squad, Trophies, Fan Zone, and Membership forms.
- **`styles.css`**: Contains all styling, including a responsive grid layout, typography (Google Fonts), custom color palettes, animations, and micro-interactions (like 3D card flips).
- **`app.js`**: Handles all the client-side interactivity:
  - **Countdown Timer:** Updates the hero section countdown dynamically.
  - **Squad Data & Filtering:** Renders player cards from an array of objects and allows filtering by roles (Batter, Bowler, All-Rounder, Wicketkeeper).
  - **Fan Zone:** Manages the logic for polls and interactive quizzes, updating the UI based on user selections.
  - **Membership System:** Uses `localStorage` to save user details and generate a custom fan card directly in the browser.

## Usability

To use this project, simply download or clone the repository and open `index.html` in any modern web browser. No local development server or build step (like npm or webpack) is required, making it incredibly accessible for immediate viewing or modification.

## Future Backend Integrations

While the current application relies entirely on frontend technologies and browser storage, it is structured to easily integrate with a backend in the future. Potential enhancements include:

1. **Live Data Fetching:** Connecting to a sports API to fetch real-time match scores, live fixture countdowns, and up-to-date player statistics rather than relying on hardcoded data in `app.js`.
2. **User Authentication & Profiles:** Replacing `localStorage` with a proper authentication system (e.g., Firebase, Auth0, or a Node/Express backend) so users can log in across different devices and persist their membership details.
3. **Database Integration:** Storing Fan Zone poll votes and quiz scores in a database (like MongoDB or PostgreSQL) to display global, real-time poll results and user leaderboards.
4. **Dynamic News Feed:** Pulling the latest news headlines or social media updates directly into the ticker via RSS feeds or social media APIs.
