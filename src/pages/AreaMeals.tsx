import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Loader,
  Title,
  Center,
  Modal,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const fetchMealsByArea = async (area: string) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const data = await res.json();
  return data.meals;
};

const AreaMeals = () => {
  const { areaName } = useParams<{ areaName: string }>();
  const [mealDetails, setMealDetails] = useState<any>(null);
  const [loadingMeal, setLoadingMeal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  // Fetch meals 
  const { data: meals, isLoading } = useQuery(['meals-by-area', areaName], () =>
    fetchMealsByArea(areaName!)
  );

  // Fetch details 
  const fetchMealDetails = async (id: string) => {
    setLoadingMeal(true);
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    setMealDetails(data.meals?.[0]);
    setLoadingMeal(false);
  };
  const filteredMeals = meals?.filter((meal: any) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const closeMealDetailsModal = () => setMealDetails(null);

  if (isLoading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Title order={2} mb="lg" align="center">
        {areaName} Meals
      </Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <TextInput
          placeholder={`Search in ${areaName}`}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          style={{ width: '30vw' }}
          rightSection={
            searchTerm ? (
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setSearchTerm('')}
              >
                <IconX size={16} />
              </ActionIcon>
            ) : null
          }
        />
      </div>
      <SimpleGrid cols={4} spacing="lg" breakpoints={[
        { maxWidth: 1200, cols: 3 },
        { maxWidth: 900, cols: 2 },
        { maxWidth: 600, cols: 1 },
      ]}>
        {filteredMeals.length > 0 ? (filteredMeals?.map((meal: any) => (
          <Card
            key={meal.idMeal}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => fetchMealDetails(meal.idMeal)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Section>
              <Image src={meal.strMealThumb} alt={meal.strMeal} height={160} />
            </Card.Section>
            <Text weight={500} mt="md">
              {meal.strMeal}
            </Text>
          </Card>
        ))):(
          <Center style={{ gridColumn: '1 / -1' }}>
            <Text color="#1565c0" weight={500}>
              No meals found in {areaName}
            </Text>
          </Center>
        )}
      </SimpleGrid>

      <Modal
        opened={Boolean(mealDetails)}
        onClose={closeMealDetailsModal}
        title={mealDetails?.strMeal || 'Meal Details'}
        size="lg"
        overlayProps={{ blur: 3 }}
        styles={{
          root: {
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
          content: {
            marginTop: '20px',
          },
          title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1565c0',
            textAlign: 'center',
            marginBottom: '20px',
          },
          body: {
            padding: '10px 20px',
            marginBottom: '20px'
          },
          close: {
            color: '#1565c0',
            borderColor: '#1565c0',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          },
        }}
      >
        {loadingMeal ? (
          <Center>
            <Loader size="lg" />
          </Center>
        ) : mealDetails ? (
          <div>
            <Image
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              height={200}
              mb="md"
              style={{ borderRadius: '8px' }}
            />
            <Text weight={500} size="lg" mb="md">
              {mealDetails.strMeal}
            </Text>
            <Text mt="md" style={{ lineHeight: '1.6', color: '#555' }}>{mealDetails.strInstructions}</Text>
            <Button variant="outline" mt="md" onClick={closeMealDetailsModal} style={{
              borderColor: '#1565c0',
              color: '#1565c0',
            }}>
              Close
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AreaMeals;
