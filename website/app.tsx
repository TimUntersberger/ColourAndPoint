import React from "react";
const styles = require("/app.css");

export default class App extends React.Component{
  usernameInput = React.createRef<HTMLInputElement>();
  passwordInput = React.createRef<HTMLInputElement>();

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="container">
        <div className={`control ${styles.loginForm} ${styles.container}`}>
          <div className="field">
            <label className="label">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              placeholder="Enter your username..." 
              className="input" 
              ref={this.usernameInput}
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password..." 
              className="input"
              ref={this.passwordInput}
            />
          </div>
          <button className="button is-link" type="submit" onClick={this.handleLoginClick.bind(this)}> LOGIN </button>
        </div>
      </div>
    );
  }

  async handleLoginClick(event: React.MouseEvent<HTMLButtonElement>) {
    const username = this.usernameInput.current.value;
    const password = this.passwordInput.current.value;
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Basic ${this._build_authorization_token(username, password)}`);

    const response = await fetch("localhost:8080/login", {
      method: "post",
      headers
    })
  }

  _build_authorization_token(username: String, password: String): String{
    return btoa(`${username}:${password}`);
  }
}