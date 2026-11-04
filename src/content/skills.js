/**
 * Skills inventory for Darshan Saravari.
 * Grouped logically and formatted for package.json / chip display.
 * Strictly using only the provided facts, no percentage bars.
 */

export const SKILLS_DATA = {
  version: '2026.1.0',
  license: 'MIT',
  author: 'Darshan Saravari',
  categories: [
    {
      name: 'Languages',
      key: 'languages',
      description: 'Core programming and scripting languages',
      skills: ['Java', 'C', 'C++', 'JavaScript', 'Python'],
    },
    {
      name: 'Web Technologies',
      key: 'web',
      description: 'Full-stack client and server development',
      skills: ['HTML5', 'CSS3', 'Node.js', 'Express.js', 'React'],
    },
    {
      name: 'Mobile Development',
      key: 'mobile',
      description: 'Native Android application development',
      skills: ['Android (Java)', 'Firebase Realtime DB'],
    },
    {
      name: 'Databases',
      key: 'databases',
      description: 'Relational and document data stores',
      skills: ['MySQL', 'MongoDB'],
    },
    {
      name: 'Tools & Platforms',
      key: 'tools',
      description: 'Developer tooling, version control, and environments',
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Android Studio'],
    },
    {
      name: 'Core Concepts',
      key: 'concepts',
      description: 'Computer science fundamentals and software engineering',
      skills: ['SDLC', 'Secure Coding', 'Data Structures & Algorithms'],
    },
  ],
};

/**
 * Formatted JSON-like representation for terminal and package.json view
 */
export const PACKAGE_JSON_SKILLS = {
  name: "@darshan/skills-manifest",
  version: "2026.1.0",
  private: true,
  dependencies: {
    "languages": ["Java", "C", "C++", "JavaScript", "Python"],
    "web": ["HTML5", "CSS3", "Node.js", "Express.js", "React"],
    "mobile": ["Android (Java)", "Firebase"],
    "databases": ["MySQL", "MongoDB"],
    "tools": ["Git", "GitHub", "Postman", "VS Code", "Android Studio"],
    "concepts": ["SDLC", "Secure Coding", "Data Structures & Algorithms"]
  }
};

