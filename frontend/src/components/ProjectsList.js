const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            {project.repository ? <td>{project.repository}</td> : <td>None</td>}
            <td>
                {project.users}
            </td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
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

            {projects.map((project) => <ProjectItem project={project}/> )}
        </table>
    )
}

export default ProjectList