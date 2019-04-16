import React, {Component} from 'react';
import '../../CSS/App.css';
import 'react-dropdown/style.css';
import as from '../../Assets/as.svg'


class Apps extends Component {


    render() {


        return (
            <div  className="App">


                <div className="Land">
                    <img src={require("../../Assets/mock.png")} alt="m" className="mock"/>

                    {/*<div>*/}
                    {/*</div>*/}
                    <div className="downloadContainer">
                        <p style={{color:"#FFFFFF",fontWeight:"bold",fontSize:24}}>CoinIX Mobile Application</p>

                        <div className="downloadBTNContainer">
                            <a target="_blank" href="https://itunes.apple.com/us/app/coinix-cryptocurrency-price/id1456126185?ls=1&mt=8">
                                <img style={{width:220,height:80,margin:10}} src={as} alt="m" />
                            </a>
                            <a target="_blank" href="https://play.google.com/store/apps/details?id=io.coinix.coinix">
                            <img style={{width:240,height:80,margin:10}} src={require("../../Assets/gp.png")} alt="m" />
                            </a>
                        </div>
                    </div>

                </div>






            </div>
        );
    }
}

export default Apps;

