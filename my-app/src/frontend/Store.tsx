import { FooterSimple } from "../components/footer";
import { HeaderMegaMenu } from "../components/navbar";
import { Image, Title, Container, Grid, Anchor, Breadcrumbs, Space, Badge, Text, Card, Group, Button, Input, Stack, CloseButton, Radio, Checkbox } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCurrentFood, useCurrentStore, useSingleFood } from "../backend/restaurants";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';
import { Accordion } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IconPencil } from '@tabler/icons-react';
import { sanitisePath, floatConvert } from "./helper";
import { IconAlertTriangleFilled } from '@tabler/icons-react';
function Store() {
    const location = useLocation();
    let { id } = useParams();
    const currentPath = location.pathname;
    const finWordArr = sanitisePath(currentPath)
    const [hasOthers, setOthers] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedFood, setSelected] = useState(null);
    const [foodDet, setFoodDet] = useState(null);
    const currentStoreDet = useCurrentStore(id);
    const storeID = currentStoreDet.id;
    const allFood = useCurrentFood(storeID);
    const [openAll, { toggle }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);

    const handleClose = () => {
        form.reset();
        errHolder.length = 0 // reset form to initial values
        close();      // close the modal (from useDisclosure)
    };
    const filteredFood = allFood.filter((item) =>
        item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    useEffect(() => {
        if (currentStoreDet.weekendOpening != "") {
            setOthers(true)
        }
        else {
            setOthers(false)
        }
    }, [])

    const items = finWordArr.map((item, index) => (
        <Anchor href={item.href} key={index} c='#00B14F' fw={500}>
            {item.title}
        </Anchor>
    ));
    const OpenModal = async (data: React.SetStateAction<null>) => {
        setSelected(data)
        const d = await useSingleFood(storeID, data)
        setFoodDet(d)
        open();
    }


    let addon = []
    let formDefault = {}
    let validateObject = {}
    if (opened) {
        if (foodDet && foodDet[0].food_addons.length > 0) {
            addon = foodDet[0].food_addons
        }
        if (addon) {
            addon.forEach((element: { add_ons: { addonName: any; }; }) => {
                var name = element.add_ons.addonName
                formDefault[name] = ""
                if (element.add_ons.type == 'c') {
                    validateObject[element.add_ons.addonName] = (value) => {
                        return (value === undefined)
                            ? "This field is required"
                            : null;
                    }
                }
            });
        }
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: formDefault,
        validate: validateObject
    });
    let errHolder: any[] | undefined = [];

    if (form.errors) {
        Object.entries(form.errors).map(([key, value]) => {
            errHolder.push(key)
        })
    }
    let currentOrder = {}
    const handleForm = (values: typeof form.values) => {
        console.log(values,foodDet[0].foodName)
        currentOrder[foodDet[0].foodName] = values
        // You can add any other logic here, like opening a modal, navigating, etc.
    };
    if(Object.keys(currentOrder).length > 0){
        console.log(currentOrder)
    }

    return (
        <div>
            <HeaderMegaMenu />
            <Container style={{ paddingTop: '1em' }}>
                <Grid style={{ 'width': '100%' }}>
                    <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }} >
                        <Space h="1em" />
                        <div>
                            <Image src={currentStoreDet.image} h={200} radius={10} style={{ width: '100%' }}></Image>
                            <Space h="2em" />
                            <Title style={{ fontFamily: 'system-ui', color: '#36454F' }}>Menu</Title>
                            <Space h='1em' />
                            <Input placeholder="Key in your search value" onChange={e => setQuery(e.target.value)} value={query}
                                leftSection={<IconSearch size={16} />}
                                radius='xl'
                                size='md'
                                rightSectionPointerEvents="auto"
                                rightSection={
                                    <CloseButton
                                        onClick={e => setQuery('')}
                                        style={{ display: query ? undefined : 'none' }}
                                    />
                                }
                            ></Input>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={{ xl: 8, lg: 8, md: 8, sm: 8, xs: 12 }}>
                        <div style={{ paddingLeft: '1em' }}>
                            <Breadcrumbs separator=">" separatorMargin="md" mt="xs">
                                {items}
                            </Breadcrumbs>
                            <Space h='1em' />
                            <Title order={1} size="h1" style={{ fontFamily: 'system-ui' }}>{id}</Title>
                            <Space h='1em' />
                            <Badge color="teal" variant="light" size="lg" children={currentStoreDet.school} />
                            <Space h='1em' />
                            <Text size='lg' fw={500} td="underline" title="Opening Hours">Opening Hours</Text>
                            <Text style={{ fontFamily: 'system-ui' }} fw={300}>{currentStoreDet.openingHours}</Text>
                            {hasOthers && <Text style={{ fontFamily: 'system-ui' }} fw={300}>{currentStoreDet.weekendOpening}</Text>}
                        </div>
                        <Space h="2em" />
                    </Grid.Col>
                </Grid>

            </Container>
            <Container style={{ paddingTop: '1em' }}>
                <Grid>
                    {
                        filteredFood.map((f) => {
                            let p = floatConvert(f.price)

                            return (

                                <Grid.Col span={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 12 }}>

                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                                        <Card.Section>

                                            {f.image != "" &&
                                                <Image src={f.image} height={200} alt="Norway" />
                                            }
                                        </Card.Section>

                                        <Stack justify="space-between" mt="md" mb="xs">
                                            <Text fw={500}>{f.foodName}</Text>
                                            <Group>
                                                <Badge color="#CC7722" size="lg">${p}</Badge>
                                                <Button variant="transparent" radius="xl" onClick={() => OpenModal(f.foodName)} style={{
                                                    marginLeft: 'auto',
                                                    border: '1px solid grey'
                                                }} size="xs">
                                                    <IconPlus size={18} color="black" />
                                                </Button>
                                            </Group>
                                        </Stack>
                                    </Card>
                                </Grid.Col>
                            )
                        })
                    }
                    {/* Modal Code */}
                    <>
                        <Modal opened={opened} onClose={handleClose} withCloseButton={false}>
                            {
                                (foodDet !== null && addon) &&
                                <>
                                    <Image src={foodDet[0].image} h={200} />
                                    <Space h="1em" />
                                    <Text fw={600}>{foodDet[0].foodName}</Text>
                                    <Space h="1em" />
                                    <Text fw={250}>${floatConvert(foodDet[0].price)}</Text>
                                    <Space h="1em" />
                                    {
                                        (Object.keys(form.errors).length > 0) &&
                                        (
                                            Object.entries(form.errors).map(([key, value]) => {
                                                return (
                                                    <>
                                                    <Text c='#bb2124' size='sm' fw={400}>{key} is empty.</Text>
                                                    <Space h='0.25em'/></>
                                                )
                                            })
                                        )
                                    }
                                    <form onSubmit={form.onSubmit(handleForm)} >
                                        {addon.map((AO: { add_ons: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
                                            let item = JSON.stringify(AO.add_ons.addon)
                                            item = JSON.parse(item)
                                            let isSingle = false;
                                            if (AO.add_ons.singleOrMulti == 's') {
                                                isSingle = true
                                            }
                                            return (
                                                <>

                                                    <Accordion transitionDuration={500} variant="filled" radius='lg' multiple defaultValue={errHolder}>
                                                        <Accordion.Item key={AO.add_ons.addonName} value={AO.add_ons.addonName}>
                                                            <Accordion.Control icon={
                                                                (AO.add_ons.addonName in form.errors) ?
                                                                    (<IconAlertTriangleFilled stroke={1.25} color='red' />) :
                                                                    (<IconPencil stroke={1.25} />)}>
                                                                {AO.add_ons.addonName}
                                                            </Accordion.Control>
                                                            <Accordion.Panel>

                                                                {!isSingle ? (

                                                                    <Checkbox.Group withAsterisk {...form.getInputProps(AO.add_ons.addonName, { type: 'checkbox' })} error={false}>
                                                                        <Space h="0.5em" />
                                                                        {
                                                                            Object.entries(item).map(([key, value]) => {
                                                                                return (
                                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                                                                        <Checkbox
                                                                                            mt="md"
                                                                                            key={form.key(key)}
                                                                                            value={key}
                                                                                            label={key}
                                                                                            size="sm"
                                                                                        />
                                                                                        <Text fw={350} size='sm' style={{ paddingTop: '0.75em' }}>+${floatConvert(value)}</Text>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Checkbox.Group>
                                                                ) : (
                                                                    <Radio.Group
                                                                        withAsterisk
                                                                        {...form.getInputProps(AO.add_ons.addonName)}
                                                                        error={false}
                                                                    >

                                                                        <Space h="0.5em" />
                                                                        {
                                                                            Object.entries(item).map(([key, value]) => {
                                                                                return (
                                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                                                                        <Radio
                                                                                            mt="md"
                                                                                            key={form.key(key)}
                                                                                            value={key}
                                                                                            label={key}
                                                                                            size="sm"
                                                                                            checked={false}

                                                                                        />

                                                                                        <Text fw={350} size='sm' style={{ paddingTop: '0.75em' }}>+${floatConvert(value)}</Text>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Radio.Group>
                                                                )
                                                                }
                                                            </Accordion.Panel>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                    <Space h="0.5em" />
                                                </>
                                            )
                                        })}
                                        <Button color="green" style={{ fontFamily: 'Helvetica', width: '100%' }} type="submit">Submit to order cart</Button>
                                    </form>
                                </>
                            }

                        </Modal>
                    </>
                </Grid>
            </Container>
            <FooterSimple />
        </div >

    )

}
export default Store;