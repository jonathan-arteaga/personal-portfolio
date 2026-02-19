export const SITE_URL = 'https://rteaga.com';
export const SITE_TITLE = 'Jonathan Arteaga | Systems Architect';
export const SITE_DESCRIPTION =
  'A high-end editorial portfolio demonstrating systems judgment, clarity, and workflow automation.';
export const CONTACT_EMAIL = 'jonathan@rteaga.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/arteagajonathan';
export const GITHUB_URL = 'https://github.com/jonathan-arteaga';

export const SITE_CONFIG = {
  siteUrl: SITE_URL,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ogImagePath: '/images/screenshot.png',
  contactEmail: CONTACT_EMAIL,
  social: {
    linkedin: LINKEDIN_URL,
    github: GITHUB_URL,
  },
  profile: {
    name: 'Jonathan Arteaga',
    jobTitle: 'Lead Solutions Engineer',
  },
} as const;
