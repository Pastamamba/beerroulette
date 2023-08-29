import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BeerRouletteWheel from './BeerRouletteWheel.tsx';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [newItemText, setNewItemText] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNewItemText(''); // tyhjennä tekstikenttä popoverin sulkemisen yhteydessä
    };

    const handleAddItem = () => {
        if (newItemText.trim() !== '') {
            setInputList((prevList) => [...prevList, { id: uuidv4(), text: newItemText }]);
            setNewItemText(''); // tyhjennä tekstikenttä lisäyksen jälkeen
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="main-form">
            <div className="text-title">
                <h2>Beer roulette</h2>
            </div>
            <Button onClick={handleClick}>Change items</Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {inputList.map((item, index) => (
                    <div key={item.id}>
                        <TextField
                            defaultValue={item.text}
                            onChange={(e) => {
                                const newList = [...inputList];
                                newList[index].text = e.target.value;
                                setInputList(newList);
                            }}
                        />
                        <Button
                            onClick={() => {
                                const newList = inputList.filter((_, idx) => idx !== index);
                                setInputList(newList);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
                <TextField
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Enter new item"
                />
                <Button onClick={handleAddItem}>Add Item</Button>
            </Popover>
            <BeerRouletteWheel data={inputList} />
        </div>
    );
};

export default WheelForm;
