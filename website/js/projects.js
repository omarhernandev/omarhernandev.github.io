// Placeholder project data
const projects = [
  {
    title: 'Keystone',
    year: 2024,
    description: 'Full-stack sentiment-analysis tool used for analyzing customer feedback and improving product quality',
    tools: ['Python', 'AWS', 'CI/CD', 'Git', 'PostgreSQL', 'Apache Airflow']
  },
  {
    title: 'Accessing Cortical Excitability',
    year: 2018,
    description: 'Predicting motor cortex excitability in older patients with stroke history in response to high intensity internval training (HIIT), to improve rehabilitation outcomes',
    tools: ['Python', 'Matlab', 'Neuroscience', 'AFNI', 'fMRI']
  },
  {
    title: 'LedgerTrac',
    year: 2024,
    description: 'Automated secure EPPS reporting and client statement generation platform with zero-trust credential handling, built for LeadTrac’s high-volume financial workflows',
    tools: ['Python', 'AI (Yolo V5)', 'Robotics']
  },
  {
    title: 'Neural Prosthesis Control',
    year: 2022,
    description: 'Neural prosthesis control system for a patient with a spinal cord injury',
    tools: ['Python', 'PsychoPy', 'Matlab','Neuroscience', 'fMRI']
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