const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            {todo.is_active ? <td>active</td> : <td>not active</td>}
            <td>
                {todo.project}
            </td>
            <td>
                {todo.creator}
            </td>
            <td>
                {todo.text}
            </td>
        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Is_active
            </th>
            <th>
                Project
            </th>
            <th>
                Creator
            </th>
            <th>
                Text
            </th>
            {todos.map((todo) => <TodoItem todo={todo}/> )}
        </table>
    )
}

export default TodoList