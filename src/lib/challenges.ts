
export type Challenge = {
  id: number;
  title: string;
  description: string;
  details: string[];
  timerDuration: number; // in seconds
  expectedOutput: string;
  sampleOutput: string;
  input?: string; // Optional input for interactive challenges
};

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Sum of Two Numbers',
    description: 'Calculate the sum of two predefined numbers.',
    details: [
      'Write a program that prints the sum of 15 and 27.',
    ],
    timerDuration: 60,
    expectedOutput: '42',
    sampleOutput: '42',
  },
  {
    id: 2,
    title: 'Find Maximum Number',
    description: 'Find the largest number in a given list.',
    details: [
        'Write a program to find and print the maximum number from the list: [10, 4, 25, 8, 19].',
    ],
    timerDuration: 90,
    expectedOutput: '25',
    sampleOutput: '25',
  },
  {
    id: 3,
    title: 'String Reversal',
    description: 'Reverse a given string.',
    details: [
        'Write a program that reverses the string "hello" and prints the result.',
    ],
    timerDuration: 90,
    expectedOutput: 'olleh',
    sampleOutput: 'olleh',
  },
  {
    id: 4,
    title: 'Check for Palindrome',
    description: 'Check if a string is a palindrome.',
    details: [
        'A palindrome is a word that reads the same forwards and backward.',
        'Write a program that checks if the string "madam" is a palindrome.',
        'Print "True" if it is, and "False" otherwise.',
    ],
    timerDuration: 120,
    expectedOutput: 'True',
    sampleOutput: 'True',
  },
  {
    id: 5,
    title: 'Factorial of a Number',
    description: 'Calculate the factorial of a number.',
    details: [
        'Write a program to calculate and print the factorial of 5.',
        'The factorial of n (n!) is the product of all positive integers up to n.',
    ],
    timerDuration: 150,
    expectedOutput: '120',
    sampleOutput: '120',
  },
  {
    id: 6,
    title: 'Count Vowels',
    description: 'Count the number of vowels in a string.',
    details: [
        'Write a program to count and print the number of vowels (a, e, i, o, u) in the string "programming".',
    ],
    timerDuration: 120,
    expectedOutput: '3',
    sampleOutput: '3',
  },
  {
    id: 7,
    title: 'Check for Prime Number',
    description: 'Check if a number is a prime number.',
    details: [
        'A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.',
        'Write a program to check if 29 is a prime number.',
        'Print "True" if it is prime, and "False" otherwise.',
    ],
    timerDuration: 180,
    expectedOutput: 'True',
    sampleOutput: 'True',
  },
  {
    id: 8,
    title: 'Fibonacci Number',
    description: 'Find the Nth number in the Fibonacci sequence.',
    details: [
        'The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.',
        'Write a program to find and print the 10th number in the Fibonacci sequence (starting from index 0).',
        'Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...',
    ],
    timerDuration: 210,
    expectedOutput: '34',
    sampleOutput: '34',
  },
  {
    id: 9,
    title: 'FizzBuzz',
    description: 'Solve the classic FizzBuzz problem.',
    details: [
        'Write a program that prints numbers from 1 to 15, one per line.',
        'For multiples of 3, print "Fizz" instead of the number.',
        'For multiples of 5, print "Buzz".',
        'For multiples of both 3 and 5, print "FizzBuzz".'
    ],
    timerDuration: 240,
    expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
    sampleOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
  },
  {
    id: 10,
    title: 'Sum of Array Elements',
    description: 'Calculate the sum of all elements in an array.',
    details: [
        'Write a program to calculate and print the sum of all numbers in the list: [1, 2, 3, 4, 5].',
    ],
    timerDuration: 90,
    expectedOutput: '15',
    sampleOutput: '15',
  },
  {
    id: 11,
    title: 'Interactive Sum Calculator',
    description: 'Create an interactive program that takes two numbers as input and prints their sum.',
    details: [
        'Write a program that prompts the user to enter two numbers and then prints their sum.',
        'Example interaction:',
        'Enter a number: 10',
        'Enter another number: 7',
        'The Sum is 17',
    ],
    timerDuration: 120,
    expectedOutput: 'Enter a number: Enter another number: The Sum is 17',
    sampleOutput: 'Enter a number: Enter another number: The Sum is 17',
    input: '10\n7',
  }
];

export type Language = 'python';

// Judge0 Language IDs: https://ce.judge0.com/languages
export const LANGUAGES: { value: Language; label: string; id: number }[] = [
    { value: 'python', label: 'Python', id: 71 },
];

export type ChallengeResult = {
  challengeName: string;
  success: boolean;
  attempts: number;
  language: Language;
  bonus?: boolean;
};
