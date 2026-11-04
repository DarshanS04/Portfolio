/**
 * Pure terminal command parser implementing the Command Registry pattern.
 * Unit-testable without any DOM or React dependencies.
 */

import { PROFILE } from '@/content/profile';
import { SKILLS_DATA } from '@/content/skills';
import { PROJECTS } from '@/content/projects';
import { EXPERIENCES } from '@/content/experience';

/**
 * Registry of executable commands.
 */
export const commandRegistry = {
  help: {
    name: 'help',
    description: 'Lists all available interactive terminal commands',
    usage: 'help',
    execute: () => ({
      type: 'text',
      output: [
        'Available interactive commands:',
        '  help                 - Display this helper guide',
        '  whoami               - Brief identification of current operator',
        '  about                - Read background, education, and objective',
        '  skills               - Print categorized technical skill inventory',
        '  projects             - List featured software projects & slugs',
        '  open <slug>          - Navigate to a project case study page',
        '  experience           - Print internship and software engineering history',
        '  education            - View academic qualifications and grades',
        '  resume               - Open/download verified PDF resume',
        '  contact              - Show email, GitHub, and communication channels',
        '  theme <name>         - Switch color theme (matrix | dracula | cyberpunk | default)',
        '  sudo hire darshan    - Authorize direct hiring request (special easter egg)',
        '  clear                - Flush terminal console display buffer',
      ].join('\n'),
    }),
  },

  whoami: {
    name: 'whoami',
    description: 'Displays user identity and role',
    usage: 'whoami',
    execute: () => ({
      type: 'text',
      output: [
        `Operator: ${PROFILE.name}`,
        `Role: ${PROFILE.title}`,
        `Education: SDMCET (CGPA ${PROFILE.stats[0].value}, Class of 2026)`,
        `Status: ${PROFILE.status}`,
        `Location: ${PROFILE.location}`,
      ].join('\n'),
    }),
  },

  about: {
    name: 'about',
    description: 'Displays background summary and bio',
    usage: 'about',
    execute: () => ({
      type: 'text',
      output: [
        `ABOUT ${PROFILE.name.toUpperCase()}`,
        '----------------------------------------',
        ...PROFILE.bioParagraphs,
        '',
        `ACADEMIC SNAPSHOT: CGPA ${PROFILE.stats[0].value} (Information Science & Engineering)`,
        `GOAL: ${PROFILE.objective}`,
      ].join('\n\n'),
    }),
  },

  skills: {
    name: 'skills',
    description: 'Outputs developer skills manifest',
    usage: 'skills [category]',
    execute: () => {
      const formatted = SKILLS_DATA.categories
        .map((cat) => `[${cat.name}]\n  ${cat.skills.join(', ')}`)
        .join('\n\n');
      return {
        type: 'text',
        output: `TECHNICAL SKILL MATRIX:\n\n${formatted}`,
      };
    },
  },

  projects: {
    name: 'projects',
    description: 'Lists all featured projects with case study slugs',
    usage: 'projects',
    execute: () => {
      const list = PROJECTS.map(
        (p) => `• ${p.title} (${p.slug})\n  Tech: ${p.techStack.join(', ')}\n  File: src/projects/${p.slug}${p.fileExtension}`
      ).join('\n\n');
      return {
        type: 'text',
        output: `FEATURED PROJECTS (Type 'open <slug>' to inspect):\n\n${list}`,
      };
    },
  },

  open: {
    name: 'open',
    description: 'Opens a project case study page',
    usage: 'open <project-slug>',
    execute: (args) => {
      if (!args || args.length === 0) {
        return {
          type: 'error',
          output: "Error: Missing project slug. Usage: open <slug>. Try 'projects' to list slugs.",
        };
      }
      const slug = args[0].trim().toLowerCase();
      const project = PROJECTS.find((p) => p.slug.toLowerCase() === slug);
      if (!project) {
        return {
          type: 'error',
          output: `Error: Project '${slug}' not found. Available slugs: ${PROJECTS.map((p) => p.slug).join(', ')}`,
        };
      }
      return {
        type: 'navigate',
        slug: project.slug,
        output: `Opening case study for ${project.title} (/projects/${project.slug})...`,
      };
    },
  },

  experience: {
    name: 'experience',
    description: 'Prints git-log style internship history',
    usage: 'experience',
    execute: () => {
      const log = EXPERIENCES.map((exp) =>
        [
          `commit ${exp.commitHash} (HEAD -> main, tag: ${exp.period})`,
          `Author: ${PROFILE.name} <${PROFILE.email}>`,
          `Date:   ${exp.period}`,
          `Role:   ${exp.role} @ ${exp.company} (${exp.location})`,
          '',
          `    ${exp.tagline}`,
          '',
          ...exp.keyAchievements.map((item) => `    * ${item}`),
          '',
          `    Tech: ${exp.technologies.join(', ')}`,
        ].join('\n')
      ).join('\n\n');
      return {
        type: 'text',
        output: log,
      };
    },
  },

  education: {
    name: 'education',
    description: 'Lists academic credentials and coursework',
    usage: 'education',
    execute: () => {
      const edu = PROFILE.education
        .map((e) =>
          [
            `• ${e.degree}`,
            `  Institution: ${e.institution}`,
            `  Duration: ${e.duration} | Score: ${e.grade}`,
            e.coursework ? `  Coursework: ${e.coursework.join(', ')}` : null,
          ]
            .filter(Boolean)
            .join('\n')
        )
        .join('\n\n');
      return {
        type: 'text',
        output: `ACADEMIC QUALIFICATIONS:\n\n${edu}`,
      };
    },
  },

  resume: {
    name: 'resume',
    description: 'Opens and downloads official PDF resume',
    usage: 'resume',
    execute: () => ({
      type: 'action',
      action: 'resume',
      output: `Accessing resume document at: ${PROFILE.resumeUrl}...`,
    }),
  },

  contact: {
    name: 'contact',
    description: 'Displays developer contact channels',
    usage: 'contact',
    execute: () => ({
      type: 'text',
      output: [
        'COMMUNICATION CHANNELS:',
        `  Email:    ${PROFILE.email}`,
        `  GitHub:   ${PROFILE.github}`,
        `  LinkedIn: ${PROFILE.linkedin}`,
        `  Location: ${PROFILE.location}`,
      ].join('\n'),
    }),
  },

  theme: {
    name: 'theme',
    description: 'Switch site color theme (matrix | dracula | cyberpunk | default)',
    usage: 'theme <matrix|dracula|cyberpunk|default>',
    execute: (args) => {
      const valid = ['matrix', 'dracula', 'cyberpunk', 'default', 'electric'];
      if (!args || args.length === 0) {
        return {
          type: 'text',
          output: `Current theme options: matrix, dracula, cyberpunk, default. Usage: theme <name>`,
        };
      }
      const requested = args[0].trim().toLowerCase();
      const target = requested === 'electric' ? 'default' : requested;
      if (!valid.includes(target)) {
        return {
          type: 'error',
          output: `Invalid theme '${requested}'. Supported: matrix, dracula, cyberpunk, default`,
        };
      }
      return {
        type: 'action',
        action: 'theme',
        theme: target,
        output: `Color theme switched to: [${target}]`,
      };
    },
  },

  sudo: {
    name: 'sudo',
    description: 'Elevated privileges executor',
    usage: 'sudo <command>',
    execute: (args) => {
      const full = (args || []).join(' ').trim().toLowerCase();
      if (full === 'hire darshan' || full === 'hire') {
        return {
          type: 'special',
          special: 'confetti',
          output: [
            '======================================================',
            'ACCESS GRANTED: HIRING PROTOCOL INITIATED (UID=0, GID=0)',
            '======================================================',
            `Congratulations! You have triggered the expedited offer pipeline for ${PROFILE.name}.`,
            `Contact: ${PROFILE.email} | Status: Ready to build high-impact software!`,
            'Confetti detonation dispatched!',
          ].join('\n'),
        };
      }
      return {
        type: 'error',
        output: `${PROFILE.name.toLowerCase()} is not in the sudoers file. This incident will be reported.`,
      };
    },
  },

  clear: {
    name: 'clear',
    description: 'Clears the terminal output screen buffer',
    usage: 'clear',
    execute: () => ({
      type: 'clear',
      output: '',
    }),
  },

  // Alias commands for quick file lookups
  cat: {
    name: 'cat',
    description: 'Concatenate and display file content',
    usage: 'cat <filename>',
    execute: (args) => {
      const file = (args?.[0] || '').toLowerCase();
      if (file.includes('skills')) {
        return commandRegistry.skills.execute();
      }
      if (file.includes('profile') || file.includes('about')) {
        return commandRegistry.about.execute();
      }
      return {
        type: 'error',
        output: `cat: ${args?.[0] || 'file'}: No such file or directory. Try 'ls'.`,
      };
    },
  },

  ls: {
    name: 'ls',
    description: 'List directory contents',
    usage: 'ls [dir]',
    execute: (args) => {
      const dir = (args?.[0] || '').toLowerCase();
      if (dir.includes('projects')) {
        return commandRegistry.projects.execute();
      }
      return {
        type: 'text',
        output: [
          'total 4',
          'drwxr-xr-x  projects/',
          '-rw-r--r--  about.md',
          '-rw-r--r--  skills.txt',
          '-rw-r--r--  package.json',
          '-rwxr-xr-x  resume.pdf',
        ].join('\n'),
      };
    },
  },

  git: {
    name: 'git',
    description: 'Version control system inspect',
    usage: 'git <command>',
    execute: (args) => {
      const sub = (args || []).join(' ');
      if (sub.includes('log')) {
        return commandRegistry.experience.execute();
      }
      return {
        type: 'text',
        output: 'git: open to entry-level software developer roles (branch: main)',
      };
    },
  },
};

/**
 * Parses and executes a command string against the command registry.
 * @param {string} rawInput The raw input command string entered by the user
 * @returns {{ type: string, output: string, [key: string]: any }}
 */
export function parseCommand(rawInput) {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return { type: 'empty', output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (Object.prototype.hasOwnProperty.call(commandRegistry, cmd)) {
    return commandRegistry[cmd].execute(args);
  }

  return {
    type: 'error',
    output: `command not found: ${cmd}. Type 'help' to inspect available instructions.`,
  };
}

/**
 * Provides autocomplete suggestions based on current input prefix.
 * @param {string} prefix Current partial input
 * @returns {string[]} List of matching command names
 */
export function getCommandSuggestions(prefix) {
  if (!prefix) return [];
  const cleanPrefix = prefix.trim().toLowerCase();
  const commandNames = Object.keys(commandRegistry);
  return commandNames.filter((name) => name.startsWith(cleanPrefix));
}
