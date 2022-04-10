import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'text': '',
            'users': '',
            'projects': '',
        }
    }

    handleSubmit(event) {
        this.props.newTodo(this.state.text, this.state.users, this.state.projects)
        event.preventDefault()
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let username = ''
        let allUsers = []
        let users = 0
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            username = event.target.selectedOptions.item(i).value
            allUsers = this.props.users.map((user) => user.username)
            users = allUsers.findIndex(k => k === username) + 1
        }
        this.setState({
            'users': users
        })
    }

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let projects = 0
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            projects = (parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'projects': projects
        })
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <input type='text' name='text' placeholder='Введите текст заметки'
                       onChange={(event) => this.handleTextChange(event)}
                       value={this.state.text}/>

                <br/>

                <select onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) =>
                        <option value={user.username}>
                            {user.username}
                        </option>)}
                </select>

                <br/>

                <select multiple onChange={(event) => this.handleProjectsChange(event)}>
                    {this.props.projects.map((project) =>
                        <option value={project.id}>
                            {project.name}
                        </option>)}
                </select>

                <br/>

                <input type="submit" value="Создать"/>
            </form>
        )
    }

}

export default TodoForm