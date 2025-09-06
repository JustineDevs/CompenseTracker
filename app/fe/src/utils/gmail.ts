/**
 * Utility functions for Gmail compose integration
 */

export interface GmailComposeData {
  to: string | string[];
  subject: string;
  body: string;
  cc?: string | string[];
  bcc?: string | string[];
}

/**
 * Opens Gmail compose window with pre-filled email content
 * Properly URL-encodes all inputs to preserve formatting like newlines and bullets.
 * 
 * This function uses encodeURIComponent() to ensure:
 * - Newlines (\n) become %0A which Gmail treats as line breaks
 * - Bullets (•) and special characters are encoded correctly
 * - Spaces and other special characters survive intact in the URL
 * - Gmail will decode and display them properly in the compose editor
 * 
 * @param data - Email data including recipients, subject, and body
 */
export function openGmailCompose(data: GmailComposeData): void {
  const baseUrl = "https://mail.google.com/mail/?view=cm&fs=1";
  
  // Normalize recipients to comma separated string
  const toParam = Array.isArray(data.to) ? data.to.join(",") : data.to;
  const ccParam = data.cc ? (Array.isArray(data.cc) ? data.cc.join(",") : data.cc) : "";
  const bccParam = data.bcc ? (Array.isArray(data.bcc) ? data.bcc.join(",") : data.bcc) : "";
  
  // Encode each component for safe URL transmission using encodeURIComponent
  const encodedTo = encodeURIComponent(toParam);
  const encodedSubject = encodeURIComponent(data.subject);
  const encodedBody = encodeURIComponent(data.body);
  const encodedCc = ccParam ? encodeURIComponent(ccParam) : "";
  const encodedBcc = bccParam ? encodeURIComponent(bccParam) : "";
  
  // Construct Gmail compose URL with proper encoding
  let gmailUrl = `${baseUrl}&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
  
  if (encodedCc) {
    gmailUrl += `&cc=${encodedCc}`;
  }
  if (encodedBcc) {
    gmailUrl += `&bcc=${encodedBcc}`;
  }
  
  // Open Gmail compose in new browser tab/window
  window.open(gmailUrl, "_blank");
}

/**
 * Alternative method: Copy formatted email to clipboard for better formatting
 * @param data - Email data including recipients, subject, and body
 */
export function copyFormattedEmailToClipboard(data: GmailComposeData): void {
  const to = Array.isArray(data.to) ? data.to.join(", ") : data.to;
  const cc = data.cc ? (Array.isArray(data.cc) ? data.cc.join(", ") : data.cc) : "";
  const bcc = data.bcc ? (Array.isArray(data.bcc) ? data.bcc.join(", ") : data.bcc) : "";
  
  let emailText = `To: ${to}\n`;
  if (cc) emailText += `CC: ${cc}\n`;
  if (bcc) emailText += `BCC: ${bcc}\n`;
  emailText += `Subject: ${data.subject}\n\n`;
  emailText += data.body;
  
  navigator.clipboard.writeText(emailText).then(() => {
    alert('Email copied to clipboard! You can now paste it into Gmail with proper formatting.');
  }).catch(() => {
    alert('Failed to copy to clipboard. Please try again.');
  });
}

/**
 * Example usage of the Gmail compose function with proper formatting
 * This demonstrates how to use the utility with AI-generated email content
 */
export function exampleGmailComposeUsage() {
  const emailContent = {
    to: "manager@company.com",
    subject: "Compensation Analysis & Next Steps",
    body: `I hope you're doing well. I wanted to schedule some time to discuss my compensation package and share some interesting findings.

Current Situation:
I've been analyzing my compensation package and wanted to share my findings:
• Base Salary: $75,000
• Total Compensation: $101,000
• Benefits Package: $26,000
• Market Research: $76,905 - $81,908

Key Insights:
• Package represents substantial company investment
• Benefits are competitive with optimization potential
• Performance metrics justify compensation discussion
• Market analysis indicates growth possibilities

Next Steps:
I'd appreciate scheduling time to discuss:
• Compensation alignment with market data
• Performance incentive optimization
• Benefits package enhancement
• Professional advancement opportunities

I'm confident we can find a solution that works for both of us. Please let me know when you might be available for this discussion.

Best regards,
[Your Name]`
  };

  openGmailCompose(emailContent);
}


/**
 * Validates email address format
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates multiple email addresses
 * @param emails - Array of email addresses or comma-separated string
 * @returns object with validation results
 */
export function validateEmails(emails: string | string[]): {
  isValid: boolean;
  validEmails: string[];
  invalidEmails: string[];
} {
  const emailList = Array.isArray(emails) ? emails : emails.split(",").map(e => e.trim());
  
  const validEmails: string[] = [];
  const invalidEmails: string[] = [];
  
  emailList.forEach(email => {
    if (email && isValidEmail(email)) {
      validEmails.push(email);
    } else if (email) {
      invalidEmails.push(email);
    }
  });
  
  return {
    isValid: invalidEmails.length === 0 && validEmails.length > 0,
    validEmails,
    invalidEmails
  };
}

