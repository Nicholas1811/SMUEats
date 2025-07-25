import React from 'react';
import styles from './Homepage.module.css';
import { HeaderMegaMenu } from '../components/navbar';
import { motion } from "motion/react";
import { useState } from "react";
import { Card, Image, Group, Text, Badge, Space, Container, Stack, Skeleton } from '@mantine/core';
import { Button } from '@mantine/core';
import { Grid } from '@mantine/core';
import { useStore } from '../backend/restaurants';
import { Link } from 'react-router-dom';
import { useLogin } from '../backend/auth/authcheck';
import { FooterSimple } from '../components/footer';


function randomPicker() {
  const imageArray = [
    // 'https://eatbook.sg/wp-content/uploads/2020/09/Onalu-feature-image.jpg',
    'https://eatbook.sg/wp-content/uploads/2023/08/kuro-kare-flatlay.jpg',
    'https://eatbook.sg/wp-content/uploads/2020/03/Canteen-Bistro-Three-dishes-intro-shot.jpg',
    'https://eatbook.sg/wp-content/uploads/2020/03/Canteen-Bistro-Flatlay-1.jpg'
  ];
  let randomIndex = Math.floor(Math.random() * imageArray.length)
  return imageArray[randomIndex];
}

function Homepage() {
  const { session, loading } = useLogin();
  const stores = useStore();
  const [showSecond, setShowSecond] = useState(false);
  let randomImage = randomPicker();

  return (
    <div className={styles.App}>
      <title>Home</title>
      <HeaderMegaMenu />
      <div className={styles.holder}>
        {/* critical issue here. parent must prevent from overflowing. the previous value was size = 1300*/}
        <Container
          className={styles.imageView}
          size="100%"
          style={{ position: 'relative', width: '100%', height: '400px', padding: 0 }}
        >
          <motion.img
            src={randomImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              zIndex: 1,
              width: '90%',
            }}
          >
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              onAnimationComplete={() => setShowSecond(true)}
              style={{ fontFamily: 'system-ui', fontSize: '3rem', margin: 0, textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
            >
              Welcome to SMUEats!
            </motion.h1>

            {showSecond && (
              <motion.h3
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ fontFamily: 'system-ui', marginTop: '0.5rem', fontSize: '1.5rem', textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}
              >
                Find the things you like to eat in SMU here. Order them!
              </motion.h3>
            )}
          </div>
        </Container>





      </div>

      <Space className={styles.spaceHeight} />
      <div className={styles.containerHolder}>
        <Container size='lg' px='md' >
          <Grid px="md">
            {stores &&
              (stores.map((store) => {
                let name = store.storeName;
                return (
                  <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 12 }}>
                    <Card shadow="xl" padding="lg" radius="md" withBorder key={store.id}>
                      <Card.Section>
                        <Image
                          src={store.image}
                          height={160}
                          alt={store.image}
                        />
                      </Card.Section>

                      <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={600} size="lg" >{store.storeName}</Text>
                        <Badge color="teal" variant="light">{store.school}</Badge>
                      </Group>

                      <Stack align='flex-start' gap={5}>
                        <Text c='#505050' fw={500} size='sm' td="underline">Opening Hours</Text>
                        <Text c='#505050' fw={400} size='sm'>{store.openingHours} </Text>
                        {store.weekendOpening.length > 0 ?
                          <Text c='#505050' fw={400} size='sm'>{store.weekendOpening}</Text> :
                          <Space h='lg'></Space>
                        }


                      </Stack>
                      {session != null && (
                        <Link to={{ pathname: `/store/${name}` }} state={store} style={{ textDecoration: 'None' }}>
                          <Button color='#00B14F' fullWidth mt="md" radius="md">
                            Order now
                          </Button>
                        </Link>
                      )}

                      {session == null && (
                        <Link to={{ pathname: "/" }} style={{ textDecoration: 'None' }}>
                          <Button color='#00B14F' fullWidth mt="md" radius="md">
                            Sign up to order!
                          </Button>
                        </Link>
                      )}


                    </Card>

                  </Grid.Col>


                )

              }))
            }
          </Grid>
        </Container>

      </div>


      <FooterSimple />
    </div>




  );
}

export default Homepage;
