import React, { useEffect, useState } from 'react';
import { Container, Title, Image, TextInput, Button, Text, Card } from '@mantine/core';
type Meal = {
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
  };
const Game = () => {
    const [meal, setMeal] = useState<Meal | null>(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  const fetchRandomMeal = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    setMeal(data.meals[0]);
    setGuess('');
    setResult('');
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const checkGuess = () => {
    if (!meal) return;
    const correct = meal.strMeal.toLowerCase().trim();
    const userGuess = guess.toLowerCase().trim();
    if (userGuess === correct) {
      setResult('🎉 Correct! Well done!');
    } else {
      setResult(`❌ Incorrect! The correct answer was: ${meal.strMeal}`);
    }
  };

  return (
    <Container size="xs" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} mb="sm">Guess the Food!</Title>
        {meal && (
          <>
            <Image src={meal.strMealThumb} alt="Meal" height={300} radius="md" mb="md" />
            <TextInput
              placeholder="Enter food name"
              value={guess}
              onChange={(e) => setGuess(e.currentTarget.value)}
              mb="md"
            />
            <Button onClick={checkGuess} fullWidth>Submit Guess</Button>
            <Text mt="md">{result}</Text>
            {result && (
              <Button mt="sm" variant="light" onClick={fetchRandomMeal}>
                Play Again
              </Button>
            )}
          </>
        )}
      </Card>
    </Container>
  );
};

export default Game;
