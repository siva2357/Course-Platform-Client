export enum SocialPlatform {
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Website = 'Website',
  Twitter = 'Twitter',
  GitHub = 'GitHub',
  Behance = 'Behance',
  Dribbble = 'Dribbble',
  Medium = 'Medium'
}

export const SOCIAL_URL_PATTERNS: Record<SocialPlatform, RegExp> = {
  [SocialPlatform.LinkedIn]: /^https:\/\/(www\.)?linkedin\.com\/.*$/i,
  [SocialPlatform.Instagram]: /^https:\/\/(www\.)?instagram\.com\/.*$/i,
  [SocialPlatform.Website]: /^https?:\/\/.*$/i,
  [SocialPlatform.Twitter]: /^https:\/\/(www\.)?twitter\.com\/.*$/i,
  [SocialPlatform.GitHub]: /^https:\/\/(www\.)?github\.com\/.*$/i,
  [SocialPlatform.Behance]: /^https:\/\/(www\.)?behance\.net\/.*$/i,
  [SocialPlatform.Dribbble]: /^https:\/\/(www\.)?dribbble\.com\/.*$/i,
  [SocialPlatform.Medium]: /^https:\/\/(www\.)?medium\.com\/.*$/i
};
