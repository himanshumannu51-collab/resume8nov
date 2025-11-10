import { ResumeData } from '@/types/resume';

interface ATSResult {
  score: number;
  issues: string[];
  suggestions: string[];
  passed: boolean;
}

export function calculateATSScore(resume: ResumeData): ATSResult {
  let score = 0;
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Contact Information (20 points)
  if (resume.personalInfo.fullName) {
    score += 5;
  } else {
    issues.push('Missing full name');
  }

  if (resume.personalInfo.email) {
    score += 5;
  } else {
    issues.push('Missing email address');
  }

  if (resume.personalInfo.phone) {
    score += 5;
  } else {
    issues.push('Missing phone number');
  }

  if (resume.personalInfo.location) {
    score += 5;
  } else {
    suggestions.push('Add location for better ATS compatibility');
  }

  // Professional Summary (10 points)
  if (resume.summary) {
    if (resume.summary.length >= 100) {
      score += 10;
    } else if (resume.summary.length >= 50) {
      score += 5;
      suggestions.push('Expand your professional summary (aim for 100-300 characters)');
    } else {
      suggestions.push('Add a professional summary (100-300 characters recommended)');
    }
  } else {
    issues.push('Missing professional summary');
  }

  // Work Experience (30 points)
  if (resume.experience.length > 0) {
    score += 10;
    
    const hasQuantifiableResults = resume.experience.some(exp =>
      exp.description.some(desc => /\d+/.test(desc))
    );
    
    if (hasQuantifiableResults) {
      score += 10;
    } else {
      suggestions.push('Add quantifiable results (numbers, percentages) to experience');
    }

    const hasActionVerbs = resume.experience.some(exp =>
      exp.description.some(desc => 
        /^(Led|Managed|Developed|Implemented|Increased|Reduced|Created|Built|Designed|Established|Improved|Optimized)/i.test(desc)
      )
    );

    if (hasActionVerbs) {
      score += 10;
    } else {
      suggestions.push('Start bullet points with strong action verbs');
    }
  } else {
    issues.push('No work experience added');
  }

  // Education (15 points)
  if (resume.education.length > 0) {
    score += 15;
  } else {
    issues.push('No education added');
  }

  // Skills (15 points)
  if (resume.skills.length > 0) {
    score += 10;
    
    const totalSkills = resume.skills.reduce((acc, skill) => acc + skill.items.length, 0);
    if (totalSkills >= 5) {
      score += 5;
    } else {
      suggestions.push('Add more relevant skills (aim for at least 5)');
    }
  } else {
    issues.push('No skills added');
  }

  // File Format (10 points) - Assume good since we're using standard format
  score += 10;

  // Additional checks
  if (!resume.personalInfo.linkedin && !resume.personalInfo.github) {
    suggestions.push('Add LinkedIn or GitHub profile for better visibility');
  }

  const totalWords = [
    ...resume.experience.flatMap(exp => exp.description.join(' ')),
    resume.summary
  ].join(' ').split(/\s+/).length;

  if (totalWords < 200) {
    suggestions.push('Resume might be too short - add more details about your experience');
  } else if (totalWords > 800) {
    suggestions.push('Resume might be too long - consider being more concise');
  }

  return {
    score: Math.min(score, 100),
    issues,
    suggestions,
    passed: score >= 70,
  };
}
