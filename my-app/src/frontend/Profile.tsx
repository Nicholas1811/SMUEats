import React, { useEffect, useState } from "react";
import { useLogin, useUserTable } from "../backend/auth/authcheck";
import { Anchor, Button, Card, Container, Grid, Paper, PasswordInput, Space, Stack, Text, TextInput, Image, Group } from '@mantine/core';
import { logout } from "../backend/auth/login";
import { HeaderMegaMenu } from "../components/navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FooterSimple } from "../components/footer";
import { useForm } from "@mantine/form";
import { updateUserPwd, updateUsername } from "../backend/auth/login";
import e from "cors";
import { notifications } from "@mantine/notifications";
export default function Profile() {

    const { session, loading } = useLogin();
    console.log(session, loading)
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
    const [curEmail, setCurEmail] = useState(null)
    const [curPwd, setCurPwd] = useState("")

    useEffect(() => {
        if (userTable !== null) {
            console.log(userTable)
            pwdItem = "*".repeat(userTable.pwd_length)
            //states are async.
            setCurEmail(userTable.username)
            setCurPwd(pwdItem)
            console.log(curEmail, curPwd)
            let userObj = { username: userTable.username, password: '' }
            form.setValues(userObj);
        }
    }, [userTable])

    const form = useForm({
        initialValues: {
            username: curEmail,
            password: '',
        },
    })
    //prodDev1
    //prodDev123
    const handleSubmit = (async (values: any) => {
        if (values.password != "") {
            let resTwo: boolean = false
            resTwo = await updateUsername(uid, values.username)
            let resOne: boolean = false
            resOne = await updateUserPwd(uid, values.password)
            console.log(resOne, resTwo, values)
            if (resOne && resTwo) {
                notifications.show({
                    title: 'Update Successful',
                    message: 'You have successfully updated your information.'
                })
                console.log('allOK, both updated')
            }
        } else {
            let resTwo: boolean = false
            resTwo = await updateUsername(uid, values.username)
            if (resTwo) {
                notifications.show({
                    title: 'Update Successful',
                    message: 'You have successfully updated your information.'
                })
                console.log('allOk, one updated')

            }
        }



    })

    if (session == null) {
        return (
            <div>
                You are unable to login, please sign in!
            </div>
        )
    }




    if (!loading && session !== null) {
        //prodAcc123
        const email = session.user.email
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #FFF0D9, #D4EDDA, #A5D6A7)'
            }}
            >

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
                        <Container size='md' pt='3rem'>
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

                                            <Text size="1.5rem" fw={300} style={{ textAlign: 'center' }} c='#121212'>Profile Page</Text>
                                            {userTable !== null &&
                                                <Text size="0.8rem" fw={150} style={{ textAlign: 'center', paddingTop: '1rem' }}>Welcome back, {userTable.username}.</Text>
                                            }

                                        </Card.Section>

                                        <Stack>
                                            {userTable !== null &&
                                                (
                                                    <form onSubmit={form.onSubmit(handleSubmit)}>
                                                        <TextInput

                                                            label="Username"
                                                            description="You can update your username here."
                                                            key={form.key('username')}
                                                            {...form.getInputProps('username')}
                                                        />
                                                        <PasswordInput
                                                            label="Password"
                                                            description="You can update your password here."
                                                            key={form.key('password')}
                                                            placeholder="********"
                                                            {...form.getInputProps('password')}
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
                                                        <Space h={15} />
                                                        <Stack align="center" w="100%" gap={5} justify="center" style={{ justifyContent: 'space-between' }}>
                                                            <Button w='50%' color="#00B14F" type='submit'
                                                                fullWidth
                                                                radius="xl"
                                                                size="md"
                                                                variant="light"
                                                                style={{
                                                                    fontWeight: 600,
                                                                    border: '1px solid #00B14F',
                                                                    backgroundColor: '#E6F4EA',
                                                                    color: '#00B14F',
                                                                    transition: 'all 0.2s ease',
                                                                }}
                                                            >Update Details</Button>
                                                            <Button onClick={handleLogout} w='50%' color='red'
                                                                fullWidth
                                                                radius="xl"
                                                                size="md"
                                                                c="red"
                                                                variant="light"
                                                                style={{
                                                                    fontWeight: 600,
                                                                    border: '1px solid #FF6B6B',
                                                                    backgroundColor: '#FFF5F5',
                                                                    color: '#D32F2F',
                                                                    transition: 'all 0.2s ease',
                                                                }}>Logout Account</Button>
                                                        </Stack>


                                                    </form>
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
                <FooterSimple />

            </div>


        )
    }






}

