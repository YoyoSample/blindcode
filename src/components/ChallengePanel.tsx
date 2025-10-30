import type { Challenge } from '@/lib/challenges';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { challenges } from '@/lib/challenges';

interface ChallengePanelProps {
  challenge: Challenge;
  currentIndex: number;
  totalChallenges: number;
  onChallengeSelect: (index: string) => void;
}

export default function ChallengePanel({ challenge, currentIndex, totalChallenges, onChallengeSelect }: ChallengePanelProps) {
  const progressPercentage = ((currentIndex + 1) / totalChallenges) * 100;

  return (
    <Card className="w-full bg-card/90 border-border shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary">Challenge {currentIndex + 1} of {totalChallenges}</Badge>
          <Lightbulb className="w-8 h-8 text-primary/50 shrink-0" />
        </div>
        <div className='space-y-2'>
            <CardTitle className="font-headline text-3xl text-primary">{challenge.title}</CardTitle>
            <CardDescription className="text-foreground/80 pt-1">{challenge.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
            <h3 className="font-semibold font-headline text-lg mb-2">Select Challenge:</h3>
            <Select onValueChange={onChallengeSelect} value={String(currentIndex)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a challenge" />
                </SelectTrigger>
                <SelectContent>
                    {challenges.map((challenge, index) => (
                        <SelectItem key={challenge.id} value={String(index)}>
                           {index + 1}. {challenge.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-3 pt-4">
            <h3 className="font-semibold font-headline text-lg">Requirements:</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
                {challenge.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
        <div className="space-y-3 pt-2">
          <h3 className="font-semibold font-headline text-lg">Expected Output:</h3>
          <pre className="font-code text-sm whitespace-pre-wrap bg-background/50 p-4 rounded-md border">{challenge.expectedOutput}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
