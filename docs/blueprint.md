# **App Name**: Code Blackout

## Core Features:

- Question Display: Displays coding questions, including the title and necessary details for the challenge.
- Language Selection: Allows users to select their preferred programming language from a dropdown menu (C, Java, Python).
- Blind Mode Activation: Enables 'blind mode' by obscuring the text editor, simulating a real blind coding challenge where users cannot see what they type. Toggle based on timer.
- Simulated Code Execution: Mimics code execution by parsing print statements (printf, System.out.println) via regex and displaying a simulated output in a console section.
- Dynamic Timer: A countdown timer that activates upon clicking the 'Start' button, with different durations based on the selected question. Automatically reveals the editor content once the timer reaches zero.
- Start/Submit Controls: Start button to initiate the coding session, a submit button to process and display simulated output in the console, and a reset button to enable a user to repeat a challenge.
- Score Tracking: Keep track of performance in challenges. LLM will be used as a tool to summarize which coding tasks are causing difficulty for a user.
- Challenge Progression: Lets users complete multiple questions in a session, with a progress bar and unlocks the next challenge after submitting the previous one. Stores progress in localStorage.

## Style Guidelines:

- Background color: Dark charcoal (#333333) to reduce eye strain during long coding sessions.
- Primary color: Electric purple (#BE79DF) to convey the avant-garde spirit of coding; this contrasts with the dark background.
- Accent color: Soft lavender (#D0B4DE), an analogous color to electric purple, but desaturated; used on hover or active states to give life.
- Body and headline font: 'Inter', a sans-serif typeface that maintains simplicity and readability for both headlines and main content. This creates an easy-to-read environment on a darker surface,.
- Code font: 'Source Code Pro' for the code editor, providing clear distinction between characters for better readability.
- Split-screen layout to accommodate the question panel and code editor side by side, ensuring efficient use of screen real estate.
- Subtle fade-in and fade-out effects for the blind mode toggle and when transitioning between editor states (disabled/enabled).