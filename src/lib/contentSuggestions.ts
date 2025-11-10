export const professionalSummaries = {
  tech: [
    "Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable applications and leading cross-functional teams.",
    "Innovative software developer specializing in cloud architecture and microservices. Passionate about writing clean, maintainable code and mentoring junior developers.",
    "Full-stack developer with expertise in modern JavaScript frameworks and agile methodologies. Strong problem-solving skills with a focus on user experience.",
  ],
  finance: [
    "Accomplished financial analyst with 7+ years of experience in investment banking and portfolio management. Expert in financial modeling and risk assessment.",
    "Detail-oriented accountant with CPA certification and extensive experience in tax preparation and financial reporting. Committed to accuracy and regulatory compliance.",
    "Strategic finance professional with proven ability to drive business growth through data-driven decision making and cost optimization.",
  ],
  healthcare: [
    "Compassionate registered nurse with 6+ years of critical care experience. Skilled in patient assessment, emergency response, and interdisciplinary collaboration.",
    "Dedicated healthcare professional committed to providing exceptional patient care. Strong clinical skills combined with excellent communication and empathy.",
    "Experienced medical professional with expertise in patient care coordination and health information management.",
  ],
  marketing: [
    "Creative marketing professional with 5+ years driving brand awareness and customer engagement. Expert in digital marketing, content strategy, and campaign management.",
    "Results-oriented marketing specialist with proven track record of increasing ROI through data-driven strategies and innovative campaigns.",
    "Strategic marketer specializing in social media, SEO, and content marketing. Passionate about building brand presence and customer loyalty.",
  ],
  education: [
    "Passionate educator with 8+ years of experience in curriculum development and student engagement. Committed to fostering inclusive learning environments.",
    "Dedicated teacher with expertise in differentiated instruction and classroom management. Strong advocate for student success and educational innovation.",
    "Experienced education professional skilled in developing engaging lesson plans and utilizing technology to enhance learning outcomes.",
  ],
};

export const experienceBullets = {
  tech: [
    "Developed and maintained scalable web applications serving 100K+ monthly active users",
    "Implemented CI/CD pipelines reducing deployment time by 60%",
    "Led cross-functional team of 5 engineers to deliver projects on schedule",
    "Optimized database queries improving application performance by 40%",
    "Mentored 3 junior developers on best practices and code review processes",
    "Architected microservices infrastructure reducing system downtime by 75%",
    "Collaborated with product team to define technical requirements and roadmap",
    "Implemented automated testing increasing code coverage from 40% to 85%",
  ],
  finance: [
    "Managed investment portfolio worth $50M+ generating 15% annual returns",
    "Conducted financial analysis and due diligence for M&A transactions totaling $200M+",
    "Prepared monthly financial reports and presentations for C-level executives",
    "Implemented cost reduction strategies saving company $500K annually",
    "Developed financial models to forecast revenue and identify growth opportunities",
    "Ensured compliance with regulatory requirements and internal policies",
    "Led audit processes and collaborated with external auditors",
  ],
  healthcare: [
    "Provided direct patient care for 15+ patients per shift in high-acuity setting",
    "Administered medications and monitored patient vital signs with 100% accuracy",
    "Collaborated with interdisciplinary healthcare team to develop care plans",
    "Trained and mentored 5 new nurses on clinical procedures and protocols",
    "Maintained accurate patient records in compliance with HIPAA regulations",
    "Responded to emergency situations with calm professionalism",
  ],
  marketing: [
    "Increased social media engagement by 250% through targeted content strategy",
    "Managed marketing budget of $500K+ across multiple channels",
    "Developed and executed email campaigns achieving 25% open rate and 8% CTR",
    "Conducted market research to identify customer trends and opportunities",
    "Collaborated with design team to create compelling marketing materials",
    "Analyzed campaign performance metrics and optimized for maximum ROI",
    "Led rebranding initiative resulting in 40% increase in brand awareness",
  ],
  sales: [
    "Exceeded quarterly sales targets by average of 25% for 3 consecutive years",
    "Built and maintained relationships with 50+ key accounts generating $2M in revenue",
    "Developed sales presentations and proposals that closed 30+ deals",
    "Trained and coached team of 8 sales representatives on best practices",
    "Identified new business opportunities resulting in 15% territory growth",
    "Negotiated contracts and pricing achieving optimal profit margins",
  ],
};

export const skills = {
  tech: {
    'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'Ruby', 'PHP'],
    'Frontend': ['React', 'Next.js', 'Vue.js', 'Angular', 'HTML/CSS', 'Tailwind CSS', 'Redux', 'jQuery'],
    'Backend': ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails', '.NET'],
    'Database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'DynamoDB'],
    'Cloud & DevOps': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD'],
    'Tools': ['Git', 'Jira', 'Postman', 'VS Code', 'Figma', 'Webpack'],
  },
  finance: {
    'Technical Skills': ['Financial Modeling', 'Excel (Advanced)', 'Bloomberg Terminal', 'SQL', 'Python'],
    'Analysis': ['Valuation Analysis', 'Risk Assessment', 'Portfolio Management', 'Due Diligence'],
    'Software': ['QuickBooks', 'SAP', 'Oracle Financials', 'Tableau', 'Power BI'],
    'Certifications': ['CPA', 'CFA', 'CFP', 'FRM'],
  },
  marketing: {
    'Digital Marketing': ['SEO', 'SEM', 'Google Analytics', 'Google Ads', 'Facebook Ads', 'Email Marketing'],
    'Content': ['Content Strategy', 'Copywriting', 'Blog Management', 'Video Marketing'],
    'Social Media': ['Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'Pinterest', 'Hootsuite'],
    'Tools': ['HubSpot', 'Mailchimp', 'Canva', 'Adobe Creative Suite', 'WordPress'],
    'Analytics': ['Google Analytics', 'A/B Testing', 'Marketing Automation', 'CRM Systems'],
  },
  healthcare: {
    'Clinical Skills': ['Patient Assessment', 'Medication Administration', 'Wound Care', 'IV Therapy'],
    'Certifications': ['RN', 'BLS', 'ACLS', 'PALS', 'NRP'],
    'Software': ['EPIC', 'Cerner', 'Meditech', 'Electronic Health Records'],
    'Specializations': ['Critical Care', 'Emergency Medicine', 'Pediatrics', 'Oncology'],
  },
};

export function getSummaryByIndustry(industry: string): string[] {
  return professionalSummaries[industry as keyof typeof professionalSummaries] || professionalSummaries.tech;
}

export function getBulletsByIndustry(industry: string): string[] {
  return experienceBullets[industry as keyof typeof experienceBullets] || experienceBullets.tech;
}

export function getSkillsByIndustry(industry: string) {
  return skills[industry as keyof typeof skills] || skills.tech;
}
