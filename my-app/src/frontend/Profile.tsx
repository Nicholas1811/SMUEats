import React from "react";
import { useLogin, useUserTable } from "../backend/auth/authcheck";
import { Anchor, Button, Card, Container, Grid, Paper, PasswordInput, Space, Stack, Text, TextInput, Image, Group } from '@mantine/core';
import { logout } from "../backend/auth/login";
import { HeaderMegaMenu } from "../components/navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Profile() {
    const { session, loading } = useLogin();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const sucess = await logout();
        if (sucess) {
            console.log('success')
            navigate("/")
        }
    }
    let uid = ""
    let email = ""
    if (session == null) {
        uid = "null";
    } else {
        if (!loading) {
            uid = session.user.id
            email = session.user.email
        }
    }
    const userTable = useUserTable(uid);
    let pwdItem = ""
    if(userTable !== null){
        pwdItem = "*".repeat(userTable.pwd_length)
    }
    console.log(email)

    if (session == null) {
        return (
            <div>
                You are unable to login, please sign in!
            </div>
        )
    }
    if (!loading && session !== null) {

        const email = session.user.email
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

                                        <Text size="1.5rem" fw={300} style={{ textAlign: 'center' }} c='#121212'>Profile Page</Text>
                                        {userTable !==null &&
                                        <Text size="0.8rem" fw={150} style={{ textAlign: 'center', paddingTop: '1rem' }}>Welcome back, {userTable.username}.</Text>
                                        }
                                        
                                    </Card.Section>

                                    <Stack>
                                        {userTable !==null &&
                                        (
                                        <>
                                        <TextInput
                                            value={userTable.username}
                                            label="Username"
                                            description="You can update your username here."
                                        /> 
                                        <TextInput
                                            value= {pwdItem}
                                            label="Password"
                                            description="You can update your password here."
                                        /> 
                                        <TextInput
                                            value={userTable.smuid}
                                            label="SMU ID"
                                            disabled
                                            description="You are unable to update your SMU ID."
                                        /> 

                                        <TextInput
                                            value={email}
                                            label="Email"
                                            disabled
                                            description="You are unable to update your email"
                                        /> 
                                        <Group align="center" w="100%" gap={0} justify="center" style={{justifyContent: 'space-between'}}>
                                            <Button onClick={handleLogout}>Update Account</Button>
                                            <Button onClick={handleLogout}>Logout</Button>
                                        </Group>

                                        
                                        </>
                                        )
                                        
                                        }
                                        
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 6 }} h="40rem" visibleFrom="custom">
                                <Paper shadow='xl' style={{ height: '100%' }} >
                                    <Image
                                        style={{ height: '100%' }}
                                        radius='md' src='https://eatbook.sg/wp-content/uploads/2023/07/SMU-food-supergreen-11.jpg' />
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </motion.div>

            </AnimatePresence>
        )
    }






}

