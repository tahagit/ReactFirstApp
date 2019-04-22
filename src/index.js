import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './JS/Pages/Home'
import * as serviceWorker from './serviceWorker'
import logo from "./Assets/logo.svg";
import './CSS/App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Charts from './JS/Pages/Charts'
import Apps from './JS/Pages/Apps'
import as from "./Assets/as.svg";
import google from "./Assets/google-play-badge.svg";


export default function App() {

    document.body.style.backgroundColor = "#f3f3f3";

    return (

        <Router>


            <div style={{
                textAlign: "center",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>

                <div className="Header">

                    <div className="headerContainer">
                        <img src={logo} className="headerLogo" alt="headerLogo"/>

                        <div className="headerButtonsContainer">

                            <Link to="/home" className="menuTexts">Home</Link>
                            <Link to="/disclaimer" className="menuTexts">Disclaimer</Link>
                            <Link to="/charts" className="menuTexts">Charts</Link>
                            <Link to="/apps" className="menuTexts">Mobile Apps</Link>
                            <Link to="/policies" className="menuTexts">Policy</Link>


                        </div>

                    </div>


                </div>

                <Route path="/" exact component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/policies" component={Home}/>
                <Route path="/disclaimer" component={Home}/>
                <Route path="/charts/" component={Charts}/>
                <Route path="/apps" component={Apps}/>





            </div>

        </Router>

    );


}


ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
