# Blind Coding Challenge Platform

A Next.js-based web application for conducting blind coding challenges, where participants solve programming problems without seeing their code in real-time. The platform tracks performance and allows users to download their results.

## Features

- **User Registration**: Collects participant details (name, registration number, phone number) for tracking.
- **Coding Challenges**: Predefined set of 11 Python programming challenges with varying difficulty and time limits.
- **Code Editor**: Integrated Monaco Editor for writing Python code.
- **Code Execution**: Real-time code execution using Judge0 API for accurate testing.
- **Timer System**: Each challenge has a countdown timer; code is revealed after time expires.
- **Performance Tracking**: Tracks success, attempts, language used, and bonus points for first-attempt successes.
- **Results Page**: Displays challenge results in a table format with options to download as an image.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.
- **Video Backgrounds**: Engaging video backgrounds for different sections of the app.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Code Execution**: Judge0 API
- **State Management**: React hooks, localStorage for persistence
- **Build Tools**: Turbopack for development

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Judge0 API key (from RapidAPI)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nextn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   JUDGE0_API_KEY=your_judge0_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:9002`.

## Usage

1. **Registration**: Enter your name, registration number, and phone number to start.
2. **Challenges**: Solve each coding challenge within the given time limit. Write Python code and submit for execution.
3. **Execution**: Code is executed remotely via Judge0 API. Results are displayed in the console.
4. **Progression**: Move to the next challenge after submission or skip if needed.
5. **Results**: View your performance summary and download it as an image.



## Environment Variables

- `JUDGE0_API_KEY`: Required for code execution. Obtain from RapidAPI Judge0 service.

## Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript type checking

## Challenges

The platform includes 11 predefined challenges:

1. Sum of Two Numbers
2. Find Maximum Number
3. String Reversal
4. Check for Palindrome
5. Factorial of a Number
6. Count Vowels
7. Check for Prime Number
8. Fibonacci Number
9. FizzBuzz
10. Sum of Array Elements
11. Interactive Sum Calculator

Each challenge has a description, expected output, sample output, and time limit.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request



## Acknowledgments

- Judge0 for code execution API
- Next.js and React communities for excellent frameworks
