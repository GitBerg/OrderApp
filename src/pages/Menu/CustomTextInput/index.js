import { useState } from "react";
import { TextInput, Keyboard } from "react-native";

import database from "../../../config/firebaseConfig";

export default function CustomTextInput(props){

    const [name, setName] = useState(props.name)
    const [focus, setFocus] = useState(false)



    const handleOnFocus = () => {
        setFocus(true)
    }

    const handleOnBlurAndUpdate = () => {
        let newArray = [...props.produtos]
        let upPrice = newArray[props.index].price
        newArray[props.index] = {name:name, price: upPrice}
        props.setProdutos([...newArray])
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").update({
            store:{
                menu: [...newArray],
                name: props.storeName
            }
        })
        setFocus(false)
    }

    const handleOnBlur = () => {
        setFocus(false)
    }


    return(
        <TextInput
            value={props.popUpOn?props.name:name}
            onChangeText={props.popUpOn?props.textChange:setName}
            placeholder={props?.placeholder}
            selectTextOnFocus={false}
            style={focus?[props.style, {borderBottomColor: "#f92e6a"}]: props.style}
            onFocus={handleOnFocus}
            onBlur={props.popUpOn?handleOnBlur:handleOnBlurAndUpdate}
        />
    )

}