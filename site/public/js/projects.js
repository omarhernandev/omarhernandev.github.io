// Icon mapping for tech stack items
const techIconMap = {
  // Programming Languages
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  
  // Frontend Frameworks
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
  
  // Backend Frameworks
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
  'FastAPI': 'https://cdn.simpleicons.org/fastapi',
  'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  
  // Databases
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  
  // Cloud & Infrastructure
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
  'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
  'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
  
  // Machine Learning & AI
  'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
  'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
  'Machine Learning': 'https://cdn.simpleicons.org/tensorflow',
  'Scikit-learn': 'https://cdn.simpleicons.org/scikitlearn',
  'Pandas': 'https://cdn.simpleicons.org/pandas',
  'NumPy': 'https://cdn.simpleicons.org/numpy',
  
  // Data Analysis
  'MATLAB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg',
  'Jupyter': 'https://cdn.simpleicons.org/jupyter',
  'R Statistics': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
  'Statistical Analysis': 'https://cdn.simpleicons.org/r',
  'ARIMA': 'https://cdn.simpleicons.org/r',
  'tidyverse': 'https://cdn.simpleicons.org/r',
  'ggplot2': 'https://cdn.simpleicons.org/r',
  'RMarkdown': 'https://cdn.simpleicons.org/r',
  
  // Development Tools
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  'GitHub': 'https://cdn.simpleicons.org/github',
  'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
  'VS Code': 'https://cdn.simpleicons.org/visualstudiocode',
  'IntelliJ': 'https://cdn.simpleicons.org/intellijidea',
  
  // Web Technologies
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  'Tailwind': 'https://cdn.simpleicons.org/tailwindcss',
  
  // APIs & Integration
  'REST APIs': 'https://cdn.simpleicons.org/json',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'WebSockets': 'https://cdn.simpleicons.org/websocket',
  'Socket.io': 'https://cdn.simpleicons.org/socketdotio',
  
  // Mobile & Desktop
  'React Native': 'https://cdn.simpleicons.org/react',
  'Flutter': 'https://cdn.simpleicons.org/flutter',
  'Electron': 'https://cdn.simpleicons.org/electron',
  
  // Analytics & Visualization
  'Chart.js': 'https://cdn.simpleicons.org/chartdotjs',
  'D3.js': 'https://cdn.simpleicons.org/d3dotjs',
  'Tableau': 'https://cdn.simpleicons.org/tableau',
  'Power BI': 'https://cdn.simpleicons.org/powerbi',
  
  // Security
  'JWT': 'https://cdn.simpleicons.org/jsonwebtokens',
  'OAuth2': 'https://cdn.simpleicons.org/auth0',
  'SSL/TLS': 'https://cdn.simpleicons.org/letsencrypt',
  'Encryption': 'https://cdn.simpleicons.org/keycdn',
  
  // Testing
  'Jest': 'https://cdn.simpleicons.org/jest',
  'Cypress': 'https://cdn.simpleicons.org/cypress',
  'Selenium': 'https://cdn.simpleicons.org/selenium',
  
  // Workflow & Project Management
  'Jira': 'https://cdn.simpleicons.org/jira',
  'Confluence': 'https://cdn.simpleicons.org/confluence',
  'Trello': 'https://cdn.simpleicons.org/trello',
  'Notion': 'https://cdn.simpleicons.org/notion',
  'Slack': 'https://cdn.simpleicons.org/slack',
  
  // Payment & Business
  'Stripe': 'https://cdn.simpleicons.org/stripe',
  'PayPal': 'https://cdn.simpleicons.org/paypal',
  'Twilio': 'https://cdn.simpleicons.org/twilio',
  'SendGrid': 'https://cdn.simpleicons.org/sendgrid',
  
  // Specialized Tools
  'FSL': 'https://cdn.simpleicons.org/fsl',
  'AFNI': 'https://cdn.simpleicons.org/afni',
  'Xquartz': 'https://cdn.simpleicons.org/xquartz',
  'GNU Emacs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/emacs/emacs-original.svg',
  'Vim': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg',
  'Apache Airflow': 'https://cdn.simpleicons.org/apacheairflow',
  'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
  'Apache': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg'
};

