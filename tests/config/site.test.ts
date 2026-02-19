import { describe, expect, it } from 'vitest';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_CONFIG,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '../../config/site';

describe('site config', () => {
  it('exports canonical primitives', () => {
    expect(SITE_URL).toBe('https://rteaga.com');
    expect(SITE_TITLE).toContain('Jonathan Arteaga');
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(20);
    expect(CONTACT_EMAIL).toContain('@');
    expect(LINKEDIN_URL).toContain('linkedin.com');
    expect(GITHUB_URL).toContain('github.com');
  });

  it('builds SITE_CONFIG from primitive values', () => {
    expect(SITE_CONFIG.siteUrl).toBe(SITE_URL);
    expect(SITE_CONFIG.title).toBe(SITE_TITLE);
    expect(SITE_CONFIG.description).toBe(SITE_DESCRIPTION);
    expect(SITE_CONFIG.contactEmail).toBe(CONTACT_EMAIL);
    expect(SITE_CONFIG.social.linkedin).toBe(LINKEDIN_URL);
    expect(SITE_CONFIG.social.github).toBe(GITHUB_URL);
  });
});
