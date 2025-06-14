import { FooterSimple } from "../components/footer";
import { HeaderMegaMenu } from "../components/navbar";
import { Image, Title, Container, Grid, Anchor, Breadcrumbs, Space, Badge, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCurrentStore } from "../backend/restaurants";

function sanitisePath(str: any) {
    let finString = "Home" + decodeURIComponent(str)
    let finWordArr = finString.split("/")
    for (let k = 0; k < finWordArr.length; k++) {
        finWordArr[k] = finWordArr[k].charAt(0).toUpperCase() + finWordArr[k].slice(1)
    }
    let finArr = [];
    for (let k = 0; k < finWordArr.length; k++) {
        if (finWordArr[k] === "Home" || finWordArr[k] === "Store") {
            finArr[k] = { title: finWordArr[k], href: "/" }
        } else {
            let h: any = "/store/" + finWordArr[k]
            finArr[k] = { title: finWordArr[k], href: h }
        }
    }

    return finArr
}
function Store() {
    const location = useLocation();
    let { id } = useParams();
    const currentPath = location.pathname;
    const finWordArr = sanitisePath(currentPath)

    const [hasOthers, setOthers] = useState(false);
    const currentStoreDet = useCurrentStore(id);
    useEffect(() => {

        if (currentStoreDet.weekendOpening != "") {
            setOthers(true)
        }
        else {
            setOthers(false)
        }
    }, [])
    console.log(hasOthers)
    const items = finWordArr.map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <div>
            <HeaderMegaMenu />
            <Container style={{ paddingTop: '1em' }}>
                <Grid>
                    <Grid.Col span={12}>
                        <Space h="1em" />
                        <div style={{ display: "flex" }}>
                            <div>
                                <Image src={currentStoreDet.image} w={200} h={200} radius={10}></Image>
                                <Space h="2em"/>
                                <Title style={{fontFamily:'system-ui', color: '#36454F'}}>Menu</Title>
                            </div>
                            <div style={{ paddingLeft: '1em' }}>
                                <Breadcrumbs separator=">" separatorMargin="md" mt="xs">
                                    {items}
                                </Breadcrumbs>
                                <Space h='1em'/>
                                <Title order={1} size="h1" style={{ fontFamily: 'system-ui' }}>{id}</Title>
                                <Space h='1em'/>
                                <Badge color="teal" variant="light" size="lg">{currentStoreDet.school}</Badge>
                                <Space h='1em'/>
                                <Text size='lg' fw={500} td="underline">Opening Hours</Text>
                                <Text style={{fontFamily:'system-ui'}} fw={300}>{currentStoreDet.openingHours}</Text>
                                {hasOthers && <Text style={{fontFamily:'system-ui'}} fw={300}>{currentStoreDet.weekendOpening}</Text>}
                            </div>
                        </div>


                    </Grid.Col>
                </Grid>

            </Container>

            <FooterSimple />
        </div>

    )

}
export default Store;