// Function to get icon URL for a tech stack item
function getTechIcon(techName) {
  // Try exact match first
  if (techIconMap[techName]) {
    return techIconMap[techName];
  }
  
  // Try partial matches for common variations
  const lowerTech = techName.toLowerCase();
  for (const [key, value] of Object.entries(techIconMap)) {
    if (key.toLowerCase().includes(lowerTech) || lowerTech.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Return null if no match found
  return null;
}

// Projects data
const projectsData = [
    {
        id: 'apple-stock-analysis',
        title: 'R Statistics: Apple Stock Analysis',
        shortDesc: 'Reproducible R Markdown time-series analysis on 40+ years of Apple stock data for statistical investment insights.',
        icon: '📊',
        tags: ['Data Analysis', 'Time Series', 'Statistical Forecasting'],
        techStack: ['R', 'tidyverse', 'ggplot2', 'RMarkdown'],
        category: 'Data Analysis',
        timeIndicator: '1980-2025',
        primaryMetric: '45 years of data',
        demoUrl: 'https://oohmxi.github.io/AppleStockAnalysis/',
        githubUrl: 'https://github.com/oohmxi/AppleStockAnalysis',
        impact: {
            after: {
                dataRange: '45+ Years of Data',
                insights: 'Interactive Insights',
                statistics: 'Applied Statistics'
            }
        },
        challenge: 'Build a reproducible, long-horizon analysis of Apple\'s historical stock data and generate statistically sound forecasts to inform high-level investment thinking. The project aims to demonstrate end-to-end data science workflow skills: importing, cleaning, analyzing, sampling, validating statistical assumptions, and producing interactive visualizations.',
        solution: 'Developed an R/RMarkdown time-series workflow on 1980–2025 AAPL data (Kaggle). The project included data import and preprocessing, exploratory analysis of categorical and numerical variables, distribution checks, and demonstrations of the Central Limit Theorem through random sampling. Data wrangling techniques were applied for structured insights, while seasonal decomposition and statistical analysis were used to model long-term stock trends. Interactive Plotly plots and a hosted HTML report were produced for transparency and reproducibility.',
        features: [
            'Data import, preprocessing, and wrangling in R',
            'Exploratory analysis with visuals for categorical and numerical variables',
            'Distribution analysis, random sampling, and Central Limit Theorem demonstration',
            'Comparative insights from different sampling methods',
            'Interactive data visualizations with Plotly',
            'Advanced time series analysis and statistical forecasting',
            'Long-term trend and seasonality insights',
            'Hosted HTML report (GitHub Pages)'
        ],
        architecture: {
            analysis: ['R Statistics', 'Time Series Analysis', 'Statistical Modeling'],
            visualization: ['ggplot2', 'tidyverse', 'RMarkdown'],
            data: ['Kaggle AAPL Dataset', 'Historical Stock Data', 'Time Series Data']
        }
    },
    {
        id: 'fmri-prosthetics',
        title: 'fMRI: Prosthetics Feasability Study',
        shortDesc: 'Advanced functional neuroimaging analysis to assess brain-computer interface viability for next-generation prosthetic control systems and neural rehabilitation.',
        icon: '🧠',
        tags: ['RESEARCH', 'fMRI', 'Data Analysis'],
        techStack: ['Python', 'MATLAB', 'FSL', 'AFNI', 'R', 'Statistical Analysis'],
        category: 'RESEARCH',
        timeIndicator: 'Research Study',
        primaryMetric: 'BCI Feasibility Assessment',
        impact: {
            before: {
                research: 'Limited BCI research',
                analysis: 'Manual signal analysis',
                feasibility: 'Unclear feasibility'
            },
            after: {
                accuracy: '92% classification rate',
                subjects: '25+ participants studied',
                applications: 'Clear prosthetic control viability'
            }
        },
        challenge: 'Assess the feasibility of using functional magnetic resonance imaging (fMRI) to develop brain-computer interfaces for advanced prosthetic control systems.',
        solution: 'Conducted comprehensive neuroimaging analysis using advanced signal processing techniques to identify optimal brain regions and neural patterns for prosthetic control.',
        features: [
            'Advanced fMRI data preprocessing',
            'Machine learning classification algorithms',
            'Real-time signal processing pipeline',
            'Statistical analysis of neural patterns',
            'Brain-computer interface prototyping'
        ],
        architecture: {
            analysis: ['Python', 'MATLAB', 'R'],
            imaging: ['FSL', 'AFNI', 'SPM'],
            ml: ['scikit-learn', 'TensorFlow', 'PyTorch'],
            stats: ['R', 'SciPy', 'Statistical Modeling']
        },
        githubUrl: 'https://github.com/oohmxi/fmri-semantic-neural-network'
    },
    {
        id: 'neuroplasticity-stroke',
        title: 'Neuroplasticity: Stroke Recovery',
        shortDesc: 'A comprehensive data analysis and predictive modeling system for stroke recovery patterns and patient outcomes.',
        icon: '🧠',
        tags: ['RESEARCH', 'Data Analysis', 'Healthcare'],
        techStack: ['Python', 'R', 'MATLAB', 'Statistical Analysis', 'Machine Learning'],
        category: 'RESEARCH',
        timeIndicator: 'Research Study',
        primaryMetric: 'Stroke Recovery Modeling',
        impact: {
            before: {
                rehabilitation: 'Generic rehabilitation',
                prediction: 'Limited recovery prediction',
                approach: 'One-size-fits-all approach'
            },
            after: {
                accuracy: '87% recovery prediction accuracy',
                patients: '200+ patients analyzed',
                outcomes: 'Improved rehabilitation protocols'
            }
        },
        challenge: 'Develop predictive models to understand neuroplasticity patterns in stroke recovery and optimize rehabilitation strategies for better patient outcomes.',
        solution: 'Built comprehensive data analysis pipeline combining neuroimaging data, clinical assessments, and behavioral metrics to predict recovery trajectories and personalize treatment plans.',
        features: [
            'DTI brain imaging analysis',
            'Predictive recovery modeling',
            'Statistical pattern recognition',
            'Clinical outcome correlation',
            'Rehabilitation optimization'
        ],
        architecture: {
            analysis: ['Python', 'R', 'MATLAB'],
            imaging: ['DTI', 'FSL', 'AFNI'],
            ml: ['scikit-learn', 'Statistical Modeling'],
            data: ['Clinical Data', 'Neuroimaging', 'Behavioral Metrics']
        }
    },
    {
        id: 'financial-ledger',
        title: 'Financial Ledger Automation Platform',
        shortDesc: 'Reduced processing time by 98% for client financial ledgers',
        icon: '📊',
        tags: ['PRODUCTION', 'FinTech', 'Automation'],
        techStack: ['React', 'Flask', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        category: 'PRODUCTION',
        timeIndicator: '1 min',
        primaryMetric: 'processing time by 98%',
        impact: {
            before: {
                processingTime: '60 minutes processing time',
                processes: 'Manual processes',
                errors: 'High error rates'
            },
            after: {
                processingTime: '1 minute processing time',
                transactions: '$2M+ monthly transactions',
                users: '50+ daily users',
                processes: 'Fully automated',
                accuracy: 'High accuracy'
            }
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
        title: 'Digital Pathology Database',
        shortDesc: 'Real-time analytics platform for 10,000+ tumor database',
        icon: '🏥',
        tags: ['RESEARCH', 'Healthcare', 'Data Viz'],
        techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
        category: 'RESEARCH',
        timeIndicator: '10,000+ tumors',
        primaryMetric: '10,000+ tumor database',
        impact: {
            before: {
                dataAnalysis: 'Manual data analysis',
                visualization: 'Limited visualization',
                research: 'Time-consuming research'
            },
            after: {
                accuracy: '95% diagnostic improvement',
                users: '300+ researchers',
                dataPoints: '10,000+ tumors'
            }
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
        tags: ['AI/ML', 'Healthcare', 'Machine Learning'],
        techStack: ['Python', 'FastAPI', 'PostgreSQL', 'TensorFlow', 'Docker'],
        category: 'AI/ML',
        timeIndicator: '<100ms',
        primaryMetric: '85% matching accuracy',
        impact: {
            before: {
                matching: 'Manual patient matching',
                enrollment: 'Slow trial enrollment',
                opportunities: 'Missed opportunities'
            },
            after: {
                matching: '85% matching accuracy',
                endpoints: '25+ API endpoints',
                response: '<100ms response time'
            }
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
        tags: ['PRODUCTION', 'Healthcare', 'Real-time'],
        techStack: ['Vue.js', 'TypeScript', 'Socket.io', 'Twilio', 'Google Calendar'],
        category: 'PRODUCTION',
        timeIndicator: '40% reduction',
        primaryMetric: '40% no-show reduction',
        impact: {
            before: {
                noShows: 'High no-show rates',
                scheduling: 'Manual scheduling',
                experience: 'Poor patient experience'
            },
            after: {
                reduction: '40% no-show reduction',
                appointments: '1000+ daily appointments',
                satisfaction: '4.8/5 satisfaction rating'
            }
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
        tags: ['AI/ML', 'AI/ML', 'Analytics'],
        techStack: ['Python', 'AWS', 'TensorFlow', 'PostgreSQL', 'Apache Airflow'],
        category: 'AI/ML',
        timeIndicator: '92% accuracy',
        primaryMetric: '92% sentiment accuracy',
        impact: {
            before: {
                review: 'Manual feedback review',
                insights: 'Limited insights',
                analysis: 'Time-consuming analysis'
            },
            after: {
                accuracy: '92% sentiment accuracy',
                dataPoints: '1.8M data points analyzed',
                insights: '300+ actionable insights'
            }
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
    },
    {
        id: 'data-privacy',
        title: 'Data Privacy',
        shortDesc: 'Comprehensive data privacy and security framework ensuring TCPA compliance, HIPAA protections, and robust IPv4/IPv6 network security protocols.',
        icon: '🔒',
        tags: ['ENTERPRISE', 'Privacy', 'Compliance'],
        techStack: ['Security Framework', 'HIPAA', 'TCPA', 'Network Security', 'Encryption'],
        category: 'ENTERPRISE',
        timeIndicator: 'Framework',
        primaryMetric: 'Multi-compliance security',
        impact: {
            before: {
                compliance: 'Compliance gaps',
                security: 'Security vulnerabilities',
                risks: 'Regulatory risks'
            },
            after: {
                compliance: 'HIPAA + TCPA certified',
                security: 'IPv4/IPv6 protocols',
                protection: 'End-to-end encryption'
            }
        },
        challenge: 'Develop a comprehensive data privacy and security framework that meets multiple regulatory requirements including HIPAA and TCPA while ensuring robust network security.',
        solution: 'Implemented a multi-layered security framework with advanced encryption, access controls, and compliance monitoring to protect sensitive data across all platforms.',
        features: [
            'HIPAA compliance framework',
            'TCPA regulatory compliance',
            'IPv4/IPv6 network security',
            'End-to-end encryption',
            'Access control management',
            'Audit trail systems'
        ],
        architecture: {
            security: ['SSL/TLS', 'AES-256', 'PKI'],
            compliance: ['HIPAA', 'TCPA', 'SOC 2'],
            network: ['IPv4/IPv6', 'Firewall', 'VPN'],
            monitoring: ['SIEM', 'Log Analysis', 'Threat Detection']
        }
    },
    {
        id: 'lead-tracking',
        title: 'Lead Tracking',
        shortDesc: 'Comprehensive custom CRM system for lead management, conversion tracking, and sales pipeline optimization with automated follow-up workflows.',
        icon: '📊',
        tags: ['PRODUCTION', 'Sales', 'Automation'],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
        category: 'PRODUCTION',
        timeIndicator: 'CRM System',
        primaryMetric: 'Lead conversion optimization',
        impact: {
            before: {
                management: 'Manual lead management',
                tracking: 'Poor conversion tracking',
                followUps: 'Inconsistent follow-ups'
            },
            after: {
                conversion: '35% increase in conversions',
                leads: '5,000+ leads managed',
                automation: '80% automated follow-ups'
            }
        },
        challenge: 'Sales teams needed a comprehensive system to track leads, manage conversion pipelines, and automate follow-up processes to improve conversion rates.',
        solution: 'Developed a full-stack CRM platform with advanced lead scoring, automated workflows, and real-time analytics to optimize sales pipeline management.',
        features: [
            'Lead scoring algorithms',
            'Automated follow-up workflows',
            'Conversion tracking analytics',
            'Pipeline visualization',
            'Integration with marketing tools',
            'Real-time dashboard reporting'
        ],
        architecture: {
            frontend: ['React', 'Redux', 'Material-UI'],
            backend: ['Node.js', 'Express', 'JWT Auth'],
            database: ['PostgreSQL', 'Redis Cache'],
            cloud: ['AWS EC2', 'S3', 'Lambda']
        }
    }
];

// State management
let currentFilter = 'All';
let currentProject = null;
let currentTab = 'overview';

// Pagination state
let currentPage = 1;
const projectsPerPage = 6;

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.getElementById('filter-buttons');
const gridView = document.getElementById('projects-grid-view');
const projectModal = document.getElementById('project-modal');
const paginationControls = document.getElementById('pagination-controls');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderProjects();
    renderPagination();
    
    // Add modal overlay click handler
    if (projectModal) {
        const overlay = projectModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeProjectModal);
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
                closeProjectModal();
            }
        });
    }
    
    // Check for project parameter in URL and open modal if present
    checkUrlForProject();
});

// Render filter buttons
function renderFilters() {
    const filters = ['All', 'RESEARCH', 'PRODUCTION', 'AI/ML', 'ENTERPRISE'];
    
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
    currentPage = 1; // Reset to first page when filter changes
    renderFilters();
    renderProjects();
    renderPagination();
}

// Render projects grid
function renderProjects() {
    const filteredProjects = currentFilter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    projectsGrid.innerHTML = paginatedProjects.map((project, index) => `
        <div class="project-card animate-fade-in-up animate-stagger-${(index % 10) + 1}" onclick="showProjectDetail('${project.id}')">
            <div class="project-card-header">
                <span class="project-category" data-category="${project.category}">${project.category}</span>
            </div>
            
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.shortDesc}</p>
            
            <div class="tech-stack">
                ${project.techStack.slice(0, 3).map(tech => {
                    const iconUrl = getTechIcon(tech);
                    return iconUrl ? 
                        `<span class="tech-badge tech-badge--with-icon">
                            <img src="${iconUrl}" alt="${tech}" class="tech-badge__icon" />
                            <span class="tech-badge__text">${tech}</span>
                        </span>` :
                        `<span class="tech-badge">${tech}</span>`;
                }).join('')}
                ${project.techStack.length > 3 ? 
                    `<span class="tech-badge tech-badge-more">+${project.techStack.length - 3} more</span>` : ''
                }
            </div>
            
            <div class="project-footer">
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

// Render pagination controls
function renderPagination() {
    const filteredProjects = currentFilter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
    
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, filteredProjects.length);
    
    // Don't show pagination if there's only one page or no projects
    if (totalPages <= 1) {
        paginationControls.innerHTML = '';
        return;
    }
    
    paginationControls.innerHTML = `
        <div class="pagination-info">
            <span>Showing ${startIndex + 1}-${endIndex} of ${filteredProjects.length} projects</span>
        </div>
        <div class="pagination-nav">
            <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    onclick="goToPage(${currentPage - 1})" 
                    ${currentPage === 1 ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span>Previous</span>
            </button>
            
            <div class="pagination-pages">
                <span class="current-page">${currentPage}</span>
                <span class="page-separator">of</span>
                <span class="total-pages">${totalPages}</span>
            </div>
            
            <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="goToPage(${currentPage + 1})" 
                    ${currentPage === totalPages ? 'disabled' : ''}>
                <span>Next</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;
}

// Navigate to specific page
function goToPage(page) {
    const filteredProjects = currentFilter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
    
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProjects();
        renderPagination();
        
        // Scroll to top of projects section
        document.querySelector('.projects-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Get first impact value
function getFirstImpactValue(impact) {
    if (!impact) return 'N/A';
    
    // Check if it's the new structure with before/after
    if (impact.after) {
        const firstAfterValue = Object.values(impact.after)[0];
        return firstAfterValue || 'N/A';
    }
    
    // Fallback for old structure
    const firstValue = Object.values(impact)[0];
    if (typeof firstValue === 'object' && firstValue.after) {
        return firstValue.after;
    }
    return firstValue || 'N/A';
}

// Show project detail in modal
function showProjectDetail(projectId) {
    currentProject = projectsData.find(p => p.id === projectId);
    const projectIndex = projectsData.findIndex(p => p.id === projectId);
    currentTab = 'overview';
    
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Show in-progress modal for projects 4+ (index 3+)
    if (projectIndex >= 3) {
        renderInProgressModal();
    } else {
        renderProjectModal();
    }
}

// Close project modal
function closeProjectModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    currentProject = null;
}

// Check URL for project parameter and open modal if present
function checkUrlForProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        // Find the project in the data
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            // Small delay to ensure DOM is fully rendered
            setTimeout(() => {
                showProjectDetail(projectId);
            }, 100);
        }
    }
}

// Render in-progress modal
function renderInProgressModal() {
    if (!currentProject) return;
    
    const modalContent = projectModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <button class="modal-back-button" onclick="closeProjectModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
        </button>
        
        <div class="in-progress-modal">
            <div class="in-progress-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            
            <h1 class="modal-title" style="text-align: center; margin-bottom: 1rem;">${currentProject.title}</h1>
            
            <p class="modal-subtitle" style="text-align: center; color: #6b7280; margin-bottom: 1.5rem;">
                ${currentProject.shortDesc}
            </p>
            
            <div class="in-progress-badge">
                In Development
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 1rem; margin-top: 1.5rem;">
                This project is currently being developed. Check back soon for detailed information!
            </p>
        </div>
    `;
}

// Render project modal
function renderProjectModal() {
    if (!currentProject) return;
    
    const modalContent = projectModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <button class="modal-back-button" onclick="closeProjectModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
        </button>
        
        <div class="modal-header">
            <h1 class="modal-title">${currentProject.title}</h1>
            <p class="modal-subtitle">${currentProject.shortDesc}</p>
            
            <div class="modal-actions">
                ${currentProject.githubUrl ? `
                    <a href="${currentProject.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-dark">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                ` : `
                    <button class="btn btn-dark">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </button>
                `}
                ${currentProject.demoUrl ? `
                    <a href="${currentProject.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        Live Demo
                    </a>
                ` : `
                    <button class="btn btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        Live Demo
                    </button>
                `}
            </div>
        </div>
        
        ${renderModalMetrics()}
        ${renderModalTabs()}
        
        <div class="tab-content">
            ${renderTabContent()}
        </div>
    `;
}

// Render modal metrics (3-column grid)
function renderModalMetrics() {
    if (!currentProject || !currentProject.impact) {
        return '<div class="modal-metrics"><p>No metrics available</p></div>';
    }

    // Use the 'after' metrics for the modal display, limited to 3
    const metrics = currentProject.impact.after || {};
    
    // Special handling for Apple Stock Analysis project
    if (currentProject.id === 'apple-stock-analysis') {
        return `
            <div class="modal-metrics">
                <div class="metric-item">
                    <span class="metric-value">45+ Years of Data</span>
                    <span class="metric-label">Data Range</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">Interactive Insights</span>
                    <span class="metric-label">Dynamic Visualizations</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">Applied Statistics</span>
                    <span class="metric-label">data science</span>
                </div>
            </div>
        `;
    }
    
    const metricEntries = Object.entries(metrics);
    
    // Limit to first 3 metrics
    const limitedMetrics = metricEntries.slice(0, 3);
    
    return `
        <div class="modal-metrics">
            ${limitedMetrics.map(([key, value]) => `
                <div class="metric-item">
                    <span class="metric-value">
                        ${value}
                    </span>
                    <span class="metric-label">
                        ${key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                </div>
            `).join('')}
        </div>
    `;
}

// Legacy function removed - tech stack now shown in modal metrics

// Render modal tabs
function renderModalTabs() {
    const tabs = ['overview', 'technical', 'impact', 'code'];
    
    return `
        <div class="modal-tabs">
            <div class="tab-list">
                ${tabs.map(tab => `
                    <button class="tab ${tab === currentTab ? 'active' : ''}" 
                            onclick="setModalTab('${tab}')">
                        ${tab}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Set modal tab
function setModalTab(tab) {
    currentTab = tab;
    renderProjectModal();
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
            <div class="modal-section">
                <h3 class="section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                    </svg>
                    The Challenge
                </h3>
                <p class="section-content">${currentProject.challenge}</p>
            </div>
            
            <div class="modal-section">
                <h3 class="section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    The Solution
                </h3>
                <p class="section-content">${currentProject.solution}</p>
            </div>
            
            ${currentProject.features ? `
                <div class="modal-section">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Key Features
                    </h3>
                    <ul class="feature-list">
                        ${currentProject.features.map(feature => `
                            <li class="feature-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
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
    if (!currentProject || !currentProject.impact) {
        return '<div class="tab-panel active"><p>No impact data available</p></div>';
    }

    // Special handling for Apple Stock Analysis project
    if (currentProject.id === 'apple-stock-analysis') {
        return `
            <div class="tab-panel active">
                <div class="section">
                    <h3 class="section-title">Performance Metrics</h3>
                    <div class="metrics-comparison">
                        <div class="metric-list">
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>45+ Years of Data</span>
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Interactive Insights</span>
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Applied Statistics</span>
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Distribution Analysis</span>
                            </li>
                            <li>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Central Limit Theorem</span>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const beforeMetrics = currentProject.impact.before || {};
    const afterMetrics = currentProject.impact.after || {};

    const renderMetricList = (metrics, isBefore = true) => {
        const iconColor = isBefore ? '#dc2626' : '#059669';
        const iconPath = isBefore 
            ? '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
            : '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>';
        
        return Object.entries(metrics).map(([key, value]) => `
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${iconColor}">
                    ${iconPath}
                </svg>
                <span>${value}</span>
            </li>
        `).join('');
    };

    return `
        <div class="tab-panel active">
            <div class="section">
                <h3 class="section-title">Performance Metrics</h3>
                <div class="metrics-comparison">
                    <div class="comparison-grid">
                        <div>
                            <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.75rem;">Before</h4>
                            <ul class="metric-list">
                                ${renderMetricList(beforeMetrics, true)}
                            </ul>
                        </div>
                        <div>
                            <h4 style="font-weight: 600; color: #374151; margin-bottom: 0.75rem;">After</h4>
                            <ul class="metric-list">
                                ${renderMetricList(afterMetrics, false)}
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