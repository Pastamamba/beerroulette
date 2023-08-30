import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BeerRouletteWheel from './BeerRouletteWheel.tsx';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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
    const [playerList, setPlayerList] = useState([
        {
            id: uuidv4(),
            text: 'Player 1 😋',
        },
        {
            id: uuidv4(),
            text: 'Player 2 😆',
        },
        {
            id: uuidv4(),
            text: 'Player 3 🤣',
        },
        {
            id: uuidv4(),
            text: 'Player 4 😃',
        },
    ]);
    const [advantages, setAdvantages] = useState([
        {
            id: uuidv4(),
            text: 'Skip card',
        },
        {
            id: uuidv4(),
            text: 'Nothing',
        },
        {
            id: uuidv4(),
            text: 'Share 3',
        },
        {
            id: uuidv4(),
            text: 'Drink 5',
        },
    ]);

    const [editingList, setEditingList] = useState<'players' | 'items' | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [newItemText, setNewItemText] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLElement>, listType: 'players' | 'items') => {
        setEditingList(listType);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setEditingList(null);
        setNewItemText('');
    };

    const handleAddItem = () => {
        if (newItemText.trim() !== '') {
            if (editingList === 'items') {
                setInputList((prevList) => [...prevList, { id: uuidv4(), text: newItemText }]);
            } else if (editingList === 'players') {
                setPlayerList((prevList) => [...prevList, { id: uuidv4(), text: newItemText }]);
            }
            setNewItemText('');
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                <Grid item xs={12} style={{ position: 'absolute', top: 0, left: 0, padding: '1em' }}>
                    <Button onClick={(e) => handleClick(e, 'players')}>Players</Button>
                </Grid>
                <Grid item xs={12} style={{ position: 'absolute', top: 0, right: 0, padding: '1em' }}>
                    <Button onClick={(e) => handleClick(e, 'items')}>Change roulette items</Button>
                </Grid>
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
                    {(editingList === 'items' ? inputList : playerList).map((item, index) => (
                        <div key={item.id}>
                            <TextField
                                defaultValue={item.text}
                                onChange={(e) => {
                                    const newList = editingList === 'items' ? [...inputList] : [...playerList];
                                    newList[index].text = e.target.value;
                                    if (editingList === 'items') {
                                        setInputList(newList);
                                    } else if (editingList === 'players') {
                                        setPlayerList(newList);
                                    }
                                }}
                            />
                            <Button
                                onClick={() => {
                                    const newList = (editingList === 'items' ? inputList : playerList).filter(
                                        (_, idx) => idx !== index
                                    );
                                    if (editingList === 'items') {
                                        setInputList(newList);
                                    } else if (editingList === 'players') {
                                        setPlayerList(newList);
                                    }
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
                <Grid item xs={8}>
                    <BeerRouletteWheel data={inputList} />
                </Grid>
            </Grid>
        </div>
    );
};

export default WheelForm;
