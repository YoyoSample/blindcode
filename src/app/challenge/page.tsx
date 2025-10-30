
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { challenges, type Challenge, type ChallengeResult, type Language } from '@/lib/challenges';
import ChallengePanel from '@/components/ChallengePanel';
import EditorPanel from '@/components/EditorPanel';
import { useToast } from '@/hooks/use-toast';
import { executeCode } from '@/app/actions';

export default function ChallengePage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeResults, setChallengeResults] = useState<ChallengeResult[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const regNum = localStorage.getItem('registrationNumber');
    if (!regNum) {
      router.push('/');
      return;
    }

    try {
      const savedIndex = localStorage.getItem('currentChallengeIndex');
      const savedResults = localStorage.getItem('challengeResults');
      if (savedIndex) {
        const parsedIndex = JSON.parse(savedIndex);
        if(parsedIndex < challenges.length) {
          setCurrentChallengeIndex(parsedIndex);
        }
      }
      if (savedResults) {
        setChallengeResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, [router]);

  useEffect(() => {
    if(isClient) {
      localStorage.setItem('currentChallengeIndex', JSON.stringify(currentChallengeIndex));
    }
  }, [currentChallengeIndex, isClient]);
  
  useEffect(() => {
    if(isClient) {
      localStorage.setItem('challengeResults', JSON.stringify(challengeResults));
    }
  }, [challengeResults, isClient]);

  const currentChallenge: Challenge = challenges[currentChallengeIndex];

  const handleChallengeSubmit = async (code: string, language: Language) => {
    const result = await executeCode(code, language, currentChallenge.input);
    
    let submissionOutput = '';
    if (result.error) {
      submissionOutput = `Error:\n${result.error}`;
    } else {
      submissionOutput = result.output;
    }
    
    // Normalize the output by removing a single trailing newline, which Judge0 often adds.
    // This makes the comparison robust against this common API artifact.
    const finalOutput = submissionOutput.replace(/\n$/, '');
    const isSuccess = finalOutput === currentChallenge.expectedOutput;


    setChallengeResults(prevResults => {
      const existingEntryIndex = prevResults.findIndex(r => r.challengeName === currentChallenge.title);
      if (existingEntryIndex > -1) {
        const updatedResults = [...prevResults];
        const existingEntry = updatedResults[existingEntryIndex];
        
        // Only increment attempts if it's not already successful
        if (!existingEntry.success) {
            existingEntry.attempts += 1;
        }
        
        existingEntry.success = existingEntry.success || isSuccess;
        existingEntry.language = language;
        // Don't award bonus on subsequent successful attempts
        return updatedResults;
      } else {
        // First attempt for this challenge
        return [
          ...prevResults,
          {
            challengeName: currentChallenge.title,
            success: isSuccess,
            attempts: 1,
            language: language,
            bonus: isSuccess, // Award bonus if successful on the first attempt
          }
        ];
      }
    });

    return { simulatedOutput: submissionOutput, isSuccess };
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      router.push('/results');
    }
  };
  
  const handleChallengeSelect = (index: string) => {
    setCurrentChallengeIndex(parseInt(index, 10));
  };

  const handleSkipChallenge = () => {
    setChallengeResults(prevResults => {
      const existingEntryIndex = prevResults.findIndex(r => r.challengeName === currentChallenge.title);
      // Only add a new failed result if it doesn't exist yet
      if (existingEntryIndex === -1) {
        return [
          ...prevResults,
          {
            challengeName: currentChallenge.title,
            success: false,
            attempts: 0, // Or 1 if you want skipping to count as an attempt
            language: 'python',
            bonus: false,
          }
        ];
      }
      return prevResults;
    });

    toast({
        title: "Challenge Skipped",
        description: `Moving to the next challenge.`,
    });
    
    handleNextChallenge();
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Loading Challenge...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen items-start justify-center gap-8 p-4 md:p-8 font-body relative">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover object-center z-[-1]"
      >
        <source src="/challengesbackground.mp4" type="video/mp4" />
      </video>
      <div className="w-full md:w-1/2 flex flex-col gap-8 relative z-10">
        <ChallengePanel
          challenge={currentChallenge}
          currentIndex={currentChallengeIndex}
          totalChallenges={challenges.length}
          onChallengeSelect={handleChallengeSelect}
        />
      </div>

      <div className="w-full md:w-1/2 relative z-10">
        <EditorPanel
          key={currentChallengeIndex}
          challenge={currentChallenge}
          onChallengeSubmit={handleChallengeSubmit}
          onNextChallenge={handleNextChallenge}
          onSkipChallenge={handleSkipChallenge}
          challengeResults={challengeResults}
        />
      </div>
    </main>
  );
}
