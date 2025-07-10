// Projects data
const projectsData = [
    {
        id: 'financial-ledger',
        title: 'Financial Ledger Automation Platform',
        shortDesc: 'Reduced processing time by 98% for client financial ledgers',
        icon: '📊',
        tags: ['Full-Stack', 'FinTech', 'Automation'],
        techStack: ['React', 'Flask', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        category: 'Full-Stack',
        timeIndicator: '1 min',
        primaryMetric: 'processing time by 98%',
        impact: {
            processingTime: { before: '60 min', after: '1 min' },
            users: '50+ daily',
            transactions: '$2M+ monthly'
        },
        challenge: 'Back-office teams spent 60 minutes manually creating client financial ledgers, pulling data from 3 different systems with high error rates and no standardization.',
        solution: 'Built a full-stack automation platform that integrates with CRM, payment systems, and Excel trackers, provides real-time dashboard for request management, and generates audit-ready PDF/Excel reports.',
        features: [
            'RESTful API with 40+ endpoints',
            'Real-time WebSocket updates',
            'Async task processing with Celery',
            'Role-based access control',
            '85% test coverage'
        ],
        architecture: {
            frontend: ['React 18.2', 'Redux', 'Material-UI', 'WebSockets'],
            backend: ['Flask 2.3', 'Celery', 'Pandas', 'SQLAlchemy'],
            database: ['PostgreSQL', 'Redis'],
            devops: ['Docker', 'AWS EC2', 'Nginx', 'CI/CD']
        },
        codeSnippet: `class LedgerCalculator:
    def calculate_payment_schedule(self, client_data):
        """Calculate optimized payment schedule with fee validation"""
        setup_fee = self._validate_setup_fee(client_data.program_type)
        program_fee = self._calculate_program_fee(
            client_data.debt_amount,
            client_data.settlement_percentage
        )
        
        # Use hash map for O(1) lookups instead of nested loops
        payment_cache = self._build_payment_cache(client_data.payments)
        
        return PaymentSchedule(
            setup_fee=setup_fee,
            program_fee=program_fee,
            cleared_payments=payment_cache.get_cleared_count(),
            next_settlement=self._calculate_next_settlement(payment_cache)
        )`,
        challenges: [
            { problem: 'Excel parsing was O(n²)', solution: 'Implemented hash maps', result: '10x faster processing' },
            { problem: 'API rate limits', solution: 'Redis caching layer', result: '60% fewer API calls' },
            { problem: 'Complex financial calculations', solution: 'Custom SQL queries', result: '5x query performance' }
        ]
    },
    {
        id: 'medical-dashboard',
        title: 'Medical Data Dashboard',
        shortDesc: 'Real-time analytics platform for 10,000+ tumor database',
        icon: '🏥',
        tags: ['Full-Stack', 'Healthcare', 'Data Viz'],
        techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
        category: 'Full-Stack',
        timeIndicator: '10,000+ tumors',
        primaryMetric: '10,000+ tumor database',
        impact: {
            dataPoints: '10,000+ tumors',
            users: '300+ researchers',
            accuracy: '95% diagnostic improvement'
        },
        challenge: 'Medical researchers needed a way to analyze and visualize complex tumor data from multiple sources to improve diagnostic accuracy and research outcomes.',
        solution: 'Developed a comprehensive dashboard with real-time data visualization, advanced filtering capabilities, and machine learning-powered insights for tumor analysis.',
        features: [
            'Interactive data visualization with D3.js',
            'Real-time data synchronization',
            'Advanced filtering and search',
            'Export capabilities for research papers',
            'Machine learning insights'
        ],
        architecture: {
            frontend: ['React', 'Chart.js', 'Material-UI', 'WebSockets'],
            backend: ['Node.js', 'Express', 'JWT Authentication'],
            database: ['MongoDB', 'Redis Cache'],
            devops: ['AWS Lambda', 'CloudWatch', 'S3']
        }
    },
    {
        id: 'clinical-trial-api',
        title: 'Clinical Trial Matcher API',
        shortDesc: 'AI-powered patient matching for clinical trials',
        icon: '🔬',
        tags: ['Backend', 'Healthcare', 'Machine Learning'],
        techStack: ['Python', 'FastAPI', 'PostgreSQL', 'TensorFlow', 'Docker'],
        category: 'Backend',
        timeIndicator: '<100ms',
        primaryMetric: '85% matching accuracy',
        impact: {
            endpoints: '25+ RESTful',
            matching: '85% accuracy',
            response: '<100ms avg'
        },
        challenge: 'Healthcare providers struggled to efficiently match patients with appropriate clinical trials, leading to missed opportunities and slower research progress.',
        solution: 'Built an AI-powered API that analyzes patient data and matches them with suitable clinical trials using machine learning algorithms and comprehensive eligibility criteria.',
        features: [
            'RESTful API with 25+ endpoints',
            'Machine learning patient matching',
            'Real-time eligibility checking',
            'Comprehensive trial database',
            'HIPAA compliant data handling'
        ],
        architecture: {
            backend: ['FastAPI', 'TensorFlow', 'Scikit-learn', 'Pandas'],
            database: ['PostgreSQL', 'Redis'],
            security: ['JWT', 'OAuth2', 'HIPAA Compliance'],
            devops: ['Docker', 'Kubernetes', 'monitoring']
        }
    },
    {
        id: 'patient-scheduler',
        title: 'Patient Appointment Scheduler',
        shortDesc: 'Real-time scheduling with SMS notifications',
        icon: '📱',
        tags: ['Frontend', 'Healthcare', 'Real-time'],
        techStack: ['Vue.js', 'TypeScript', 'Socket.io', 'Twilio', 'Google Calendar'],
        category: 'Frontend',
        timeIndicator: '40% reduction',
        primaryMetric: '40% no-show reduction',
        impact: {
            appointments: '1000+ daily',
            reduction: '40% no-shows',
            satisfaction: '4.8/5 rating'
        },
        challenge: 'Healthcare clinics experienced high no-show rates and inefficient appointment scheduling, leading to lost revenue and poor patient experience.',
        solution: 'Created a modern appointment scheduling interface with real-time availability, automated SMS reminders, and seamless calendar integration.',
        features: [
            'Real-time appointment availability',
            'Automated SMS notifications',
            'Google Calendar integration',
            'Patient self-service portal',
            'Mobile-responsive design'
        ],
        architecture: {
            frontend: ['Vue.js 3', 'TypeScript', 'Vuetify', 'Socket.io'],
            backend: ['Node.js', 'Express'],
            integrations: ['Twilio SMS', 'Google Calendar API'],
            database: ['MongoDB']
        }
    },
    {
        id: 'keystone-sentiment',
        title: 'Keystone Sentiment Analysis Tool',
        shortDesc: 'Full-stack sentiment analysis platform for customer feedback',
        icon: '🧠',
        tags: ['Full-Stack', 'AI/ML', 'Analytics'],
        techStack: ['Python', 'AWS', 'TensorFlow', 'PostgreSQL', 'Apache Airflow'],
        category: 'Data Engineering',
        timeIndicator: '92% accuracy',
        primaryMetric: '92% sentiment accuracy',
        impact: {
            feedback: '10,000+ analyzed',
            accuracy: '92% sentiment accuracy',
            insights: '300+ actionable insights'
        },
        challenge: 'Organizations struggled to analyze large volumes of customer feedback efficiently, missing valuable insights that could improve product quality and customer satisfaction.',
        solution: 'Developed a comprehensive sentiment analysis platform that processes customer feedback in real-time, provides actionable insights, and integrates with existing business workflows.',
        features: [
            'Real-time sentiment analysis',
            'Automated insight generation',
            'Interactive dashboard',
            'API integration capabilities',
            'Custom reporting tools'
        ],
        architecture: {
            frontend: ['React', 'Chart.js', 'Material-UI'],
            backend: ['Python', 'FastAPI', 'Apache Airflow'],
            database: ['PostgreSQL', 'Redis'],
            cloud: ['AWS Lambda', 'S3', 'CloudWatch']
        }
    }
];

// State management
let currentFilter = 'All';
let currentProject = null;
let currentTab = 'overview';

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.getElementById('filter-buttons');
const gridView = document.getElementById('projects-grid-view');
const detailView = document.getElementById('project-detail-view');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderProjects();
});

// Render filter buttons
function renderFilters() {
    const filters = ['All', 'Full-Stack', 'Backend', 'Frontend', 'Data Engineering'];
    
    filterButtons.innerHTML = filters.map(filter => `
        <button class="filter-btn ${filter === currentFilter ? 'active' : ''}" 
                onclick="setFilter('${filter}')">
            ${filter}
        </button>
    `).join('');
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    renderFilters();
    renderProjects();
}

// Render projects grid
function renderProjects() {
    const filteredProjects = currentFilter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" onclick="showProjectDetail('${project.id}')">
            <div class="project-card-header">
                <div class="project-icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7" rx="1"/>
                        <rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="14" y="14" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                    </svg>
                </div>
                <span class="project-category">${project.category}</span>
            </div>
            
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.shortDesc}</p>
            
            <div class="tech-stack">
                ${project.techStack.slice(0, 3).map(tech => 
                    `<span class="tech-badge">${tech}</span>`
                ).join('')}
                ${project.techStack.length > 3 ? 
                    `<span class="tech-badge tech-badge-more">+${project.techStack.length - 3} more</span>` : ''
                }
            </div>
            
            <div class="project-footer">
                <span class="time-indicator">${project.timeIndicator}</span>
                <div class="view-details">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </div>
            </div>
        </div>
    `).join('');
}

// Get first impact value
function getFirstImpactValue(impact) {
    const firstValue = Object.values(impact)[0];
    if (typeof firstValue === 'object' && firstValue.after) {
        return firstValue.after;
    }
    return firstValue;
}

// Show project detail
function showProjectDetail(projectId) {
    currentProject = projectsData.find(p => p.id === projectId);
    currentTab = 'overview';
    
    gridView.classList.add('hidden');
    detailView.classList.remove('hidden');
    
    renderProjectDetail();
}

// Show projects grid
function showProjectsGrid() {
    detailView.classList.add('hidden');
    gridView.classList.remove('hidden');
}

// Render project detail
function renderProjectDetail() {
    if (!currentProject) return;
    
    detailView.innerHTML = `
        <button class="back-button" onclick="showProjectsGrid()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="transform: rotate(180deg);">
                <path d="M9 18l6-6-6-6"/>
            </svg>
            Back to Projects
        </button>
        
        <div class="detail-container">
            <div class="detail-header">
                <div class="detail-title-row">
                    <div>
                        <h1 class="detail-title">${currentProject.title}</h1>
                        <p class="detail-subtitle">${currentProject.shortDesc}</p>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-dark">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </button>
                        <button class="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                            </svg>
                            Live Demo
                        </button>
                    </div>
                </div>
                
                ${renderImpactMetrics()}
                ${renderTechStack()}
            </div>
            
            ${renderTabs()}
            
            <div class="tab-content">
                ${renderTabContent()}
            </div>
        </div>
    `;
}

// Render impact metrics
function renderImpactMetrics() {
    return `
        <div class="impact-grid">
            ${Object.entries(currentProject.impact).map(([key, value]) => `
                <div class="impact-card">
                    <div class="impact-card-value">
                        ${typeof value === 'object' && value.after ? value.after : value}
                    </div>
                    <div class="impact-card-label">
                        ${key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render tech stack
function renderTechStack() {
    return `
        <div class="detail-tech-stack">
            ${currentProject.techStack.map(tech => 
                `<span class="tech-pill">${tech}</span>`
            ).join('')}
        </div>
    `;
}

// Render tabs
function renderTabs() {
    const tabs = ['overview', 'technical', 'impact', 'code'];
    
    return `
        <div class="tabs">
            <div class="tab-list">
                ${tabs.map(tab => `
                    <button class="tab ${tab === currentTab ? 'active' : ''}" 
                            onclick="setTab('${tab}')">
                        ${tab}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Set tab
function setTab(tab) {
    currentTab = tab;
    renderProjectDetail();
}

// Render tab content
function renderTabContent() {
    switch(currentTab) {
        case 'overview':
            return renderOverviewTab();
        case 'technical':
            return renderTechnicalTab();
        case 'impact':
            return renderImpactTab();
        case 'code':
            return renderCodeTab();
        default:
            return '';
    }
}

// Render overview tab
function renderOverviewTab() {
    if (!currentProject.challenge) return '<p>Details coming soon...</p>';
    
    return `
        <div class="tab-panel active">
            <div class="section">
                <h3 class="section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    The Challenge
                </h3>
                <p class="section-content">${currentProject.challenge}</p>
            </div>
            
            <div class="section">
                <h3 class="section-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    The Solution
                </h3>
                <p class="section-content">${currentProject.solution}</p>
            </div>
            
            ${currentProject.features ? `
                <div class="section">
                    <h3 class="section-title">Key Features</h3>
                    <div class="features-grid">
                        ${currentProject.features.map(feature => `
                            <div class="feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
      </div>
    `;
}

// Render technical tab
function renderTechnicalTab() {
    if (!currentProject.architecture) return '<p>Technical details coming soon...</p>';
    
    return `
        <div class="tab-panel active">
            <div class="section">
                <h3 class="section-title">Architecture Overview</h3>
                <div class="architecture-section">
                    <div class="architecture-grid">
                        ${Object.entries(currentProject.architecture).map(([layer, techs]) => `
                            <div class="arch-category">
                                <h4>
                                    ${getLayerIcon(layer)}
                                    ${layer}
                                </h4>
                                <ul>
                                    ${techs.map(tech => `<li>${tech}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            ${currentProject.challenges ? `
                <div class="section">
                    <h3 class="section-title">Challenges & Solutions</h3>
                    <div class="challenges-list">
                        ${currentProject.challenges.map(item => `
                            <div class="challenge-item">
                                <div class="challenge-grid">
                                    <div class="challenge-col">
                                        <span>Challenge</span>
                                        <p>${item.problem}</p>
                                    </div>
                                    <div class="challenge-col">
                                        <span>Solution</span>
                                        <p>${item.solution}</p>
                                    </div>
                                    <div class="challenge-col">
                                        <span>Result</span>
                                        <p>${item.result}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Get layer icon
function getLayerIcon(layer) {
    const icons = {
        frontend: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
        backend: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
        database: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
        devops: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        processing: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
        analysis: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        hardware: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        research: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/></svg>',
        cloud: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
        integrations: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
        security: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    };
    return icons[layer] || '';
}

// Render impact tab
function renderImpactTab() {
    return `
        <div class="tab-panel active">
            <div class="section">
                <h3 class="section-title">Performance Metrics</h3>
                <div class="metrics-comparison">
                    <div class="comparison-grid">
                        <div>
                            <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.75rem;">Before</h4>
                            <ul class="metric-list">
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
                                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    <span>${currentProject.impact.processingTime?.before || '60 minutes'} processing time</span>
                                </li>
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
                                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                    <span>Manual processes</span>
                                </li>
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
                                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                    <span>High error rates</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.75rem;">After</h4>
                            <ul class="metric-list">
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <span>${currentProject.impact.processingTime?.after || 'Optimized'} processing time</span>
                                </li>
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span>Fully automated</span>
                                </li>
                                <li>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span>High accuracy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render code tab
function renderCodeTab() {
    if (!currentProject.codeSnippet) return '<p>Code examples coming soon...</p>';
    
    return `
        <div class="tab-panel active">
            <div class="section">
                <h3 class="section-title">Code Highlights</h3>
                <div class="code-block">
                    <pre><code>${currentProject.codeSnippet}</code></pre>
                </div>
            </div>
        </div>
    `;
} 