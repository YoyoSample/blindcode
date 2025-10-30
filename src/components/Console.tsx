import { Card, CardContent } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

interface ConsoleProps {
  output: string;
}

export default function Console({ output }: ConsoleProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold font-headline mb-2 flex items-center gap-2">
        <Terminal className="w-5 h-5" />
        Console
      </h3>
      <Card className="bg-background/50 border-border min-h-[100px]">
        <CardContent className="p-4">
          <pre className="font-code text-sm whitespace-pre-wrap text-foreground/90">
            {output || 'Output will be shown here...'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
