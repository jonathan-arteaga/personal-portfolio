export interface SiteConfig {
  siteUrl: string;
  title: string;
  description: string;
  ogImagePath: string;
  contactEmail: string;
  social: {
    linkedin: string;
    github: string;
  };
  profile: {
    name: string;
    jobTitle: string;
  };
}

export const SITE_URL = 'https://rteaga.com';
export const SITE_TITLE = 'Jonathan Arteaga | Systems Architect';
export const SITE_DESCRIPTION =
  'A high-end editorial portfolio demonstrating systems judgment, clarity, and workflow automation.';
export const OG_IMAGE_PATH = '/images/screenshot.png';
export const CONTACT_EMAIL = 'jonathan@rteaga.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/arteagajonathan';
export const GITHUB_URL = 'https://github.com/jonathan-arteaga';
export const PROFILE_NAME = 'Jonathan Arteaga';
export const PROFILE_JOB_TITLE = 'Lead Solutions Engineer';

export const SITE_CONFIG: SiteConfig = {
  siteUrl: SITE_URL,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ogImagePath: OG_IMAGE_PATH,
  contactEmail: CONTACT_EMAIL,
  social: {
    linkedin: LINKEDIN_URL,
    github: GITHUB_URL,
  },
  profile: {
    name: PROFILE_NAME,
    jobTitle: PROFILE_JOB_TITLE,
  },
};
