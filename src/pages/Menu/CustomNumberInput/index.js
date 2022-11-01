import { useState } from "react";
import { TextInput } from "react-native";

import database from "../../../config/firebaseConfig";

export default function CustomNumberInput(props) {

    const [price, setPrice] = useState(JSON.stringify(props.price))
    const [focus, setFocus] = useState(false)


    const handleOnFocus = () => {
        setFocus(true)
    }

    const handleOnBlurAndUpdate = () => {
        let newArray = [...props.produtos]
        let upName = newArray[props.index].name
        newArray[props.index] = {name:upName, price: Number(price)}
        props.setProdutos([...newArray])
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").update({
            store:{
                menu: [...newArray]
            }
        })
        setFocus(false)
        props.setPopUp(false)
    }

    const handleOnBlur = () => {
        setFocus(false)
    }

    return (
        <TextInput
            value={props.popUpOn ? props.price : price}
            onChangeText={props.popUpOn ? props.priceChange : setPrice}
            selectTextOnFocus={true}
            style={focus ? [props.style, { borderBottomColor: "#f92e6a" }] : props.style}
            onFocus={handleOnFocus}
            onBlur={props.popUpOn?handleOnBlur:handleOnBlurAndUpdate}
            keyboardType={"number-pad"}
        />
    )

}