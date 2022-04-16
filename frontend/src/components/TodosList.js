const TodoItem = ({todo, deleteTodo}) => {
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
            <td>
                <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </td>
        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
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
            <th>
                Delete?
            </th>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/> )}
        </table>
    )
}

export default TodoList