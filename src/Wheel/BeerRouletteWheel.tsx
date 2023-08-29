import { useState, useEffect, FC } from 'react';
import { Wheel } from 'react-custom-roulette';

type DataItem = {
    text: string;
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
                completeOption: item.text,
                option: item.text.length >= 30 ? item.text.substring(0, 30).trimEnd() + '...' : item.text,
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    if (!rouletteData[prizeNumber]) return null;

    return (
        <>
            <div className="roulette-container">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={0.2}
                    prizeNumber={prizeNumber}
                    data={rouletteData}
                    outerBorderColor={'#ccc'}
                    outerBorderWidth={9}
                    innerBorderColor={'#f2f2f2'}
                    radiusLineColor={'tranparent'}
                    radiusLineWidth={1}
                    textColors={['#f5f5f5']}
                    textDistance={55}
                    fontSize={10}
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
                <button className="button roulette-button" onClick={handleSpinClick}>
                    Spin
                </button>
            </div>
            <br />
            <div className="prize-message" onClick={handleSpinClick}>
                <h2>Winner</h2>
                {!mustSpin ? rouletteData[prizeNumber]['completeOption'] : 'Playing...'}
            </div>
        </>
    );
};

export default BeerRouletteWheel;
