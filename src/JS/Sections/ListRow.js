import React, {Component} from 'react';
import logo from '../Assets/logo.svg';
import '../CSS/App.css';

let Datee = new Date();
let listItems;

class ListRow extends Component {

    constructor() {
        super();
        this.state = {

            Prices: [],
            textForSearch: ''

        }
    }

    roundPrice(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    render() {



        return (
            <div className="App">

                <div className="Card" key={index}>
                    <div className="cardContainer">
                        <h6 className="cardNumber">{index + 1}</h6>

                        <div className="cardImageAndName">

                            <img src={`https://static.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`}
                                 alt="Computer Man" className="cardImage"/>

                            <div className="nameContainer">
                                <h6 className="cardName">{value.name}</h6>
                                <p className="cardSymbol">{value.symbol}</p>

                            </div>

                        </div>

                        <h6 className="cardPrice">${this.roundPrice(value.priceUsd, 4)}</h6>
                        <h6 className="cardMarketCap">${this.roundPrice(value.marketCapUsd, 4)}</h6>
                        <h6 className="cardSupply">{this.roundPrice(value.supply, 4)}</h6>
                        <h6 className="cardChange">{this.roundPrice(value.changePercent24Hr, 4)}</h6>


                    </div>
                </div>
            </div>
        );
    }
}

export default ListRow;

