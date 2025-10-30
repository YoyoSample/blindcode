"use client";

import { useState, useEffect, useRef } from 'react';
import type { Challenge, Language } from '@/lib/challenges';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Console from './Console';
import { Play, RotateCcw, Send, Square, TimerIcon, LoaderCircle, SkipForward, Code, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { ChallengeResult } from '@/lib/challenges';
import { LANGUAGES } from '@/lib/challenges';

interface EditorPanelProps {
  challenge: Challenge;
  onChallengeSubmit: (code: string, language: Language) => Promise<{ simulatedOutput: string, isSuccess: boolean }>;
  onNextChallenge: () => void;
  onSkipChallenge: () => void;
  challengeResults: ChallengeResult[];
}

type SessionState = 'idle' | 'running' | 'submitting' | 'finished';

export default function EditorPanel({ challenge, onChallengeSubmit, onNextChallenge, onSkipChallenge, challengeResults }: EditorPanelProps) {
  const [code, setCode] = useState('');
  const [language] = useState<Language>('python');
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [timeLeft, setTimeLeft] = useState(challenge.timerDuration);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [blindModeOverride, setBlindModeOverride] = useState(false);
  const [codePopupOpen, setCodePopupOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Remove the old timer effect since we have the new one
  
  // Reset state when challenge changes
  useEffect(() => {
    handleReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge]);

  // Timer effect - only start once when first started, don't reset on resubmit
  useEffect(() => {
    if (sessionState === 'running' && timeLeft > 0 && attempts === 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setSessionState('finished');
            toast({
              title: "Time's up!",
              description: "The editor is now visible but you can no longer edit the code.",
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [sessionState, timeLeft, attempts, toast]);

  const handleStart = () => {
    setCode('');
    setConsoleOutput('');
    setIsSuccess(null);
    setTimeLeft(challenge.timerDuration);
    setAttempts(0);
    setSessionState('running');
  };

  const handleReset = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setCode('');
    setConsoleOutput('');
    setIsSuccess(null);
    setTimeLeft(challenge.timerDuration);
    setAttempts(0);
    setSessionState('idle');
    setBlindModeOverride(false);
    setCodeInput('');
    setCodeError('');
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
        toast({
            title: "Empty Code",
            description: "Please write some code before submitting.",
            variant: "destructive",
        });
        return;
    }
    setAttempts(prev => prev + 1);
    setSessionState('submitting');
    setConsoleOutput('Executing your code...');

    const { simulatedOutput, isSuccess } = await onChallengeSubmit(code, language);

    setConsoleOutput(simulatedOutput);
    setIsSuccess(isSuccess);
    setSessionState('finished');
    toast({
      title: isSuccess ? "Success!" : "Almost there!",
      description: isSuccess ? "You've passed the challenge." : "Your output didn't match. Keep trying!",
      variant: isSuccess ? "default" : "destructive",
    });

    // If not successful and time hasn't run out, reactivate blind mode for resubmission
    if (!isSuccess && timeLeft > 0) {
      setSessionState('running');
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isBlindMode = sessionState === 'running' && !blindModeOverride;

  const handleCodeSubmit = () => {
    if (codeInput === '316365684906') {
      setBlindModeOverride(true);
      setCodePopupOpen(false);
      setCodeInput('');
      setCodeError('');
      toast({
        title: "Blind Mode Disabled",
        description: "You can now see your code.",
      });
    } else {
      setCodeError('Wrong code');
    }
  };

  return (
    <Card className="w-full bg-card/80 border-border shadow-lg">
      <CardHeader className="flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <CardTitle className="font-headline text-2xl">Code Editor</CardTitle>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-base">
              <Code className="mr-2" /> Python
          </Badge>
          <div className="flex items-center gap-2 text-lg font-mono bg-muted px-3 py-1.5 rounded-md">
            <TimerIcon className="h-5 w-5 text-primary" />
            <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            <span className="text-sm text-muted-foreground">Attempts: {attempts}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Click 'Start' to begin the challenge..."
            className={cn(
                'font-code min-h-[300px] text-base bg-background/50 transition-colors duration-300 ease-in-out',
                isBlindMode && 'text-transparent selection:bg-transparent selection:text-transparent caret-primary',
                sessionState === 'finished' && isSuccess === false && 'border-destructive focus-visible:ring-destructive'
            )}
            readOnly={sessionState === 'idle' || (sessionState === 'finished' && isSuccess === true) || sessionState === 'submitting' || timeLeft === 0}
            spellCheck="false"
          />
           {isBlindMode && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 pointer-events-none rounded-md animate-in fade-in-50 duration-500">
                  <p className="text-lg text-primary font-semibold">Blind Mode Activated</p>
              </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
                {sessionState === 'idle' && <Button onClick={handleStart}><Play className="mr-2"/> Start</Button>}
                {sessionState === 'running' && <Button onClick={handleSubmit} variant="secondary"><Square className="mr-2"/> Stop & Submit</Button>}
                {sessionState === 'submitting' && (
                  <Button disabled>
                    <LoaderCircle className="mr-2 animate-spin" />
                    Submitting...
                  </Button>
                )}
                {sessionState === 'finished' && (
                  isSuccess ?
                    <Button onClick={onNextChallenge}>Next Challenge &rarr;</Button>
                  :
                    <Button onClick={handleSubmit} variant="destructive"><Send className="mr-2"/> Re-Submit</Button>
                )}

                <Button onClick={onSkipChallenge} variant="outline" disabled={sessionState === 'submitting' || (sessionState === 'finished' && isSuccess === true)}><SkipForward className="mr-2"/> Skip</Button>
                {sessionState === 'running' && (
                  <Dialog open={codePopupOpen} onOpenChange={setCodePopupOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline"><EyeOff className="mr-2"/> Disable Blind</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Code to Disable Blind Mode</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="codeInput">Code</Label>
                          <Input
                            id="codeInput"
                            type="password"
                            value={codeInput}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                              setCodeInput(value);
                              setCodeError('');
                            }}
                            placeholder="Enter 12-digit code"
                            maxLength={12}
                          />
                          {codeError && <p className="text-sm text-destructive">{codeError}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleCodeSubmit}>Submit</Button>
                          <Button variant="outline" onClick={() => { setCodePopupOpen(false); setCodeInput(''); setCodeError(''); }}>Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
            </div>
            {isSuccess !== null && sessionState === 'finished' && (
                <span className={cn('font-semibold', isSuccess ? 'text-green-400' : 'text-red-400')}>
                    {isSuccess ? 'Status: Correct' : 'Status: Incorrect'}
                </span>
            )}
        </div>
        
        <Console output={consoleOutput} />
      </CardContent>
    </Card>
  );
}
