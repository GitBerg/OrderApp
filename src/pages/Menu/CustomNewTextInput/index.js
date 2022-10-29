import { useState } from "react";
import { TextInput, Keyboard } from "react-native";


export default function CustomNewTextInput(props){

    const [name, setName] = useState(props.name)
    const [focus, setFocus] = useState(false)



    const handleOnFocus = () => {
        setFocus(true)
    }

    const handleOnBlur = () => {
        setFocus(false)
    }


    return(
        <TextInput
            value={props.name}
            onChangeText={props.textChange}
            placeholder={props.placeholder}
            selectTextOnFocus={false}
            style={focus?[props.style, {borderBottomColor: "#f92e6a"}]: props.style}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            
        />
    )

}