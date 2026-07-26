import React from 'react'

const About: React.FC = () => {
  const specializations = [
    'Product Management',
    'BE Development with FE Overreach',
    'Test & Process Automation',
    'Data Analysis & Visualization',
    'Technical Training & Consulting',
    'CI/CD Pipeline Development',
  ]

  return (
    <section className="animate-fade-in-up">
      <h2 className="text-xl font-medium text-white/80 dark:text-slate-700 mb-4">About Me</h2>
      
      <div className="space-y-6 text-white/70 dark:text-slate-600 leading-relaxed">
        <p>
          Working as an <span className="text-hermes-400 font-medium dark:text-hermes-600">automation development lead</span> 
          on various in-house and external projects at Denevy, primarily focusing on 
          <span className="text-hermes-400 font-medium dark:text-hermes-600">test automation</span>, 
          <span className="text-hermes-400 font-medium dark:text-hermes-600">process automation</span>, and 
          <span className="text-hermes-400 font-medium dark:text-hermes-600">reporting</span>.
        </p>
        
        <p>
          My goal is to help businesses succeed by driving improvements in both business and technical 
          areas, and providing <span className="text-hermes-400 font-medium dark:text-hermes-600">technical training</span> to share knowledge effectively.
        </p>
        
        <p>
          I am an established professional with over five years of experience in both startup and 
          corporate environments in the IT space, with a proven track record of delivering successful 
          projects throughout their entire lifecycle.
        </p>
      </div>
      
      {/* Specializations - Hermes-style pills */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white dark:text-slate-800 mb-4">Specialized In</h3>
        <div className="flex flex-wrap gap-3">
          {specializations.map((skill, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-full text-white/80 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
