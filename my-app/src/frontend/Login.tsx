import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, Button, Card, Container, Grid, Image, Paper, PasswordInput, Space, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { signin } from "../backend/auth/login";
import { HeaderMegaMenu } from "../components/navbar";
import { FooterSimple } from "../components/footer";
import { useNavigate } from "react-router-dom";


function Login() {
    const [userError, setUserError] = useState(false);
    const handleSubmit = async (values: { email: any; password: any; }) => {
        //e.preventDefault(); mantine auto calls
        const { data, error } = await signin(values.email, values.password)

        if (error) {
            setUserError(true)
            console.log(error)
        } else {
            navigate("/profile")
            console.log("Welcome user", data)
        }
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => {
                console.log(value)
                if (!/^\S+@\S+$/.test(value)) {
                    console.log(value)
                    return "Your email is invalid"
                }
                if (userError) {
                    return "No such user exists"
                }
                return null
            },
            password: (value) => value.length >= 8 ? null : 'Password must be at least 8 characters.'
        },
    });
    const navigate = useNavigate();
    // (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),


    return (
         <div
             style={{
                 display: 'flex',
                 flexDirection: 'column',
                 minHeight: '100vh',
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
                     style={{ flex: 1 }}
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

                                        <Text size="1.5rem" fw={300} style={{ textAlign: 'center' }} c='#121212'>Log in</Text>
                                        <Text size="0.8rem" fw={150} style={{ textAlign: 'center', paddingTop: '1rem' }}>Welcome back! Please log in below.</Text>
                                    </Card.Section>

                                    <Stack>
                                        <form onSubmit={form.onSubmit(handleSubmit)}>
                                            <TextInput
                                                name="email"
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
                                                name="password"
                                                variant="filled"
                                                withAsterisk
                                                label="Password"
                                                error="Wrong Password"
                                                description='Enter your password'
                                                placeholder="********"
                                                {...form.getInputProps('password')}
                                            />
                                            <Anchor href="#" underline="hover" size='0.75em'
                                                variant="gradient"
                                                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                                                style={{ lineHeight: 1.5, paddingTop: 1 }}
                                            >Forgot Password? Click on me</Anchor>
                                            <Button variant="gradient" fullWidth mt="md" radius="md" gradient={{ from: ' #11998e', to: '#38ef7d', deg: 90 }}
                                                type='submit'>
                                                Login
                                            </Button>
                                        </form>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem" visibleFrom="custom">
                                <Paper shadow='xl' style={{ height: '100%' }} >
                                    <Image
                                        style={{ height: '100%' }}
                                        radius='md' src='https://eatbook.sg/wp-content/uploads/2023/07/SMU-food-pasta-express-6.jpg' />
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
export default Login;