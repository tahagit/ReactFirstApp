import React, {Component} from 'react';
import '../../CSS/App.css';

import {Chart} from "react-charts";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

let Datee = new Date();
let prData = [[0, 123], [1, 22]];

class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Prices: [],
            textForSearch: '',
            fwf:'',
            anchorEl: null,


            ind: 0
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
                    Prices: resp.data
                });


            }


        } catch (e) {

        }


    }


    async clickl(event) {

        // console.log(event.value);

        try {
            prData = [];

            let currentTime = Datee.getTime();
            let response = await fetch(`https://api.coincap.io/v2/assets/${event.value}/history?interval=h1&start=${currentTime - 86400000}&end=${currentTime}`);
            let resp = await response.json();

            if (resp) {

                // prData = resp.data;
                console.log(resp.data);
                resp.data.map((value, index) =>
                    prData.push([index, parseFloat(value.priceUsd)])
                );

                this.setState({
                    fwf: <Chart style={{width: "100%", height: "400px", margin: "10px"}}
                                 data={[
                                     {
                                         label: "Series 1",
                                         data: prData
                                     }
                                 ]}
                                 axes={[
                                     {primary: true, type: "linear", position: "bottom"},
                                     {type: "linear", position: "left"}
                                 ]}
                />


                })

            }


        } catch (e) {

        }
    }

    render() {

        let Date = <div className="dateContainer">
            <h6 className="dateContainerTitle">Charts</h6>
            <h6 className="dateContainerDate">{Datee.getFullYear() + '-' + (Datee.getMonth() + 1) + '-' + Datee.getDate()} ({Datee.getHours() + ":" + Datee.getMinutes() + ":" + Datee.getSeconds()})</h6>
        </div>;

        let chooselistItems =
            this.state.Prices.map((value, index) =>
                value.id
            );

        // const defaultOption = chooselistItems[0];

        return (
            <div className="App">

                <div className="VAZIRIIIIIIII">
                    {Date}


                    <Dropdown options={chooselistItems} onChange={(event) => {this.clickl(event)}}
                              placeholder="Choose Currency"/>

                    {this.state.fwf}

                </div>


            </div>
        );
    }
}

export default Charts;

