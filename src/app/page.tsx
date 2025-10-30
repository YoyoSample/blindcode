"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../logo.gif';
// Use public/bannerimg.png via static path
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useRef } from 'react';

export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zooming, setZooming] = useState(false);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && registrationNumber.trim() && phoneNumber.trim() && phoneNumber.length === 10) {
      localStorage.setItem('username', username);
      localStorage.setItem('registrationNumber', registrationNumber);
      localStorage.setItem('phoneNumber', phoneNumber);
      // Clear previous challenge data
      localStorage.removeItem('currentChallengeIndex');
      localStorage.removeItem('challengeResults');
      setZooming(true);
      setTimeout(() => {
        router.push('/challenge');
      }, 400); // Animation duration
    }
  };

  return (
      <main className="min-h-screen flex flex-col justify-center items-center p-4 bg-background font-body relative overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-transform duration-1000 ${zooming ? 'scale-150' : ''}`}
          src="/background.mp4"
        />
        {/* Logo at top left */}
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="absolute top-4 left-4 z-10"
          unoptimized={true}
        />
        {/* Banner image at top center, right of logo */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center">
          <Image
            src="/bannerimg.png"
            alt="Banner"
            width={140}
            height={50}
            className="ml-1.5 rounded shadow"
            unoptimized={true}
          />
        </div>
      <Card className="w-full max-w-md shadow-lg z-10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary text-center">Blind Codng</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
                  setUsername(value);
                }}
                required
                className="text-base"
                placeholder="Enter your Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                required
                className="text-base"
                placeholder="Enter your registration number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhoneNumber(value);
                }}
                required
                className="text-base"
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
            <Button type="submit" className="w-full">
              Start Challenge
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="mt-4 text-center text-xs text-purple-600 z-10">
        Tantra 2025
      </footer>
    </main>
  );
}
