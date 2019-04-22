import React, {Component} from 'react';
import '../../CSS/App.css';
import Websocket from 'react-websocket';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import logo from "../../Assets/logo.svg";
import as from "../../Assets/as.svg";
import google from "../../Assets/google-play-badge.svg";

let Datee = new Date();
let listItems;


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

            Prices: [],
            textForSearch: '',
            displayedContacts: [],
            showMore: false

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
        let oldPrices = this.state.displayedContacts;


        Object.keys(result).map((ldval, ldind) =>

            oldPrices.forEach((pval, pind) => {

                if (pval.id === ldval) {

                    oldPrices[pind].priceUsd = Object.values(result)[ldind];
                    // this.setState(this.state);

                    this.setState({
                        displayedContacts: oldPrices
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

            <div>
                <div className="VAZIRIIIIIIII">
                    {Date}
                    {Search}

                    <div style={{
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: this.state.showMore ? null : 330
                    }}>
                        {listItems}
                    </div>

                    <Button style={{margin:20,marginBottom:150}} onClick={this.showMore.bind(this)}
                            primary>{this.state.showMore ? "Show Less" : "Show More"}</Button>

                    <Websocket url='wss://ws.coincap.io/prices?assets=ALL'
                               onMessage={this.messageFromSocket.bind(this)}/>


                </div>


                <div className="Footer">

                    <div className="headerContainer">
                        <img src={logo} className="headerLogo" alt="headerLogo"/>

                        <div className="headerButtonsContainer">


                            <a target="_blank" rel="noopener noreferrer"
                               href="https://itunes.apple.com/us/app/coinix-cryptocurrency-price/id1456126185?ls=1&mt=8">
                                <img style={{width: 220, height: 80, margin: 10}} src={as} alt="m"/>
                            </a>
                            {/*<a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=io.coinix.coinix">*/}
                            {/*<img style={{width:240,height:80,margin:10}} src={require("./Assets/gp.png")} alt="m" />*/}
                            {/*</a>*/}
                            <a target="_blank" rel="noopener noreferrer"
                               href="https://play.google.com/store/apps/details?id=io.coinix.coinix">
                                <img style={{width: 220, height: 80, margin: 10}} src={google} alt="m"/>
                            </a>

                        </div>

                    </div>


                </div>
            </div>
        );
    }

    showMore() {
        if (this.state.showMore)
            this.setState({
                showMore: false
            });
        else
            this.setState({
                showMore: true
            });
    }

}

export default Home;

