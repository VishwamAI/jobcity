# Job-City Automated Job Application Platform

## Overview
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FVishwamAI%2Fjobcity&countColor=%23ff8a65)
### Supported Platforms
| Platform | Type    | Status            |
|----------|---------|-------------------|
| Linkedin   | Public  | Complete          |
| Indeed   | Public | Under Development   |
| Naukari  | Public  | Under Development |
| company websites| public| under Devlopment|

**Job-City** is an open-source automated job application platform built with React 18.3.1. It provides users with free interactive learning paths across various disciplines, such as aptitude reasoning, coding, AI research, and AI security. The project is structured with a modern component-based architecture and is styled using a combination of Chakra UI and Tailwind CSS for a polished, responsive design.

## Features

- **Dashboard**: Overview and navigation to different learning modules and job application functionalities.
- **Aptitude Reasoning**: Interactive problems with animated solutions to enhance problem-solving skills.
- **Examination**: Custom assessments with immediate feedback to help users track their progress.
- **Coding Modules**: Courses covering C, C++, Python, Java, and Golang with varying levels of difficulty, including tasks, hints, and auto-coding features to prepare for technical interviews.
- **AI Research**: Explore AI from basics to advanced levels, powered by LLaMA 3.1, with resources and materials.
- **AI Security**: Learn about AI security at different proficiency levels, emphasizing the importance of secure AI practices.
- **Automated Job Application**: Streamline the job application process with features that assist users in applying for jobs seamlessly.

## Tech Stack

- **React 18.3.1**: Modern JavaScript library for building user interfaces
- **TypeScript**: For type-safe development and better developer experience
- **Chakra UI**: Component library for building accessible and responsive UIs
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: For animations and interactive UI components
- **React Router**: For client-side routing and navigation
- **React Icons**: For comprehensive icon set integration

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/VishwamAI/jobcity
    ```

2. Navigate to the project directory:

    ```bash
    cd jobcity/frontend
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

4. Run the development server:

    ```bash
    pnpm start
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components and routes
│   ├── hooks/         # Custom React hooks
│   ├── config/        # Configuration files
│   ├── types/         # TypeScript type definitions
│   ├── theme.ts       # Theme configuration
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

The project follows a modular architecture with clear separation of concerns:
- `components/`: Houses reusable UI components
- `pages/`: Contains route-specific page components
- `hooks/`: Custom React hooks for shared logic
- `config/`: Configuration files for navigation and settings
- `types/`: TypeScript interfaces and type definitions
- `theme.ts`: Chakra UI theme customization

### Available Scripts

In the project directory, you can run:

- **`pnpm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

- **`pnpm test`**: Launches the test runner in the interactive watch mode using react-app-rewired. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- **`pnpm build`**: Builds the app for production to the `build` folder using react-app-rewired. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **`pnpm lint`**: Runs ESLint to check for code style issues in the src directory.

- **`pnpm type-check`**: Runs TypeScript compiler to check for type issues without emitting files.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

Add your changes or updates to the changelog. For example, document the changes made, any features added, or bugs fixed. 

- Added changelog management for more structured updates.
- Implemented a new FAQ section for better user guidance.


## Special Thanks

- **Feder-cr Team**: For their foundational work on the Auto Jobs Applier AIHawk project, which inspired key functionalities in Job-City.
- **Hacktoberfest Contributors**: For their participation and contributions that enhance the project.
- **Cognition Team of Devin AI**: For their collaboration and support throughout the development process.
- **OpenAI && Antropic && v0.dev**: For improving mechanisms we are improve our self with our models and developments 

## License

**Job-City** is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Learn More

- [React Documentation](https://reactjs.org/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
