import { HeaderMegaMenu } from "../components/navbar";
import { Text } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";

function Store(){
    let {id} = useParams();
    console.log(id);
    return (
        <div>
            <HeaderMegaMenu />
        <Text>{id}</Text>
    </div>

    )
    
}
export default Store;