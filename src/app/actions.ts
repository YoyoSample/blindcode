
"use server";

import { LANGUAGES } from '@/lib/challenges';
import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

export async function executeCode(code: string, language: string, input?: string): Promise<{ output: string, error?: string }> {
    const apiKey = process.env.JUDGE0_API_KEY;
    if (!apiKey) {
        console.error("Judge0 API key not found.");
        return { output: '', error: "Server configuration error: API key missing." };
    }

    const languageConfig = LANGUAGES.find(l => l.value === language);
    if (!languageConfig) {
        console.error(`Unsupported language: ${language}. Available languages:`, LANGUAGES.map(l => l.value));
        return { output: '', error: `Unsupported language: ${language}` };
    }

    try {
        const createSubmissionResponse = await axios.post(`${JUDGE0_API_URL}/submissions`, {
            source_code: code,
            language_id: languageConfig.id,
            stdin: input || '',
        }, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });

        const submissionToken = createSubmissionResponse.data.token;

        // Poll for result
        let submissionResult;
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling
            
            const getSubmissionResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${submissionToken}`, {
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            });

            submissionResult = getSubmissionResponse.data;
            // 1=In Queue, 2=Processing. Stop polling when status is something else.
            if (submissionResult.status.id > 2) { 
                break;
            }
        }
        
        const stdout = submissionResult.stdout || '';
        const stderr = submissionResult.stderr;
        const compile_output = submissionResult.compile_output;
        
        // The output from Judge0 is returned as-is to the client.
        // The client will handle any necessary normalization for comparison.
        if (stdout) {
            return { output: stdout };
        } else if (stderr) {
            return { output: '', error: stderr };
        } else if (compile_output) {
            return { output: '', error: `Compilation Error:\n${compile_output}` };
        } else {
             return { output: submissionResult.status.description };
        }

    } catch (error: any) {
        console.error("Error executing code via Judge0:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred while running your code.";
        return { output: '', error: errorMessage };
    }
}
