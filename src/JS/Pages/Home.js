import React, {Component} from 'react';
import '../../CSS/App.css';
import Websocket from 'react-websocket';

let Datee = new Date();
let listItems;


class Home extends Component {

    constructor() {
        super();
        this.state = {

            Prices: [],
            textForSearch: '',
            displayedContacts: []

        }
    }


    componentWillMount() {

        this.getData();

    }


    async getData() {

        try {

            // let ld = [];
            let response = await fetch('https://api.coincap.io/v2/assets');
            let resp = await response.json();

            if (resp) {
                this.setState({
                    Prices: resp.data,
                    displayedContacts: resp.data
                });


            }


        } catch (e) {

        }


    }


    roundPrice(x, y) {
        return Number.parseFloat(x).toFixed(y);
    }

    roundChange(x) {
        return Number.parseFloat(x).toFixed(2);
    }

    messageFromSocket(data) {
        let result = JSON.parse(data);
        let oldPrices=this.state.Prices;


        Object.keys(result).map((ldval, ldind) =>

            oldPrices.forEach((pval, pind) => {

                    if (pval.id === ldval) {

                        oldPrices[pind].priceUsd = Object.values(result)[ldind];
                        // this.setState(this.state);

                        this.setState( {
                            displayedContacts:oldPrices
                        })

                    }


                })

        )

    }

    handleSearch(event) {
        // listItems =[];
        this.setState({
            textForSearch: event.target.value
        });

        let searcjQery = event.target.value.toLowerCase(),
            displayedContacts = this.state.Prices.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            });
        this.setState({
            displayedContacts: displayedContacts
        })


    }

    render() {


        let Date = <div className="dateContainer">
            <h6 className="dateContainerTitle">Top Crypto Currency Prices</h6>
            <h6 className="dateContainerDate">{Datee.getFullYear() + '-' + (Datee.getMonth() + 1) + '-' + Datee.getDate()} ({Datee.getHours() + ":" + Datee.getMinutes() + ":" + Datee.getSeconds()})</h6>
        </div>;

        let Search = <div className="searchCard">
            <input value={this.state.textForSearch} onChange={this.handleSearch.bind(this)} className="searchInput"
                   type="text" name="name" placeholder="Search your cryptocurrency"/>
        </div>;


        listItems =
            this.state.displayedContacts.map((value, index) =>
                <div className="Card" key={index}>
                    <div className="cardContainer aliV">
                        <h6 className="cardNumber aliV">{index + 1}</h6>

                        <div className="cardImageAndName aliV">

                            <img src={`https://static.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`}
                                 alt="Computer Man" className="cardImage"/>

                            <div className="nameContainer">
                                <h6 className="cardName">{value.name}</h6>
                                <p className="cardSymbol">{value.symbol}</p>

                            </div>

                        </div>

                        <h6 className="cardPrice aliV">${this.roundPrice(value.priceUsd, 3)}</h6>
                        <h6 className="cardMarketCap aliV">${this.roundChange(value.marketCapUsd)}</h6>
                        <h6 className="cardSupply aliV">{this.roundChange(value.supply)}</h6>
                        <h6 className="cardChange aliV">{this.roundChange(value.changePercent24Hr)}</h6>


                    </div>
                </div>
            );

        return (
            <div className="App">

                <div className="VAZIRIIIIIIII">
                    {Date}
                    {Search}
                    {listItems}
                </div>
                <Websocket url='wss://ws.coincap.io/prices?assets=ALL'
                           onMessage={this.messageFromSocket.bind(this)}/>



            </div>
        );
    }
}

export default Home;

