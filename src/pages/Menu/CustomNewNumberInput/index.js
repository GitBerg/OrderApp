import { useState } from "react";
import { TextInput } from "react-native";


export default function CustomNewNumberInput(props) {

    const [price, setPrice] = useState(JSON.stringify(props.price))
    const [focus, setFocus] = useState(false)

    const handleOnFocus = () => {
        setFocus(true)
    }

    const handleOnBlur = () => {
        setFocus(false)
    }

    return (
        <TextInput
            value={props.price}
            onChangeText={props.priceChange}
            selectTextOnFocus={true}
            style={focus ? [props.style, { borderBottomColor: "#f92e6a" }] : props.style}
            onFocus={handleOnFocus}
           onBlur={handleOnBlur}
            keyboardType={"number-pad"}
        />
    )

}