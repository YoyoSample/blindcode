
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChallengeResult } from '@/lib/challenges';
import { Download, Home, Star } from 'lucide-react';

export default function ResultsPage() {
  const [username, setUsername] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem('username');
    const regNum = localStorage.getItem('registrationNumber');
    const phone = localStorage.getItem('phoneNumber');
    const savedResults = localStorage.getItem('challengeResults');

    if (!regNum) {
      router.push('/');
      return;
    }

    setUsername(user || '');
    setRegistrationNumber(regNum);
    setPhoneNumber(phone || '');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, [router]);

  const handleDownloadImage = async () => {
    const element = resultsRef.current;
    if (!element) return;

    const { default: html2canvas } = await import('html2canvas');

    const canvas = await html2canvas(element, {
      backgroundColor: '#000', // Black background
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Result_of_${registrationNumber}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Loading Results...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 font-body relative">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/resultpagebackground.mp4" type="video/mp4" />
      </video>
      <Card className="w-full max-w-4xl shadow-lg relative z-10 bg-card/50">
        <div>
          <div ref={resultsRef} className="dark:bg-card dark:text-card-foreground p-6 rounded-t-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">Blind Coding Results</CardTitle>
              <div>
                <div>Name: <span className="font-bold">{username && `${username}`}</span></div>
                <div>Registration number: <span className="font-semibold text-foreground">{registrationNumber}</span></div>
                {phoneNumber && <div>Phone Number: {phoneNumber}</div>}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Challenge</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Attempts</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead className="text-center">Bonus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.challengeName}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={result.success ? 'default' : (result.attempts === 0 && !result.success ? 'secondary' : 'destructive')}>
                          {result.success ? 'Success' : (result.attempts === 0 && !result.success ? 'Skipped' : 'Failed')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{result.attempts}</TableCell>
                      <TableCell>{result.language}</TableCell>
                      <TableCell className="text-center">
                        {result.bonus && (
                          <Star className="w-5 h-5 text-yellow-400 inline-block" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </div>
        
        <CardFooter className="flex flex-wrap justify-end gap-2 pt-6 p-6 bg-card rounded-b-lg">
            <Button variant="outline" onClick={handleGoHome}>
                <Home className="mr-2"/> Go Home
            </Button>
            <Button onClick={handleDownloadImage}>
                <Download className="mr-2" /> Download Image
            </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
