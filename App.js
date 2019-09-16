import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Auth} from 'aws-amplify';



class App extends Component {
  state = {username: '', password: '', email: '', phoneNumber: '', authenticationCode: '', step: 0}

    onChange = e => {
      this.state({ [e.target.name]: e.target.value })
    }
    signUp = async () => {
      const {username, password, email, phoneNumber} = this.state
      try{
        await Auth.signUp({username, password, attributes: {email, phoneNumber} })
        console.log('Successfully signed up!')
        this.setState({step: 1})
      }catch(err){
        console.log('error signing up', err)
      }
    }
    confirmSignUp = async () => {
      const {username, authenticationCode} = this.state
      try{
        await Auth.confirmSignUp(username, authenticationCode)
        console.log('You have been successfully signed up!')

      }catch (err){
        console.log('error confirming sign up', err)
      }

    }
  render() {
    
    return (
      <div>
        {
          this.state.step === 0 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input}/>
              <input placeholder='password' onChange={this.onChange} name='password' type='password' style={styles.input}/>
              <input placeholder='email' onChange={this.onChange} name='email' style={styles.input}/>
              <input placeholder='phone number' onChange={this.onChange} name='phoneNumber' style={styles.input}/>
              <button onClick={this.signUp}>Sign up</button>
            </div>
          )
        }
        {
          this.state.step === 1 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input}/>
              <input placeholder='authentication code' onChange={this.onChange} name='authenticationCode' style={styles.input}/>
              
              <button onClick={this.confirmSignUp}>Confirm sign up</button>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  input: {
    height: 35, margin: 5
  }
}


export default App;