# Pokedex


A modern Pokedex application built with Next.js, React, and Tailwind CSS. It allows users to browse, search, and view detailed information about Pokémon, leveraging the public [PokeAPI](https://pokeapi.co/) for data.

## Features

*   **Infinite Scrolling:** Seamlessly browse through the entire list of Pokémon.
*   **Search Functionality:** Quickly find Pokémon by name with a real-time search bar.
*   **Type Filtering:** Filter the Pokémon list by their specific type (e.g., Fire, Water, Grass).
*   **Detailed View:** Click on any Pokémon to open a detailed modal with information on its stats, abilities, physical attributes, and types.
*   **Favorites System:** Mark your favorite Pokémon. Your selections are saved locally in your browser.
*   **Responsive Design:** A clean and modern UI that works beautifully across all devices, from desktops to mobile phones.
*   **Loading & Error States:** User-friendly loading skeletons and error messages for a smooth experience.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 16
*   **UI Library:** [React](https://react.dev/) 19
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4
*   **Data Fetching:** [Axios](https://axios-http.com/)
*   **API:** [PokeAPI](https://pokeapi.co/api/v2)

## Getting Started

To run this project locally, follow these steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm/bun) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rajdips834/pokedex-deepsolv.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd pokedex-deepsolv
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

*   `app/`: Main application directory containing the layout and pages.
*   `components/`: Contains all the reusable React components, such as `PokeCard`, `SearchBar`, and the detailed view components.
*   `api.js`: Handles all the logic for fetching and processing data from the PokeAPI.
*   `public/`: Stores static assets.
*   `types/`: TypeScript type definitions for the project.
*   `utils/`: Utility functions and helper scripts.
