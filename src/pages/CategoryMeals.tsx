import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SimpleGrid, Card, Image, Text, Loader, Title, Center, Modal, Button } from '@mantine/core';
import { useAppStore } from '../store/app.store'; // Import Zustand store
import { useEffect, useState } from 'react';


const fetchMealsByCategory = async (category: string) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals;
};


const fetchMealDetails = async (mealName: string) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  const data = await res.json();
  return data.meals[0]; 
};

const CategoryMeals = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const setLoggedIn = useAppStore((state) => state.setLoggedIn);
  const setRedirectUrl = useAppStore((state) => state.setRedirectUrl);
  const redirectUrl = useAppStore((state) => state.redirectUrl);

  
  const [openModal, setOpenModal] = useState(false);
  const [mealDetails, setMealDetails] = useState<any>(null);

  
  useEffect(() => {
    if (!isLoggedIn) {
      setRedirectUrl(`/categories/${categoryName}`);  
      setOpenModal(true);
    }
  }, [isLoggedIn, categoryName, setRedirectUrl]);

  
  const { data: meals, isLoading } = useQuery(['meals', categoryName], () =>
    fetchMealsByCategory(categoryName!)
  );


  if (isLoading) {
    return <Center><Loader size="lg" /></Center>;
  }

  
  const handleLoginRedirect = () => {
    navigate('/login');  
  };

  
  const closeModal = () => {
    setOpenModal(false);
    navigate(-1);  
  };

  
  const handleSuccessfulLogin = () => {
    setLoggedIn(true);  
    if (redirectUrl) {
      navigate(redirectUrl);  
    } else {
      navigate('/categories');  
    }
  };

  // Handle click on a meal item
  const handleMealClick = async (mealName: string) => {
    // Fetch full meal details when a meal item is clicked
    const details = await fetchMealDetails(mealName);
    setMealDetails(details);
    setOpenModal(true); // Open the modal to show details
  };

  // Modal close function
  const closeMealDetailsModal = () => {
    setMealDetails(null);
    setOpenModal(false);
  };

  return (
    <div style={{ padding: 20 }}>
      {!isLoggedIn && (
        <Modal styles={{content:{ marginTop: '20px', }}} opened={openModal} onClose={closeModal} title="Please Log In">
        <Text mb="md">You need to log in to view the details of this category.</Text>
        <Button onClick={handleLoginRedirect}>Go to Login</Button>
      </Modal>
      )}
      
      {isLoggedIn && (
        <div>
          <Title order={2}  align="center" mb="lg">{categoryName} Meals</Title>
          <SimpleGrid cols={4} spacing="lg">
            {meals?.map((meal: any) => (
              <Card
                key={meal.idMeal}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={() => handleMealClick(meal.strMeal)}  
                style={{ cursor: 'pointer' }}
              >
                <Card.Section>
                  <Image src={meal.strMealThumb} alt={meal.strMeal} height={160} />
                </Card.Section>
                <Text weight={500} mt="md">{meal.strMeal}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      )}

      <Modal
        opened={Boolean(mealDetails)}
        onClose={closeMealDetailsModal}
        title={mealDetails?.strMeal || "Meal Details"}
        size="lg" 
        styles={{
          root: {
            padding: '20px',  // Add padding inside the modal
            borderRadius: '10px',  // Rounded corners for the modal container
            backgroundColor: '#fff',  // White background
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',  // Soft shadow for the modal
          },
          title: {
            fontSize: '1.5rem',  // Larger font size for the title
            fontWeight: 'bold',  // Bold title
            color: '#1565c0',  // Blue title color
            textAlign: 'center',  // Center the title
            marginBottom: '20px',  // Add some margin below the title
          },
          content: {
            marginTop: '20px', 
          },
          body: {
            padding: '30px 20px',  
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
        {mealDetails ? (
          <div>
            <Image
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              height={200}
              mb="md"
              style={{ borderRadius: '8px' }}  
            />
            <Text weight={500} size="lg" mb="md">{mealDetails.strMeal}</Text>
            <Text mt="md" style={{ lineHeight: '1.6', color: '#555' }}>{mealDetails.strInstructions}</Text>
            <Button
              variant="outline"
              mt="md"
              onClick={closeMealDetailsModal}
              style={{
                borderColor: '#1565c0',  
                color: '#1565c0', 

              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <Loader size="lg" />
        )}
      </Modal>


    </div>
  );
};

export default CategoryMeals;
