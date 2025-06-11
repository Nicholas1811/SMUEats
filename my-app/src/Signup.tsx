import { useForm } from "@mantine/form";
import { AnimatePresence,motion } from "framer-motion";
import React from "react";
import { HeaderMegaMenu } from "./components/navbar";
import { Anchor, Button, Card, Container, Grid, Paper, Space,Stack,Text, TextInput,Image } from "@mantine/core";

function Signup() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            password: '',
            smuid: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    return (
        <AnimatePresence>
            <HeaderMegaMenu />
            <motion.div className="Login"
                initial='initialState'
                animate='animateState'
                exit='exitState'
                transition={{
                    duration: 0.75,
                    ease: [0.39, 0.24, 0.3, 1],
                }}
                variants={
                    {
                        initialState: {
                            opacity: 0
                        },
                        animateState: {
                            opacity: 1
                        },
                        exitState: {

                        },
                    }
                }
            >
                <Container size='md' pt='3rem' h="3rem">
                    <Grid gutter={0}>
                        <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem">
                            <Card shadow="xl" padding="lg" radius="md" withBorder style={{
                                background:
                                    'background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(192, 192, 192, 0.5));',
                                width: '100%',
                                height: '100%'
                            }}>
                                <Space h='3rem' />
                                <Card.Section>

                                    <Text size="1.5rem" fw={300} style={{ textAlign: 'center' }} c='#121212'>Sign Up</Text>
                                    <Text size="0.8rem" fw={150} style={{ textAlign: 'center', paddingTop: '1rem' }}>Be prepared for the wonderful convenience.</Text>
                                </Card.Section>

                                <Stack>
                                    <form onSubmit={form.onSubmit((values) => { console.log(values) })}>
                                        
                                        <TextInput
                                        
                                        variant="filled"
                                            withAsterisk
                                            label="Name"
                                            error="Invalid name"
                                            placeholder="yourxxname"
                                            description='Enter your name'
                                            key={form.key('name')}
                                            {...form.getInputProps('name')}
                                            styles={{
                                                description:{
                                                    fontFamily:'system-ui',
                                                },
                                                label:{
                                                    fontFamily: 'system-ui'
                                                }
                                            }}
                                        />
                                        <Space h="1rem"/>
                                        <TextInput
                                        
                                        variant="filled"
                                            withAsterisk
                                            label="Email"
                                            error="Invalid Email"
                                            placeholder="your@email.com"
                                            description='Enter your email'
                                            key={form.key('email')}
                                            {...form.getInputProps('email')}
                                            styles={{
                                                description:{
                                                    fontFamily:'system-ui',
                                                },
                                                label:{
                                                    fontFamily: 'system-ui'
                                                }
                                            }}
                                        />
                                        <Space h="1rem"/>
                                        <TextInput
                                        variant="filled"
                                            withAsterisk
                                            label="Password"
                                            error="Wrong Password"
                                            description='Enter your password'
                                            placeholder="********"
                                            key={form.key('password')}
                                            {...form.getInputProps('password')}
                                        />

                                        <Space h="1rem"/>
                                        <TextInput
                                        variant="filled"
                                            withAsterisk
                                            label="SMU ID"
                                            error="Invalid ID"
                                            description='Enter your SMU ID'
                                            placeholder="01422812"
                                            key={form.key('smuid')}
                                            {...form.getInputProps('smuid')}
                                        />
                                        
                                    <Space h="1rem"/>
                                    <Button variant="gradient" fullWidth mt="md" radius="md" gradient={{from :' #11998e', to: '#38ef7d' , deg:90}}
                                    type='submit'
                                    >
                                    Sign Up
                                </Button>
                                    </form>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem" visibleFrom="custom">
                            <Paper shadow='xl' style={{height: '100%'}} >
                                <Image
                                style={{ height: '100%' }}
                                radius='md' src = 'https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/pastaexpress.jpg?itok=pL9hnuNe'/>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Container>
            </motion.div>
        </AnimatePresence>




    );
}
export default Signup;