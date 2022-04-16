const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            {
                project.repository ? <td>{project.repository}</td> : <td>None</td>
            }
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)}>Удалить</button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Repository
            </th>
            <th>
                Users
            </th>
            <th>
                Delete?
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList