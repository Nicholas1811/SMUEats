import { getUserOrder, getUserOrderItems } from "../backend/order";
import { useLogin } from "../backend/auth/authcheck";
import { FooterSimple } from "../components/footer";
import { HeaderMegaMenu } from "../components/navbar";
import React, { useEffect, useState } from "react";
import { Card, Container, Grid, Space, Table, Title, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

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
            setAllAddon([]); //we reset before adding everything in.
            pastOrder.map((item) => {
                console.log(item.orderID)
                getUserOrderItems(item.orderID).then((res) => {
                    setAllAddon((prev) => [...prev, ...res]);
                })
            })
        }
    }, [pastOrder])
    const [opened, { open, close }] = useDisclosure(false);
    const [orderID, setOrderID] = useState("")
    const viewItems = (id: any) => {
        setOrderID(id)
        open();
    }


    return (
        <>
            <HeaderMegaMenu />

            <Container>
                <Grid>
                    <Grid.Col span={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} pt={30}>
                        <Card shadow="md" padding="lg" radius="md" withBorder>
                            <Space h={15} />
                            <Title order={3}>Your Previous Orders</Title>
                            <Space h={30} />
                            <Table.ScrollContainer minWidth={800} maxHeight={800}>
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>N/O</Table.Th>
                                            <Table.Th>Order Date</Table.Th>
                                            <Table.Th>Total Price</Table.Th>
                                            <Table.Th>Order fufilled</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {
                                            pastOrder.map((item, index) => {
                                                let newDate = new Date(item.dateCreated);
                                                console.log(item)


                                                return (
                                                    <Table.Tr onClick={() => { viewItems(item.orderID) }}>
                                                        <Table.Td>
                                                            Order {index + 1}
                                                        </Table.Td>
                                                        <Table.Td>
                                                            <div style={{ display: 'flex' }}>
                                                                <Text fw={600}>Date: </Text>
                                                                <Space w={1} />
                                                                <Text>{newDate.toLocaleDateString('en-SG')}</Text>
                                                            </div>
                                                            <Space h={1} />
                                                            <div style={{ display: 'flex' }}>
                                                                <Text fw={600}>Time: </Text>
                                                                <Space w={1} />
                                                                <Text>{newDate.toLocaleTimeString('en-SG')}</Text>
                                                            </div>


                                                        </Table.Td>
                                                        <Table.Td>
                                                            <Text>S${(item.totalPrice).toFixed(2)}</Text>
                                                        </Table.Td>
                                                        <Table.Td>
                                                            {item.isCompleted === false ? (
                                                                <IconX stroke={2} color="red" />

                                                            ) : (
                                                                <IconCheck stroke={2} color="green" />
                                                            )}
                                                        </Table.Td>

                                                    </Table.Tr>

                                                )
                                            })
                                        }
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                            <ModalOpen opened={opened} open={open} close={close} orderID={orderID} />
                        </Card>


                    </Grid.Col>
                </Grid>
            </Container>
            <FooterSimple />
        </>
    )
}


function ModalOpen({ opened, open, close, orderID }: { opened: boolean, open: () => void, close: () => void, orderID: string }) {
    const [ao, setAO] = useState(null)
    useEffect(() => {
        getUserOrderItems(orderID).then((res) => {
            setAO(res)
        })
    }, [opened, orderID])
    console.log(ao)



    return (
        <>
            <Modal opened={opened} onClose={close} title="Order Items">
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Food</Table.Th>
                            <Table.Th>Food Name</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Add on</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                </Table>
                {/* Modal content */}
            </Modal>
        </>
    );

}