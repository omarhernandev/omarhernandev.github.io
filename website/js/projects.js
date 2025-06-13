// Placeholder project data
const projects = [
  {
    title: 'TravelTrolly',
    year: 2024,
    description: 'Personal project (In development)',
    tools: ['Swift', 'SwiftUI', 'Xcode', 'Postman']
  },
  {
    title: 'Vakary',
    year: 2024,
    description: 'School project as part of the EIP',
    tools: ['Swift', 'SwiftUI', 'Xcode', 'Postman', 'MongoDB', 'Docker']
  },
  {
    title: 'Boston Dynamics Spot Detection',
    year: 2022,
    description: 'Project carried out as part of my internship at ALERION',
    tools: ['Python', 'AI (Yolo V5)', 'Robotics']
  },
  {
    title: 'Point Cloud Visualization',
    year: 2022,
    description: 'Project carried out as part of my internship at ALERION',
    tools: ['ReactJS', 'Docker']
  }
  // Add more projects as needed
];

function renderProjects(filteredProjects) {
  const container = document.getElementById('projects-list');
  container.innerHTML = '';
  if (filteredProjects.length === 0) {
    container.innerHTML = '<p>No projects match the selected filters.</p>';
    return;
  }
  filteredProjects.forEach(project => {
    const tools = project.tools.map(tool => `<span class="project-tool">${tool}</span>`).join(' ');
    container.innerHTML += `
      <div class="project-card">
        <div class="project-year">${project.year}</div>
        <div class="project-title">${project.title}</div>
        <div class="project-desc">${project.description}</div>
        <div class="project-tools">${tools}</div>
      </div>
    `;
  });
}

function getSelectedTools() {
  return Array.from(document.querySelectorAll('#filter-form input[type=checkbox]:checked')).map(cb => cb.value);
}

function filterProjects() {
  const selected = getSelectedTools();
  if (selected.length === 0) {
    renderProjects(projects);
    return;
  }
  const filtered = projects.filter(project =>
    selected.every(tool => project.tools.includes(tool))
  );
  renderProjects(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects(projects);
  document.getElementById('filter-form').addEventListener('change', filterProjects);
}); 