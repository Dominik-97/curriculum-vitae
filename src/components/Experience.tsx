import React, { useState } from 'react'

interface ExperienceItem {
  id: string
  period: string
  company: string
  position: string
  type: string
  location?: string
  description: string[]
  technologies?: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'denevy',
    period: '2021 - Present',
    company: 'Denevy',
    position: 'Development & Testing Consultant / Product Owner',
    type: 'Full-time',
    location: 'Prague, Czech Republic',
    description: [
      'Leading automation initiatives for clients including Renomia, Asseco, and Packeta',
      'Delivering high-quality test automation and data pipeline solutions',
      'Consulting on process improvements for higher satisfaction and effectiveness',
      'Implementing CI/CD processes and best practices',
      'Providing product delivery, automation, test, and data management consulting',
      'Managing development and testing teams for internal and external projects',
    ],
    technologies: ['Test Automation', 'ETL Pipelines', 'CI/CD', 'Product Management', 'Stakeholder Consulting'],
  },
  {
    id: 'asseco',
    period: 'August 2022 - Present',
    company: 'Asseco Central Europe',
    position: 'Automation Specialist',
    type: 'Contractual',
    location: 'Remote',
    description: [
      'Building comprehensive test automation pipelines for financial products platforms',
      'Defining and documenting automated test scenarios',
      'Implementing ETL pipelines and test execution result visualizations',
      'Leading knowledge transfer workshops on automated testing',
      'Mentoring team members to ensure high-quality test delivery',
    ],
    technologies: ['Financial Platforms', 'Test Automation', 'ETL', 'Data Visualization', 'Workshops'],
  },
  {
    id: 'renomia',
    period: 'June 2022 - Present',
    company: 'Renomia',
    position: 'Automation Lead',
    type: 'Contractual',
    location: 'Insurance Domain',
    description: [
      'Leading test automation initiatives in the insurance sector',
      'Analyzing existing processes and defining technical requirements',
      'Implementing automated test scenarios and execution pipelines',
      'Creating data visualization dashboards for test results',
      'Facilitating knowledge sharing through technical workshops',
      'Guiding team members to deliver high-quality automated solutions',
    ],
    technologies: ['Insurance Systems', 'Test Automation', 'Process Analysis', 'Data Visualization', 'Team Leadership'],
  },
  {
    id: 'behavee',
    period: '2018 - 2021',
    company: 'Behavee',
    position: 'Data & Development Consultant / Reporting Specialist',
    type: 'Self-employed',
    description: [
      'Conducting data, process, and technology evaluations to identify critical issues',
      'Designing research plans and performing comprehensive analysis',
      'Researching and recommending business case improvements for data utilization',
      'Assisting development teams with data strategy and model design',
      'Creating automated data reports and maintaining data integrity',
      'Implementing new strategies and processes for improved efficiency',
    ],
    technologies: ['Data Analysis', 'Process Optimization', 'Reporting', 'Data Strategy', 'Business Consulting'],
  },
  {
    id: 'tmobile',
    period: '2018 - 2020',
    company: 'T-Mobile',
    position: 'Data & Development Consultant',
    type: 'Contractual',
    location: 'Prague, Czech Republic',
    description: [
      'Participating in large-scale data migration project for T-Mobile Czech Republic',
      'Providing support during transition period with data preparation and consolidation',
      'Developing data testing and cleansing tools for migration validation',
      'Designing solutions for data consolidation from local ERP to international systems',
      'Leading data delivery team for legal documents, HR, and accounting data',
    ],
    technologies: ['Data Migration', 'Data Testing', 'ERP Systems', 'Data Consolidation', 'Team Leadership'],
  },
]

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 hover:border-hermes-500/30 dark:hover:border-hermes-400/30 transition-all duration-500 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header with expand/collapse */}
            <button
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              className="w-full p-5 text-left flex flex-wrap items-center justify-between gap-4 hover:bg-white/5 dark:hover:bg-slate-300/50 transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center gap-4 min-w-0 flex-1">
                {/* Period badge */}
                <span className="px-3 py-1 bg-hermes-500/20 dark:bg-hermes-200/20 text-hermes-400 dark:text-hermes-700 text-xs font-medium rounded-full whitespace-nowrap">
                  {exp.period}
                </span>
                
                {/* Company and position */}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white dark:text-slate-800 truncate">{exp.company}</h3>
                  <p className="text-white/60 dark:text-slate-600 text-sm">{exp.position}</p>
                </div>
              </div>
              
              {/* Type and location */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 dark:text-slate-500 text-sm hidden sm:block">{exp.type}</span>
                {exp.location && <span className="text-white/40 dark:text-slate-400 text-sm hidden lg:block">| {exp.location}</span>}
                
                {/* Expand/Collapse icon */}
                <svg 
                  className={`w-5 h-5 text-hermes-400 dark:text-hermes-600 transition-transform duration-300 ${expandedId === exp.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {/* Expandable content */}
            {expandedId === exp.id && (
              <div className="p-5 pt-0 animate-fade-in">
                {/* Technologies tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-hermes-500/10 dark:bg-hermes-200/20 text-hermes-400 dark:text-hermes-700 text-xs rounded-full border border-hermes-500/20 dark:border-hermes-300/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Description */}
                <ul className="space-y-2 text-white/70 dark:text-slate-600 text-sm leading-relaxed">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-hermes-500/50 dark:text-hermes-500/50 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
