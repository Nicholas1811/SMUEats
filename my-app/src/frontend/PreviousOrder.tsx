import { getUserOrder, getUserOrderItems } from "../backend/order";
import { useLogin } from "../backend/auth/authcheck";
import { FooterSimple } from "../components/footer";
import { HeaderMegaMenu } from "../components/navbar";
import React, { useEffect, useState } from "react";
import { Card, Container, Grid, Space, Table, Title,Text } from "@mantine/core";

export function PreviousOrder() {
    const { session: userSession, loading: isLoading } = useLogin();
    const [pastOrder, setPastOrder] = useState([]);
    const [allAddon, setAllAddon] = useState([]);
    let curusrid = '';
    useEffect(() => {
        if (userSession) {
            curusrid = userSession.user.id

            getUserOrder(curusrid).then((result) => {
                setPastOrder(result)
            })
        }
    }, [userSession])

    useEffect(() => {
        if (pastOrder) {
            pastOrder.map((item) => {
                console.log(item.orderID)
                getUserOrderItems(item.orderID).then((res) => {
                    setAllAddon(res)
                })
            })
        }
    }, [pastOrder])

    console.log(allAddon)


    return (
        <>
            <HeaderMegaMenu />

            <Container>
                <Grid>
                    <Grid.Col span={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} pt={30}>
                        <Card shadow="md" padding="lg" radius="md" withBorder>
                            <Space h={15} />
                            <Title order={3}>Your Meal Cart</Title>
                            <Space h={30} />
                            <Table.ScrollContainer minWidth={800} maxHeight={300}>
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>N/O</Table.Th>
                                            <Table.Th>Food Purchased</Table.Th>
                                            <Table.Th>Order Date</Table.Th>
                                            <Table.Th>Total Price</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {
                                            pastOrder.map((item, index) => {
                                                return (
                                                    <Table.Tr>
                                                        <Table.Td>
                                                            {index}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {
                                                                /*Must handle for the else for map. */
                                                                allAddon.map((values) => {
                                                                    if (values.orderID == item.orderID) {
                                                                        console.log(values.orderID, item.orderID, values.orderID == item.orderID)
                                                                        console.log(values.foodName)
                                                                        return (
                                                                        
                                                                                <Text>{values.foodName}</Text>
                                                                            
                                                                        )
                                                                    }else{
                                                                        return (
                                                                            <Text>Non Displayed</Text>
                                                                        )
                                                                    }
                                                                })
                                                            }

                                                        </Table.Td>

                                                    </Table.Tr>

                                                )
                                            })
                                        }
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        </Card>


                    </Grid.Col>
                </Grid>
            </Container>
            <FooterSimple />
        </>
    )
}