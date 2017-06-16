import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MTP from 'material-ui/styles/MuiThemeProvider';
import MainNavBar from './MainNavBar'
import Style from './mainPage-css';

const { container, heroStart, midSect, buttonContainer, internal, leftBox, navbar, rightBox, footer, heroInner, phonePhoto, topicLeft, topicRight, divider, footList } = Style

class Main extends Component {
  componentWillMount(){
    console.log('main', this.props)
  }


  render() {

    return (
      <div className="innerContainer">
        <MainNavBar signedIn={this.props.signedIn} onSignIn={this.props.onSignIn} />
          <div className='backgroundImage'>
          <div style={heroInner}>
            <div style={leftBox}>
              <div style={internal}>
                <h2>Splitly</h2>
                <h3>Split checks, without the awkwardness.</h3>
                <p>Introducing Splitly, an easier way to keep track of and settle bills among friends. </p>
                  <div style={buttonContainer}>
                    <button className="main-button">Signup</button>
                    <button className="main-button">Login</button>
                  </div>
              </div>
            </div>
            <div style={rightBox}/>
          </div>
        </div>
        <div style={midSect}>
          <p>Splitly - Split checks, without the awkwardness.</p>
        </div>
      </div>
    )
  }
}

export default Main;


