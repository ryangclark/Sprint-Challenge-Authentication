import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false,
    jokesList: []
  };

  formElement;
  usernameInput;
  passwordInput;

  getJokes(event) {
    event.preventDefault();
    axios
      .get('http://localhost:3300/api/jokes', {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => this.setState({ jokesList: response.data }))
      //   {
      //   if (response.status === 200) {
      //     console.log('get response.data', response.data);
      //     return response =>
      //       this.setState({
      //         jokesList: response.data
      //       });
      //   } else {
      //     console.log('bad getJokes response', response);
      //   }
      // })
      .catch(error => console.error(error));
  }

  login(credentials) {
    axios
      .post('http://localhost:3300/api/login', credentials)
      .then(response => {
        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
          localStorage.setItem('token', response.data.token);
        } else {
          console.log('bad login response', response);
        }
      })
      .catch(error => console.error(error));
  }

  logout(event) {
    event.preventDefault();
    console.log('logout running!');
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return this.setState({ isAuthenticated: false });
    } else {
      return console.error('cannot logout, no token in local storage');
    }
  }

  register(username, password) {
    axios
      .post('http://localhost:3300/api/register', {
        username,
        password
      })
      .then(response => {
        if (response.status === 201) {
          return this.login({ username, password });
        } else {
          console.log('bad register response', response);
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <h1>Dad Jokes</h1>
            {this.state.isAuthenticated ? (
              // <NavLink>Logout</NavLink>
              <button onClick={this.logout}>Logout</button>
            ) : // <NavLink>Login</NavLink>
            null}
          </nav>
        </header>
        {this.state.isAuthenticated ? (
          this.state.jokesList.length ? (
            <section className="dad-jokes">
              {this.state.jokesList.map(joke => (
                <div>{joke.joke}</div>
              ))}
            </section>
          ) : (
            <button onClick={this.getJokes}>Get Jokes!</button>
          )
        ) : (
          <section className="login-register">
            <form ref={node => (this.formElement = node)}>
              <label>
                Username:
                <br />
                <input
                  name="username"
                  ref={node => (this.usernameInput = node)}
                  type="text"
                />
                <br />
              </label>
              <label>
                Password:
                <br />
                <input
                  name="password"
                  ref={node => (this.passwordInput = node)}
                  type="password"
                />
                <br />
              </label>
              <div className="form-buttons">
                <button
                  onClick={event => {
                    event.preventDefault();
                    this.register(
                      this.usernameInput.value,
                      this.passwordInput.value
                    );
                  }}
                >
                  Register
                </button>
                <button
                  onClick={event => {
                    event.preventDefault();
                    this.login({
                      username: this.usernameInput.value,
                      password: this.passwordInput.value
                    });
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default App;
