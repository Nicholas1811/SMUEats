import { useForm } from "@mantine/form";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { HeaderMegaMenu } from "../components/navbar";
import { Button, Card, Container, Grid, Paper, Space, Stack, Text, TextInput, Image, PasswordInput } from "@mantine/core";
import { signup } from "../backend/auth/login";
import { FooterSimple } from "../components/footer";
import { useNavigate } from "react-router-dom";



function Signup() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (values: { name: any; email: any; password: any; smuid: any }) => {
        const validation = form.validate();
        if (!validation.hasErrors) {
            const { data, error } = await signup(values.smuid.toString(), values.name, values.password, values.email)
            if (data) {
                navigate("/profile")
                console.log("Welcome user", data)
            } else {
                setError(true)
                console.log(error)
            }
        } else {
            console.log(validation)
        }
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            password: '',
            smuid: ''
        },
        validate: {
            name: (value) => value.length === 0 ? "Name is empty" : null,
            email: (value) => {
                if (!/^\S+@\S+$/.test(value)) {
                    return 'Invalid email';
                }
                if (error) {
                    return 'Your email is repeated'
                }
                return null;
            },
            password: (value) => value.length >= 8 ? null : 'Password too short',
            smuid: (value) => value.length === 8 ? null : 'Invalid SMU ID'
        },
    });



    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: 'linear-gradient(to right, #FFF0D9, #D4EDDA, #A5D6A7)'
            }}>
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
                    style={{ flex: '2' }}
                >
                    <Container size='md' pt='3rem' h="3rem">
                        <Grid gutter={0}>
                            <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem">
                                <Card shadow="xl" padding="lg" radius="md" withBorder style={{
                                    background:
                                        'background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(192, 192, 192, 0.5));',
                                    width: '100%',
                                    height: '100%'
                                }}
                                    bg='#F1F8F4'>
                                    <Space h='3rem' />
                                    <Card.Section>

                                        <Text size="1.5rem" fw={300} style={{ textAlign: 'center' }} c='#121212'>Sign Up</Text>
                                        <Text size="0.8rem" fw={150} style={{ textAlign: 'center', paddingTop: '1rem' }}>Be prepared for the wonderful convenience.</Text>
                                    </Card.Section>

                                    <Stack>
                                        <form onSubmit={form.onSubmit(handleSubmit)}>

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
                                                    description: {
                                                        fontFamily: 'system-ui',
                                                    },
                                                    label: {
                                                        fontFamily: 'system-ui'
                                                    }
                                                }}
                                            />
                                            <Space h="1rem" />
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
                                                    description: {
                                                        fontFamily: 'system-ui',
                                                    },
                                                    label: {
                                                        fontFamily: 'system-ui'
                                                    }
                                                }}
                                            />
                                            <Space h="1rem" />
                                            <PasswordInput
                                                variant="filled"
                                                withAsterisk
                                                label="Password"
                                                error="Wrong Password"
                                                description='Enter your password'
                                                placeholder="********"
                                                key={form.key('password')}
                                                {...form.getInputProps('password')}
                                            />

                                            <Space h="1rem" />
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

                                            <Space h="1rem" />
                                            <Button  fullWidth mt="md"  
                                                

                                                type="submit"

                                                color='#00B14F'
                                                variant="light"
                                                radius="xl"
                                                size="sm"
                                                c="green"
                                                h={35}
                                                style={{
                                                    fontWeight: 600,
                                                    padding: '6px 16px',
                                                    backgroundColor: '#E6F4EA', // soft mint green
                                                    color: '#2E7D32',           // darker green text
                                                    border: '1px solid #C8E6C9',
                                                    transition: 'all 0.2s ease',
                                                    fontFamily: 'Helvetica',
                                                    width: '100%'
                                                }}
                                            >
                                                Sign Up
                                            </Button>
                                        </form>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem" visibleFrom="custom">
                                <Paper shadow='xl' style={{ height: '100%' }} >
                                    <Image
                                        style={{ height: '100%' }}
                                        radius='md' src='https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/pastaexpress.jpg?itok=pL9hnuNe' />
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </Container>

                </motion.div>

            </AnimatePresence>
            <FooterSimple />
        </div>





    );
}
export default Signup;