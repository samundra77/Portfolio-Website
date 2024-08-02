document.getElementById('portfolio-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const id = document.getElementById('project-id').value;
        const response = id ? 
            await fetch(`/api/portfolio/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
            }) :
            await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
            });

        if (!response.ok) throw new Error('Failed to add or update project');

        const result = await response.json();
        alert(result.message || 'Project added/updated successfully!');
        event.target.reset();
        document.getElementById('project-id').value = '';
        fetchProjects();
    } catch (error) {
        console.error('Error adding/updating project:', error);
    }
});

async function fetchProjects() {
    try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const projects = await response.json();

        const projectsDiv = document.getElementById('projects');
        projectsDiv.innerHTML = '';
        projects.forEach(proj => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <h3>${proj.projectName}</h3>
                <p>${proj.description}</p>
                <img src="${proj.imageUrl}" alt="${proj.projectName}">
                <button onclick="editProject('${proj._id}')">Edit</button>
                <button onclick="deleteProject('${proj._id}')">Delete</button>
            `;
            projectsDiv.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

async function editProject(id) {
    try {
        const response = await fetch(`/api/portfolio/${id}`);
        if (!response.ok) throw new Error('Failed to fetch project details');
        const project = await response.json();

        document.getElementById('project-name').value = project.projectName;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-image').value = project.imageUrl;
        document.getElementById('project-current').value = project.isCurrent;
        document.getElementById('project-id').value = id;
        document.querySelector('button[type="submit"]').textContent = 'Update Project';
    } catch (error) {
        console.error('Error editing project:', error);
    }
}

async function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            const response = await fetch(`/api/portfolio/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete project');

            const result = await response.json();
            alert(result.message || 'Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }
}

fetchProjects();
