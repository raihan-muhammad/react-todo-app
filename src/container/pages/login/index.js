import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/buttons";
import Auth from "../../templates/auth";
import { connect } from "react-redux";
import { loginAPI } from "../../../config/redux/action";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            pesan: ''
        }
    }

    hendleInput = el => {
        this.setState({
            [el.target.id]: el.target.value
        })
    }

    hendleLogin = async () => {
        const { email, password } = this.state;
        const { login, history } = this.props
        const res = await login({ email, password }).catch(err => err)
        if (res) {
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: '',
            });
            history.push('/dashboard')
        } else {
            this.setState({
                pesan: 'Login Gagal!'
            })
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login__kanan">
                    <p className="login__todo-text">Todo<span>App</span></p>
                    {
                        this.state.pesan !== '' ? (<p className="login__danger-text">{this.state.pesan}</p>) : null
                    }
                    <p className="login__login-text">Log In</p>
                    <input type="text" id="email" placeholder="Username" value={this.state.email} onChange={this.hendleInput} className="login__input" />
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.hendleInput} className="login__input" />
                    <p className="login__text-biasa">Belum mempunyai akun? <Link to="/register">daftar</Link></p>
                    <Button title="Login" onClick={this.hendleLogin} loading={this.props.isLoading} />
                </div>
                <Auth />
            </div>
        )
    }
}

const reduxState = state => ({
    isLoading: state.isLoading
})

const reduxDispatch = dispatch => ({
    login: data => dispatch(loginAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);