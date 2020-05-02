import React, { Component } from "react";
import Button from "../../../components/buttons";
import { connect } from "react-redux";
import Auth from "../../templates/auth";
import { registerAPI } from "../../../config/redux/action";
import { Link } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            success: ''
        }
    }

    hendleInput = el => {
        this.setState({
            [el.target.id]: el.target.value
        })
    }

    hendleRegister = async () => {
        const { email, password } = this.state;
        const res = await this.props.register({ email, password }).catch(err => console.log(err));
        if (res) {
            this.setState({
                email: '',
                password: '',
                success: 'Selamat! akun berhasil di tambah'
            })
        } else {
            console.log('register gagal');
        }
    }

    render() {
        return (
            <div className="login">
                <div className="login__kanan">
                    <p className="login__todo-text">Todo<span>App</span></p>
                    {
                        this.state.success !== '' ? (<p className="login__success-text">{this.state.success}</p>) : null
                    }
                    <p className="login__login-text">Register</p>
                    <input type="text" placeholder="Email" id="email" onChange={this.hendleInput} value={this.state.email} className="login__input" />
                    <input type="password" placeholder="Password" id="password" onChange={this.hendleInput} value={this.state.password} className="login__input" />
                    <p className="login__message">{this.props.error}</p>
                    <p className="login__text-biasa">Sudah mempunyai akun? <Link to="/">Login</Link></p>
                    <Button title="Register" onClick={this.hendleRegister} loading={this.props.isLoading} />
                </div>
                <Auth />
            </div >
        )
    }
}

const reduxState = state => ({
    isLoading: state.isLoading,
    error: state.isError
})

const reduxDispatch = dispatch => ({
    register: data => dispatch(registerAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);