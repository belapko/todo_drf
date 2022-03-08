import React from "react";
import './App.css';
import UserList from "./components/UserList";
import axios from "axios";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import ProjectList from "./components/ProjectsList";
import TodoList from "./components/TodosList";
import Navbar from "./components/Menu";



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
            'todos': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (

            <body>

            <div className="content">
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>

            <Footer/>
            </body>

        )
    }
}

export default App;