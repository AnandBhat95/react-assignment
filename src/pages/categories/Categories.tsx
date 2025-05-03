import {
    Card,
    Container,
    Grid,
    Group,
    Image,
    LoadingOverlay,
    Text,
    Title,
  } from '@mantine/core';
  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryDescription: string;
    strCategoryThumb: string;
  }
  
  export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    return (
      <Container size="xl" p="md" style={{ position: 'relative' }}>
        <Title align="center" mb="lg">
          Food Categories
        </Title>
        <Grid gutter="lg" justify="center">
          {categories.map((cat) => (
            <Grid.Col key={cat.idCategory} xs={12} sm={6} md={4} lg={3}>
              <Card
                shadow="md"
                radius="md"
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/categories/${cat.strCategory}`)}
              >
                <Card.Section>
                  <Image
                    src={cat.strCategoryThumb}
                    height={160}
                    alt={cat.strCategory}
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text fw={600}>{cat.strCategory}</Text>
                </Group>
                <Text size="sm" color="dimmed" lineClamp={3}>
                  {cat.strCategoryDescription}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    );
  }
  