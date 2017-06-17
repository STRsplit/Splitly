import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MTP from 'material-ui/styles/MuiThemeProvider';
import MainNavBar from './MainNavBar'
import Style from './mainPage-css';
import LoginModal from '../components/loginModal'

const { container, heroStart, midSect, buttonContainer, internal, leftBox, navbar, rightBox, footer, heroInner, phonePhoto, topicLeft, topicRight, divider, footList } = Style

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  componentWillMount(){
    console.log('main', this.props)
  }

  handleLoginClick (e) {
    e.preventDefault();
    console.log('got here')
    let val = this.state.show

    this.setState({show: !val})
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
                    <LoginModal show={this.state.show} handleClick={this.handleLoginClick}/>
                    <button className="main-button">Signup</button>
                    <button className="main-button" onClick={this.handleLoginClick}>Login</button>
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


