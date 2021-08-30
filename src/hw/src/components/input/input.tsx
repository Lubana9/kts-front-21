import React from 'react';
import { useState } from 'react';
import "./style.css";

const Input: React.FC = () => {
    const [value, setValue] = useState('');


    const handelChange = (e: React.FormEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
    }

    return (
        <input className="input input-group_input" value={value} placeholder="Введите название организации" onChange={handelChange} ></input>
    );
}

export default Input;