import { Text } from "@mantine/core";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

function Store(){
    let {id} = useParams();
    console.log(id);
    return (
        <div>
            
        <Text>{id}</Text>
    </div>

    )
    
}
export default Store;