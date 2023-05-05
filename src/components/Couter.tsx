import React, {useState} from 'react';
import './Counter.scss'
export const Couter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>increment me</button>
        </div>
    );
};