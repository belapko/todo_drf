import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login': '',
            'password': ''
        }
    }


    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault() // Метод запретит обрабатывать стандартные события

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value // Присваиваем значение по полю name, благодаря чему можем использовать один обработчик onChange

        })
    }


    render() {
        return (
            <form onSubmit={(event => this.handleSubmit(event))}>
                <input type='text' name='login' placeholder='Логин' onChange={(event => this.handleChange(event))}
                       value={this.state.login}/>
                <br/>
                <input type="password" name='password' placeholder='Пароль'
                       onChange={(event => this.handleChange(event))} value={this.state.password}/>
                <br/>
                <input type="submit" value='Войти'/>
            </form>
        )
    }
}

export default LoginForm