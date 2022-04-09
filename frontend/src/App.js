import React from "react";
import './App.css';
import UserList from "./components/UserList";
import axios from "axios";
import Footer from "./components/Footer";
import {BrowserRouter, Link, Route, Routes, useLocation} from "react-router-dom";
import ProjectList from "./components/ProjectsList";
import TodoList from "./components/TodosList";
import Navbar from "./components/Menu";
import LoginForm from "./components/LoginForm";


const NotFound = () => {
    let location = useLocation()
    return (
        <div className="notfound"><h1>Page {location.pathname} not found!</h1></div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    getData() {
        let headers = this.getHeader()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
                })
        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
                })
        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todos': []
                })
                })
    }

    componentDidMount() {
        let token  = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData) // Callback - не вызываем напрямую
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        // console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                // console.log(token)
                localStorage.setItem('token', token) // Аналог cookies для хранения токена
                this.setState({
                    'token': token
                }, this.getData) // Будет вызвана после того, как состояние действительно будет обновлено
                // this.getData() // Не факт, что будет вызвана, когда закончится асинхронная операция
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }

    deleteTodo(id) {
        let headers = this.getHeader()
        console.log(id)
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({
                    'todos': this.state.todos.filter((todo) => todo.id !== id)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(id) {
        let headers = this.getHeader()
        console.log(id)
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    'projects': this.state.projects.filter((project) => project.id !== id)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (

            <body>

            <div className="content">
                <BrowserRouter>
                    <nav>
                        <li>{ this.isAuth()
                            ? <button onClick={()=>this.logout()} >Выйти</button>
                            : <Link to='/login'>Войти</Link> }</li>
                    </nav>
                    <Navbar/>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/login' element={<LoginForm getToken={(login, password) =>
                            this.getToken(login, password)}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>

            <Footer/>
            </body>

        )
    }
}

export default App;