import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BeerRouletteWheel from './BeerRouletteWheel.tsx';

const WheelForm: FC = () => {
    const [inputList, setInputList] = useState([
        {
            id: uuidv4(),
            text: '3 beers',
        },
        {
            id: uuidv4(),
            text: '4 beers',
        },
        {
            id: uuidv4(),
            text: '5 beers',
        },
        {
            id: uuidv4(),
            text: '6 beers',
        },
        {
            id: uuidv4(),
            text: '7 beers',
        },
    ]);

    return (
        <div className="main-form">
            <div className="text-title">
                <h2>Beer roulette</h2>
            </div>
            <button
                onClick={() => {
                    setInputList([]);
                }}
            >
                Set input list
            </button>
            <BeerRouletteWheel data={inputList} />
        </div>
    );
};

export default WheelForm;
