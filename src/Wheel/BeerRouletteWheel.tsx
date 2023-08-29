import { useState, useEffect, FC } from 'react';
import { Wheel } from 'react-custom-roulette';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

type DataItem = {
    text: string;
    completeOption?: string;
    option?: string;
};

type Props = {
    data: DataItem[];
};

const BeerRouletteWheel: FC<Props> = ({ data }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteData, setRouletteData] = useState(data);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    useEffect(() => {
        const addShortString = data.map((item) => {
            return {
                text: item.text,
                completeOption: item.text,
                option: item.text.length >= 30 ? item.text.substring(0, 30).trimEnd() + '...' : item.text,
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    if (!rouletteData[prizeNumber]) return null;
    return (
        <div className="roulette-container" style={{ margin: 0, padding: 0 }}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center" style={{ color: 'white' }}>
                        Beer roulette
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        spinDuration={1}
                        prizeNumber={prizeNumber}
                        data={rouletteData}
                        outerBorderColor={'#ccc'}
                        outerBorderWidth={9}
                        innerBorderColor={'#f2f2f2'}
                        radiusLineColor={'tranparent'}
                        radiusLineWidth={1}
                        textColors={['#f5f5f5']}
                        textDistance={55}
                        fontSize={17}
                        backgroundColors={[
                            '#3f297e',
                            '#175fa9',
                            '#169ed8',
                            '#239b63',
                            '#64b031',
                            '#efe61f',
                            '#f7a416',
                            '#e6471d',
                            '#dc0936',
                            '#e5177b',
                            '#be1180',
                            '#871f7f',
                        ]}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSpinClick}>
                        Spin
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ color: 'white' }}>
                        Winner
                    </Typography>
                    <Typography variant="h5" align="center" style={{ color: 'white' }}>
                        {!mustSpin ? rouletteData[prizeNumber].completeOption : 'Playing...'}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default BeerRouletteWheel;
