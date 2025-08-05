import { getUserOrder, getUserOrderItems } from "../backend/order";
import { useLogin } from "../backend/auth/authcheck";
import { FooterSimple } from "../components/footer";
import { HeaderMegaMenu } from "../components/navbar";
import React, { useEffect, useState } from "react";
import { Card, Container, Grid, Space, Table, Title, Text, Image } from "@mantine/core";
import { IconCheck, IconTemperature, IconX } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { getFoodImage } from "../backend/restaurants";


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
        <div style={{ backgroundColor: '#FFFAF0' }}>
            <HeaderMegaMenu />

            <Container>
                <Grid>
                    <Grid.Col span={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} pt={30}>
                        <Card shadow="md" padding="lg" radius="md" withBorder bg='#FFFAF0' h={600}>
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
                                            pastOrder.length > 0 ? (
                                                pastOrder.map((item, index) => {
                                                    let newDate = new Date(item.dateCreated);


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
                                            ) : (
                                                <>
                                                    <Space h={150} />
                                                    <Table.Tr>
                                                        <Table.Td colspan={8} style={{ textAlign: 'center' }}>
                                                            <Text fw={700}>No items in cart. Please add to begin.</Text>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </>
                                            )

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
        </div>
    )
}


function ModalOpen({ opened, open, close, orderID }: { opened: boolean, open: () => void, close: () => void, orderID: string }) {
    const [ao, setAO] = useState([])
    const [addOnImages, setAddonImages] = useState({})
    useEffect(() => {
        if (!orderID) return;

        getUserOrderItems(orderID).then((res) => {
            setAO(res);
        });
    }, [opened, orderID]);
    let img = ""
    console.log(ao, 'checking for the total arr.')

    useEffect(() => {
        //use effect cnt use, thus we create another one.
        const imgs = {}
        const getImg = async () => {
            for (const item of ao) {
                //for of loop waits for all await to finish.
                //after looping, we store all the results into a object by using usestate.
                const img = await getFoodImage(item.storeID, item.foodName)
                const newItem = ([item.storeID, item.foodName]).toString()
                imgs[newItem] = img[0].image
            }
            setAddonImages(imgs)
        }
        getImg();
    }, [ao])
    return (
        <>
            <Modal opened={opened} onClose={close} title="Order Items" size={700}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Food Image</Table.Th>
                            <Table.Th>Food Name</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Add on</Table.Th>
                            <Table.Th>Price</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            ao.map((item) => {
                                console.log(item.addons, 'line167')
                                let checkFoodname = item.foodName
                                let checkID = item.storeID
                                let checker = ([checkID, checkFoodname]).toString()

                                return (
                                    <Table.Tr>

                                        {
                                            Object.entries(addOnImages).map(([k, v]) => {
                                                if (k == checker) {
                                                    return (
                                                        <Table.Td>
                                                            <Image src={v} w={100} h={100} />
                                                        </Table.Td>
                                                    )
                                                }
                                            })
                                        }




                                        <Table.Td>
                                            <Text size='xs'>{item.foodName}</Text>
                                        </Table.Td>

                                        <Table.Td>
                                            <Text size='xs'>{item.quantity}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            {
                                                Object.entries(item.addons).map(([k, v]) => {
                                                    console.log(v, item.foodName)
                                                    if (k !== 'price') {
                                                        return (
                                                            <>
                                                                <Text size='xs'>{k}: {v.toString()}</Text>
                                                                <Space h={13} />
                                                            </>

                                                        )
                                                    } else {
                                                        return (
                                                            <></>
                                                        )
                                                    }
                                                })
                                            }
                                        </Table.Td>

                                        <Table.Td>
                                            <Text size='xs'>S${item.finPrice.toFixed(2)}</Text>
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            })
                        }
                    </Table.Tbody>
                </Table>
                {/* Modal content */}
            </Modal>
        </>
    );

}