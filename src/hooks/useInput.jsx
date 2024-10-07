import { useState } from "react";


export function useInput(){
    const [value, setValue] = useState('');

    const onChangeInput = (event) => {
        setValue(event.target.value);
    }

    return {
        value, 
        onChangeInput,
        setValue
    }
}