# Job-City Automated Job Application Platform

## Overview

![Job-City Logo](https://github.com/user-attachments/assets/28656587-1b8e-4794-94e0-719126f6f80a)
### Supported Platforms
| Platform | Type    | Status            |
|----------|---------|-------------------|
| Linkedin   | Public  | Complete          |
| Indeed   | Public | Under Development   |
| Naukari  | Public  | Under Development |
| company websites| public| under Devlopment|

**Job-City** is an open-source automated job application platform built with Next.js 14. It provides users with free interactive learning paths across various disciplines, such as aptitude reasoning, coding, AI research, and AI security. The project is structured with a `src` directory for better organization and is styled using Tailwind CSS for a modern look.

## Features

- **Dashboard**: Overview and navigation to different learning modules and job application functionalities.
- **Aptitude Reasoning**: Interactive problems with animated solutions to enhance problem-solving skills.
- **Examination**: Custom assessments with immediate feedback to help users track their progress.
- **Coding Modules**: Courses covering C, C++, Python, Java, and Golang with varying levels of difficulty, including tasks, hints, and auto-coding features to prepare for technical interviews.
- **AI Research**: Explore AI from basics to advanced levels, powered by LLaMA 3.1, with resources and materials.
- **AI Security**: Learn about AI security at different proficiency levels, emphasizing the importance of secure AI practices.
- **Automated Job Application**: Streamline the job application process with features that assist users in applying for jobs seamlessly.

## Tech Stack

- **Next.js 14**: React-based framework for building web applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: For animations and interactive UI components.
- **Monaco Editor**: The code editor that powers Visual Studio Code, for in-browser coding tasks.
- **LLaMA 3.1**: Integrated for AI-powered features.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/VishwamAI/jobcity
    ```

2. Navigate to the project directory:

    ```bash
    cd job-city
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

- **`npm test`**: Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- **`npm run build`**: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **`npm run eject`**: **Note: this is a one-way operation. Once you `eject`, you can’t go back!** If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own. You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
