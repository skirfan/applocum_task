import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { login } from "../actions/user";
import { routes } from "../config/routes";
import { ts, te } from "../helpers/funs";
import Users from "../datasource/users.json";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      users: []
    };
  }

  componentDidMount() {
    const localStorIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (
      typeof localStorIsLoggedIn !== "undefined" &&
      localStorIsLoggedIn === "true"
    ) {
      this.props.history.push(routes.HOME);
    }
    const users = [...this.state.users];
    Users.users.forEach(res => {
      users.push(res);
    });
    this.setState({
      users
    });
  }

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, users } = this.state;
    const { dispatch, history } = this.props;
    let error = true;
    users.forEach(res => {
      if (res.email === email && res.password === password) {
        dispatch(login(email));
        history.push(routes.HOME);
        ts(`Welcome ${email}`);
        error = false;
      }
      return error;
    });
    error === true && te(`No Account Available With Given Email`);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form method="POST" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  name="email"
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Login);
