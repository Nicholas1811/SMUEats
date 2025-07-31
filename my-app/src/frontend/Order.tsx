import { HeaderMegaMenu } from "../components/navbar";
import { FooterSimple } from "../components/footer";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Grid, Group, Space, Text, Title, Image, VisuallyHidden, TableTbody, ActionIcon, Loader, Overlay, LoadingOverlay } from "@mantine/core";
import { useStore } from "../cartstore/cart";
import { Table } from '@mantine/core';
import { IconMinus, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import payItem from "../backend/payment";
import { useSearchParams } from 'react-router-dom';
import { useLogin } from "../backend/auth/authcheck";
import { addOrder, addOrderItem } from "../backend/order";
import { getAddon, useSingleFood } from "../backend/restaurants";

function Order() {

    const store = useStore();


    const empty = () => {
        if (store) {
            store.clearCart();
        }

    }
    let cart: any = [];
    console.log(store)
    cart = store.cart
    let finPrice = 0;

    Object.entries(cart).map(([key, value]) => {

        value.map((e: { finPrice: string | number; totalAmt: number; }) => {
            if (e.finPrice != 'NaN') {
                finPrice += Number(e.finPrice * e.totalAmt);
            }

        })
    })
    const [opened, { open, close }] = useDisclosure(false)
    const [selectedFoodName, setSelectedFoodName] = useState(null);
    const [selectedFoodDet, setSelectedFoodDet] = useState(null);
    const customOpen = (mainKey: string | React.SetStateAction<null>, value: any[] | React.SetStateAction<null>) => {
        open();
        setSelectedFoodName(mainKey)
        setSelectedFoodDet(value)
    }
    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);
    const { session: userSession, loading: isLoading } = useLogin();

    const checkout = (async () => {
        openOverlay();
        if (store) {
            if (finPrice) {
                //left with adding to order items for this portion.
                const res = await payItem(finPrice, "nicholassdl660@gmail.com");
                console.log(res)
                let checkoutID = "";
                let curusrid = ""
                if (res) {
                    closeOverlay();
                    checkoutID = res[1]
                }
                if (userSession && !isLoading) {
                    curusrid = userSession['user']['id']
                }
                if (curusrid && checkoutID && finPrice) {
                    const orderID = await addOrder(curusrid, finPrice, checkoutID) //orderid here
                    console.log(orderID)

                    let addonb = {}
                    let fp = 0
                    let q = 0
                    if (orderID) {
                        for (const k in cart) {
                            if (cart[k].length > 0) {
                                let currentItem = []
                                currentItem = cart[k]
                                if (currentItem) {
                                    currentItem.forEach((element: any) => {
                                        fp = element.finPrice
                                        q = element.totalAmt
                                        Object.entries(element).map(([key, value]) => {
                                            if (key != "finPrice" && key != "shopID" && key != "totalAmt" && key != "image") {
                                                fp = element.finPrice;
                                                console.log(fp)
                                                if (typeof value == "string") {
                                                    addonb[key] = value.toString();
                                                } else {
                                                    addonb[key] = value
                                                }

                                            }

                                        })

                                    });
                                }

                            }
                            console.log(cart[k][0])
                            let newSID = 0;
                            if (cart[k][0] !== undefined) {
                                newSID = cart[k][0].shopID
                            }
                            const orderID = await addOrder(curusrid, finPrice, checkoutID) //orderid here
                            if (orderID) {
                                const res = await addOrderItem(orderID, newSID, k, addonb, fp * q, q)
                            }

                        }
                        store.clearCart();
                        //window.location = res[0]
                    }
                }
            }

        }

    });
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const res = searchParams.get('cond')
        if (res == "pass") {
            notifications.show({
                title: 'You have successfully made a purchase',
                message: 'Please wait for your order and collect it',
                color: 'green'
            });
        } else {
            if (res == "fail") {
                notifications.show({
                    title: 'Your payment did not go through',
                    message: 'Please try again',
                    color: 'red'
                });
            }
        }
    }, [])
    let displayQuan = 0;
    console.log(cart)
    let temp = {};
    const [addonTemp, setAddonTemp] = useState({});

    useEffect(() => {
        const buildAddonTemp = async () => {
            const temp: any = {};

            for (const [name, orderSet] of Object.entries(cart)) {
                if (orderSet[0] !== undefined) {
                    const tempsid = orderSet[0].shopID;

                    try {
                        const result = await getAddon(tempsid, name);

                        for (const item of result) {
                            const foodAddons = item.food_addons;
                            const tempHolder: any[] = [];

                            if (foodAddons.length > 0) {
                                for (const addon of foodAddons) {
                                    tempHolder.push({ [addon.add_ons.addonName]: addon.add_ons.addon });
                                }
                                temp[name] = tempHolder;
                            }
                        }
                    } catch (err) {
                        console.error(`Error fetching add-ons for ${name}:`, err);
                    }
                }
            }

            setAddonTemp(temp);
        };

        buildAddonTemp();
    }, [cart]); // re-run this when cart updates



    console.log(addonTemp, 'line')

    let addonFromDB: any = [];



    return (
        <div>

            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: '#00B14F', type: 'bars' }}
            />

            <HeaderMegaMenu />
            <Container size='xl'>
                <Grid>
                    <Grid.Col span={{ xl: 9, lg: 9, md: 9, sm: 12, xs: 12 }} pt={30}>
                        <Card shadow="md" padding="lg" radius="md" withBorder>
                            <Space h={15} />
                            <Title order={3}>Your Meal Cart</Title>
                            <Space h={30} />
                            <Table.ScrollContainer minWidth={800} maxHeight={300}>
                                <Table withRowBorders={true} highlightOnHover style={{ width: '100%' }}>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th></Table.Th>
                                            <Table.Th>Product</Table.Th>
                                            <Table.Th>Other</Table.Th>
                                            <Table.Th>Original Price</Table.Th>
                                            <Table.Th>Final Price</Table.Th>
                                            <Table.Th>Quantity</Table.Th>
                                            <Table.Th>Subtotal</Table.Th>
                                            <Table.Th>Modifications</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {

                                            Object.entries(cart).map(([mainKey, v]) => {
                                                addonFromDB = addonTemp[mainKey]//calling the food alr
                                                console.log(addonFromDB)
                                                console.log(mainKey, v)
                                                return (
                                                    <>
                                                        {Array.isArray(v) &&
                                                            v.map((ele) => {
                                                                
                                                                displayQuan += ele.totalAmt
                                                                return (
                                                                    <Table.Tr onClick={ModalOpen}>
                                                                        <Table.Td>
                                                                            {(ele.image !== "") ?
                                                                                <Image src={ele.image} w={100} h={100} radius={10} /> :
                                                                                <></>}


                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            <Text fw={700}>{mainKey}</Text>

                                                                        </Table.Td>
                                                                        <Table.Td>
                                                                            {
                                                                                Object.entries(ele).map(([key, value]) => {
                                                                                    let curitemprice = 0;
                                                                                    let totalCurrentPrice = 0;

                                                                                    if (key !== "finPrice" && key !== 'shopID' && key !== 'image' && key !== 'totalAmt' && key !== 'price') {

                                                                                        if (addonFromDB !== undefined) {
                                                                                            addonFromDB.map((addonDet: any) => {
                                                                                                if (!Array.isArray(value)) {
                                                                                                    if (addonDet[key] !== undefined) {
                                                                                                        console.log(addonDet[key][value], key)
                                                                                                        curitemprice = addonDet[key][value]
                                                                                                    }
                                                                                                } else {
                                                                                                    if (addonDet[key] !== undefined) {
                                                                                                        value.forEach((i) => {
                                                                                                            console.log(addonDet[key], value, 'line 262')
                                                                                                            if (addonDet[key][i] !== undefined) {
                                                                                                                totalCurrentPrice += addonDet[key][i]
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        }

                                                                                        return (
                                                                                            <>
                                                                                                <Text size="xs" fw={700}>{key}</Text>
                                                                                                {


                                                                                                    (Array.isArray(value)) ?
                                                                                                        (
                                                                                                            <Text size='xs'>{value.toString()}, +S${totalCurrentPrice.toFixed(2)}</Text>
                                                                                                        )
                                                                                                        :
                                                                                                        (
                                                                                                            <Text size='xs'>{value}, +S${curitemprice}</Text>
                                                                                                        )

                                                                                                }


                                                                                            </>

                                                                                        );

                                                                                    }

                                                                                })}
                                                                        </Table.Td>
                                                                        <Table.Td>S${ele.price}</Table.Td>
                                                                        <Table.Td>S${ele.finPrice}</Table.Td>
                                                                        <Table.Td>{ele.totalAmt}</Table.Td>
                                                                        <Table.Td>S${(ele.finPrice * ele.totalAmt).toFixed(2)}</Table.Td>
                                                                        <Table.Td>

                                                                            <IconPencil />
                                                                            <IconTrash color="red" onClick={() => { customOpen(mainKey, v) }} />
                                                                        </Table.Td>
                                                                    </Table.Tr>
                                                                );
                                                            })}
                                                    </>
                                                );

                                            })}
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        </Card>
                        {/* cos this is a react COMPONENT */}
                        <Delete opened={opened} open={open} close={close} foodName={selectedFoodName} foodDet={selectedFoodDet} />
                    </Grid.Col>

                    <Grid.Col span={{ xl: 3, lg: 3, md: 3, sm: 12, xs: 12 }} pt={30}>



                        <Card withBorder radius='md' padding='lg' shadow="xl">
                            <Space h={15} />
                            <Title order={3}>Total Costs</Title>
                            <Space h={30} />
                            <Table.ScrollContainer minWidth={200}>
                                <Table variant="vertical">
                                    <TableTbody>
                                        <Table.Tr>
                                            <Table.Th w={160}>Total Quantity</Table.Th>
                                            <Table.Td>{displayQuan} Portions</Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Th w={160}>Subtotal</Table.Th>
                                            <Table.Td>S${finPrice.toFixed(2)}</Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Th w={160}>Total</Table.Th>
                                            <Table.Td>S${finPrice.toFixed(2)}</Table.Td>
                                        </Table.Tr>



                                        <Table.Tr>
                                            <Table.Td></Table.Td>
                                        </Table.Tr>

                                    </TableTbody>
                                </Table>
                            </Table.ScrollContainer>
                            <Group justify="space-between" grow gap='xs'>
                                <Button color="#00B14F" onClick={checkout}>Checkout</Button>
                                <Button onClick={empty} color="#ff3333">Clear Cart</Button>
                            </Group>

                        </Card>

                    </Grid.Col>
                </Grid>

            </Container>

            <FooterSimple />
        </div>
    )
}

function ModalOpen() {
    console.log('hello world')
}

//component only got 1 prop, multiple var
function Delete({
    opened,
    open,
    close,
    foodName,
    foodDet
}: {
    opened: boolean;
    open: () => void;
    close: () => void;
    foodName: string;
    foodDet: any
}) {
    const [curAmt, setNewAmt] = useState(0);

    //causes a infinite loop due to rendering.
    // if(foodDet!== null){
    //     setNewAmt(foodDet[0].totalAmt)
    // }

    useEffect(() => {
        if (foodDet !== null) {
            setNewAmt(foodDet[0].totalAmt)
        }
    }, [foodDet])


    const increaseAmt = () => {
        setNewAmt(curAmt + 1)
    }
    const decreaseAmt = () => {
        if (curAmt > 0) {
            setNewAmt(curAmt - 1)
        }
    }

    const store = useStore();
    console.log(store.cart)
    const makeChange = (kn: any, f: any) => {
        store.updateAmount(kn, f[0], curAmt)
        notifications.show({
            title: 'Modification Success',
            message: `You have made changes to ${kn}.`,
            color: '#FF5F15',
            position: 'bottom-right',

        })
        close();
    }
    const customClose = () => {
        close();
        setNewAmt(foodDet[0].totalAmt)
    }

    return (

        <>
            <Modal opened={opened} onClose={customClose} title={foodName} closeOnClickOutside>
                {foodDet !== null &&
                    <>
                        <Image
                            src={foodDet[0].image}
                        />
                        <Space h='0.5em' />

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Changes in amount setting */}
                            <ActionIcon variant="filled" color="#D3D3D3" radius="xl" size="md" onClick={decreaseAmt}>
                                <IconMinus stroke={2} />
                            </ActionIcon>
                            <Space w="md" />
                            <Text c='black' fw={700}>{curAmt}</Text>
                            <Space w="md" />
                            <ActionIcon variant="filled" color="#D3D3D3" radius="xl" size="md" onClick={increaseAmt}>
                                <IconPlus stroke={2} />
                            </ActionIcon>


                        </div>
                        <Space h='1em' />
                        <Button fullWidth color='#FF5F15' onClick={() => { makeChange(foodName, foodDet) }}>Update Changes</Button>

                    </>

                }


                {/* Modal content */}
            </Modal>


        </>
    );
}
export default Order;