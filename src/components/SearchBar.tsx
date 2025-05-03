import { useEffect, useState } from 'react';
import { Select, Loader, Center, Modal, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

const SearchBar = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, areaRes] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
        ]);

        const categoryData = await catRes.json();
        const areaData = await areaRes.json();

        const categoryOptions = categoryData.meals.map((c: any) => ({
          label: `${c.strCategory} (Category)`,
          value: `category:${c.strCategory}`,
        }));

        const areaOptions = areaData.meals.map((a: any) => ({
          label: `${a.strArea} (Area)`,
          value: `area:${a.strArea}`,
        }));

        setOptions([...categoryOptions, ...areaOptions]);
      } catch (err) {
        console.error('Error loading search filters', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSelect = (value: string | null) => {
    if (!value) return;
    const [type, name] = value.split(':');

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      navigate(`/${type === 'category' ? 'categories' : 'areas'}/${name}`);
    } else {
      open(); 
    }
  };

  if (loading) {
    return <Center><Loader /></Center>;
  }

  return (
    <>
      <Select
        data={options}
        placeholder="Search by category or area"
        searchable
        clearable
        onChange={handleSelect}
        nothingFound="No match found"
        size="md"
        radius="md"
        style={{ maxWidth: 400, margin: '20px auto' }}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Login Required"
        centered
      >
        <Text>Please log in to view meals.</Text>
        <Button onClick={() => {
          close();         
          navigate('/login');
        }} mt="md" fullWidth>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default SearchBar;
