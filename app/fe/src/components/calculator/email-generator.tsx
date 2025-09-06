'use client';

import { useState, useEffect } from 'react';
import { CompensationBreakdown, CompensationInput } from '@/types/compensation';
import { AIEmailService, EmailContext, RefinementRequest } from '@/services/aiEmailService';
import { PersonalDetails } from '@/types/compensation';
import { formatCurrency } from '@/utils/currency';
import { openGmailCompose, validateEmails, copyFormattedEmailToClipboard } from '@/utils/gmail';
import { 
  Mail, 
  Send, 
  Edit3, 
  Copy, 
  Download, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  Brain,
  Settings,
  Target,
  User,
  Building,
  MessageSquare,
  Save,
  RefreshCw,
  Wand2,
  ExternalLink
} from 'lucide-react';

interface EmailGeneratorProps {
  breakdown: CompensationBreakdown;
  compensationInput?: CompensationInput;
  onBack: () => void;
  personalDetails?: PersonalDetails;
}

interface EmailTemplate {
  id: string;
  title: string;
  content: string;
  type: 'negotiation' | 'review' | 'offer' | 'custom';
  description: string;
  icon: React.ComponentType<any>;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'negotiation',
    title: 'Salary Negotiation',
    content: '',
    type: 'negotiation' as const,
    description: 'Negotiate current salary with data-driven approach',
    icon: Target
  },
  {
    id: 'review',
    title: 'Performance Review',
    content: '',
    type: 'review' as const,
    description: 'Discuss compensation during annual review',
    icon: Brain
  },
  {
    id: 'offer',
    title: 'Job Offer Response',
    content: '',
    type: 'offer' as const,
    description: 'Respond to new job offer with counter-proposal',
    icon: Mail
  },
  {
    id: 'custom',
    title: 'Custom Email',
    content: '',
    type: 'custom' as const,
    description: 'Create completely custom email with your own content',
    icon: Edit3
  }
];

export function EmailGenerator({ breakdown, compensationInput, onBack, personalDetails: initialPersonalDetails }: EmailGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('negotiation');
  const [emailContent, setEmailContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    tone: 'professional' as const,
    focus: 'total_compensation' as const,
    urgency: 'medium' as const
  });
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showRefinement, setShowRefinement] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    initialPersonalDetails || {
      recipientName: '',
      recipientEmail: '',
      userName: '',
      userRole: '',
      companyName: '',
      personalNotes: '',
      priorities: []
    }
  );

  // Update personalDetails when prop changes
  useEffect(() => {
    if (initialPersonalDetails) {
      setPersonalDetails(initialPersonalDetails);
    }
  }, [initialPersonalDetails]);
  const [refinementInstructions, setRefinementInstructions] = useState('');
  const [refinementOptions, setRefinementOptions] = useState({
    toneAdjustment: '',
    lengthAdjustment: '',
    focusAdjustment: ''
  });
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showCustomEmail, setShowCustomEmail] = useState(false);
  const [customEmailContent, setCustomEmailContent] = useState('');
  const [customEmailSubject, setCustomEmailSubject] = useState('');

  useEffect(() => {
    if (selectedTemplate) {
      generateEmail(selectedTemplate);
    }
  }, [selectedTemplate, breakdown, personalDetails, userPreferences]);

  const generateEmail = async (templateType: string) => {
    // Close custom email panel when switching to other templates
    if (templateType !== 'custom') {
      setShowCustomEmail(false);
    }
    
    // Handle custom email differently
    if (templateType === 'custom') {
      setShowCustomEmail(true);
      setEmailContent('');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const context: EmailContext = {
        type: templateType as any,
        compensationData: breakdown,
        compensationInput: compensationInput,
        personalDetails: personalDetails.recipientName ? personalDetails : undefined,
        userPreferences
      };
      
      const generatedEmail = await AIEmailService.generateEmail(context);
      setEmailContent(generatedEmail);
    } catch (error) {
      console.error('Error generating email:', error);
      setEmailContent('Error generating email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const refineEmail = async () => {
    if (!refinementInstructions.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const refinement: RefinementRequest = {
        previousEmail: emailContent,
        instructions: refinementInstructions,
        toneAdjustment: refinementOptions.toneAdjustment as any,
        lengthAdjustment: refinementOptions.lengthAdjustment as any,
        focusAdjustment: refinementOptions.focusAdjustment as any
      };
      
      const refinedEmail = await AIEmailService.refineEmail(refinement);
      setEmailContent(refinedEmail);
      setShowRefinement(false);
      setRefinementInstructions('');
    } catch (error) {
      console.error('Error refining email:', error);
      setEmailContent('Error refining email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTemplate = () => {
    if (!templateName.trim()) return;
    
    const context: EmailContext = {
      type: selectedTemplate as any,
      compensationData: breakdown,
      compensationInput: compensationInput,
      personalDetails: personalDetails.recipientName ? personalDetails : undefined,
      userPreferences
    };
    
    AIEmailService.saveEmailTemplate(emailContent, templateName, context);
    setShowSaveTemplate(false);
    setTemplateName('');
  };

  const handleCustomEmailSubmit = () => {
    if (!customEmailContent.trim()) return;
    
    const customEmail = `Subject: ${customEmailSubject || 'Compensation Discussion'}

${customEmailContent}`;
    
    setEmailContent(customEmail);
    setShowCustomEmail(false);
  };

  const handlePersonalizeClick = () => {
    // Close custom email panel when using personalize
    setShowCustomEmail(false);
    // Directly generate personalized email
    handlePersonalizeGenerate();
  };

  const handlePersonalizeGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const context: EmailContext = {
        type: selectedTemplate as any,
        compensationData: breakdown,
        compensationInput: compensationInput,
        personalDetails: personalDetails.recipientName ? personalDetails : undefined,
        userPreferences
      };
      
      const generatedEmail = await AIEmailService.generateEmail(context);
      setEmailContent(generatedEmail);
    } catch (error) {
      console.error('Error generating personalized email:', error);
      setEmailContent('Error generating personalized email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditAsCustom = async () => {
    // Show custom email panel first
    setShowCustomEmail(true);
    
    // Generate AI content to populate the fields
    setIsGenerating(true);
    try {
      const context: EmailContext = {
        type: selectedTemplate as any,
        compensationData: breakdown,
        compensationInput: compensationInput,
        personalDetails: personalDetails.recipientName ? personalDetails : undefined,
        userPreferences
      };
      
      const generatedEmail = await AIEmailService.generateEmail(context);
      
      // Extract subject and content from generated email
      const lines = generatedEmail.split('\n');
      const subjectLine = lines.find(line => line.startsWith('Subject:'));
      const subject = subjectLine ? subjectLine.replace('Subject:', '').trim() : 'Compensation Discussion';
      
      // Get content after subject line
      const subjectIndex = lines.findIndex(line => line.startsWith('Subject:'));
      const content = subjectIndex >= 0 ? lines.slice(subjectIndex + 2).join('\n') : generatedEmail;
      
      // Populate custom email fields with AI-generated content
      setCustomEmailSubject(subject);
      setCustomEmailContent(content);
    } catch (error) {
      console.error('Error generating AI content for custom email:', error);
      // Fallback to existing email content if AI generation fails
      const lines = emailContent.split('\n');
      const subjectLine = lines.find(line => line.startsWith('Subject:'));
      const subject = subjectLine ? subjectLine.replace('Subject:', '').trim() : 'Compensation Discussion';
      
      const subjectIndex = lines.findIndex(line => line.startsWith('Subject:'));
      const content = subjectIndex >= 0 ? lines.slice(subjectIndex + 2).join('\n') : emailContent;
      
      setCustomEmailSubject(subject);
      setCustomEmailContent(content);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([emailContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `compensation-email-${selectedTemplate}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatCurrencyAmount = (amount: number) => {
    return formatCurrency(amount, breakdown.currency);
  };


  const handleGmailCompose = () => {
    if (!emailContent.trim()) {
      alert('Please generate an email first');
      return;
    }

    if (!personalDetails?.recipientEmail?.trim()) {
      alert('Please enter recipient email address in the Personalize section');
      return;
    }

    const validation = validateEmails(personalDetails.recipientEmail);
    if (!validation.isValid) {
      alert(`Invalid email addresses: ${validation.invalidEmails.join(', ')}`);
      return;
    }

    // Extract subject from email content (first line or look for Subject: pattern)
    const lines = emailContent.split('\n');
    let subject = 'Compensation Discussion';
    
    // Look for subject line patterns
    const subjectMatch = emailContent.match(/Subject:\s*(.+)/i) || 
                        emailContent.match(/Re:\s*(.+)/i) ||
                        emailContent.match(/Fwd:\s*(.+)/i);
    
    if (subjectMatch) {
      subject = subjectMatch[1].trim();
    } else if (lines.length > 1 && lines[0].length < 100) {
      // Use first line as subject if it's short enough
      subject = lines[0].trim();
    }

    // Extract body (everything after subject or first line)
    let body = emailContent;
    if (subjectMatch) {
      body = emailContent.replace(subjectMatch[0], '').trim();
    } else if (lines.length > 1 && lines[0].length < 100) {
      body = lines.slice(1).join('\n').trim();
    }

    // Open Gmail compose
    openGmailCompose({
      to: validation.validEmails,
      subject: subject,
      body: body
    });
  };

  const handleCopyForGmail = () => {
    if (!emailContent.trim()) {
      alert('Please generate an email first');
      return;
    }

    if (!personalDetails?.recipientEmail?.trim()) {
      alert('Please enter recipient email address in the Personalize section');
      return;
    }

    const validation = validateEmails(personalDetails.recipientEmail);
    if (!validation.isValid) {
      alert(`Invalid email addresses: ${validation.invalidEmails.join(', ')}`);
      return;
    }

    // Extract subject from email content
    const lines = emailContent.split('\n');
    let subject = 'Compensation Discussion';
    
    const subjectMatch = emailContent.match(/Subject:\s*(.+)/i) || 
                        emailContent.match(/Re:\s*(.+)/i) ||
                        emailContent.match(/Fwd:\s*(.+)/i);
    
    if (subjectMatch) {
      subject = subjectMatch[1].trim();
    } else if (lines.length > 1 && lines[0].length < 100) {
      subject = lines[0].trim();
    }

    // Extract body
    let body = emailContent;
    if (subjectMatch) {
      body = emailContent.replace(subjectMatch[0], '').trim();
    } else if (lines.length > 1 && lines[0].length < 100) {
      body = lines.slice(1).join('\n').trim();
    }

    // Copy formatted email to clipboard
    copyFormattedEmailToClipboard({
      to: validation.validEmails,
      subject: subject,
      body: body
    });
  };

  return (
    <div className="h-full flex flex-col space-y-2">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Mail className="w-4 h-4 text-green-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">AI Email Generator</h3>
            <p className="text-xs text-gray-600">Generate personalized emails for compensation discussions</p>
          </div>
        </div>

        {/* Template Selection */}
        <div className="space-y-2">
          <div className="flex space-x-1">
            {emailTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{template.title}</span>
                </button>
              );
            })}
          </div>
          
          {/* Selected Template Description */}
          {selectedTemplate && (
            <div className="text-xs text-gray-600 bg-blue-50 rounded-lg p-2">
              <strong>{emailTemplates.find(t => t.id === selectedTemplate)?.title}:</strong>{' '}
              {emailTemplates.find(t => t.id === selectedTemplate)?.description}
            </div>
          )}
          
          
          {/* Personal Details Panel */}
          {showPersonalDetails && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-3">
              <h4 className="text-xs font-semibold text-gray-900">Personal Details</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Recipient Name</label>
                  <input
                    type="text"
                    value={personalDetails.recipientName}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, recipientName: e.target.value }))}
                    placeholder="e.g., John Smith"
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    value={personalDetails.userName}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder="e.g., Jane Doe"
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Your Role</label>
                  <input
                    type="text"
                    value={personalDetails.userRole}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, userRole: e.target.value }))}
                    placeholder="e.g., Software Engineer"
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Company</label>
                  <input
                    type="text"
                    value={personalDetails.companyName}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., Tech Corp"
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Personal Notes (Optional)</label>
                <textarea
                  value={personalDetails.personalNotes}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, personalNotes: e.target.value }))}
                  placeholder="Any specific points you want to mention..."
                  rows={4}
                  className="w-full text-xs border border-gray-300 rounded px-3 py-2 resize-none"
                />
              </div>
              
              <button
                onClick={() => {
                  setShowPersonalDetails(false);
                  generateEmail(selectedTemplate);
                }}
                className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate with Personal Details
              </button>
            </div>
          )}
          
          {/* Custom Email Panel */}
          {showCustomEmail && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 space-y-3">
              <h4 className="text-xs font-semibold text-gray-900 flex items-center">
                <Edit3 className="w-3 h-3 mr-1" />
                Create Custom Email
                {isGenerating && (
                  <span className="ml-2 text-xs text-blue-600 flex items-center">
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Generating AI content...
                  </span>
                )}
              </h4>
              
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Email Subject</label>
                <input
                  type="text"
                  value={customEmailSubject}
                  onChange={(e) => setCustomEmailSubject(e.target.value)}
                  placeholder="e.g., Compensation Review Request"
                  disabled={isGenerating}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Email Content</label>
                <textarea
                  value={customEmailContent}
                  onChange={(e) => setCustomEmailContent(e.target.value)}
                  placeholder="Write your custom email content here..."
                  rows={8}
                  disabled={isGenerating}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div className="text-xs text-gray-600 bg-purple-100 rounded p-2">
                <strong>Tips:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Include specific compensation data: ${breakdown.trueCostToCompany?.toLocaleString() || '0'}</li>
                  <li>• Mention your role: {personalDetails.userRole || '[Your Role]'}</li>
                  <li>• Be professional and data-driven</li>
                  <li>• Include a clear call to action</li>
                </ul>
              </div>
              
              <div className="text-xs text-gray-600 bg-green-50 rounded p-2">
                <strong>Auto-Replacement Status:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• [Manager's Name] → {personalDetails.recipientName || 'Not set'}</li>
                  <li>• [Your Name] → {personalDetails.userName || 'Not set'}</li>
                  <li>• [Your Role] → {personalDetails.userRole || 'Not set'}</li>
                  <li>• [Company Name] → {personalDetails.companyName || 'Not set'}</li>
                  {personalDetails.personalNotes && (
                    <li>• Performance Highlights → {personalDetails.personalNotes.substring(0, 50)}...</li>
                  )}
                </ul>
              </div>
              
              <div className="text-xs text-gray-600 bg-blue-100 rounded p-2">
                <strong>Quick Start:</strong>
                <p className="mt-1">Don't want to write from scratch? Click below to auto-fill this form with AI-generated content that you can then customize.</p>
                <button
                  onClick={async () => {
                    setIsGenerating(true);
                    try {
                      const context: EmailContext = {
                        type: selectedTemplate as any,
                        compensationData: breakdown,
                        compensationInput: compensationInput,
                        personalDetails: personalDetails.recipientName ? personalDetails : undefined,
                        userPreferences
                      };
                      
                      const generatedEmail = await AIEmailService.generateEmail(context);
                      
                      // Extract subject and content from generated email
                      const lines = generatedEmail.split('\n');
                      const subjectLine = lines.find(line => line.startsWith('Subject:'));
                      const subject = subjectLine ? subjectLine.replace('Subject:', '').trim() : 'Compensation Discussion';
                      
                      // Get content after subject line
                      const subjectIndex = lines.findIndex(line => line.startsWith('Subject:'));
                      const content = subjectIndex >= 0 ? lines.slice(subjectIndex + 2).join('\n') : generatedEmail;
                      
                      // Auto-fill the custom email fields
                      setCustomEmailSubject(subject);
                      setCustomEmailContent(content);
                    } catch (error) {
                      console.error('Error generating AI content:', error);
                      // Fallback: set some basic content
                      setCustomEmailSubject('Compensation Discussion');
                      setCustomEmailContent(`Dear [Manager's Name],

I hope this email finds you well. I wanted to discuss my current compensation package and share some insights I've gathered.

Based on my analysis, my total compensation is $${breakdown.trueCostToCompany?.toLocaleString() || '0'}, which I believe may not fully reflect my contributions and market value.

I would appreciate the opportunity to discuss this further and look forward to your response.

Best regards,
[Your Name]`);
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating}
                  className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="w-3 h-3 mr-1" />
                      Generate with AI First
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleCustomEmailSubmit}
                  disabled={!customEmailContent.trim() || isGenerating}
                  className="flex-1 bg-purple-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  Create Email
                </button>
                <button
                  onClick={() => setShowCustomEmail(false)}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Email Content - Maximized */}
      <div className="bg-white rounded-lg shadow-sm p-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">Generated Email</h3>
          <div className="flex space-x-1">
            <button
              onClick={onBack}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Insights</span>
            </button>
            <button
              onClick={() => generateEmail(selectedTemplate)}
              disabled={isGenerating}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <Mail className="w-3 h-3" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={handleGmailCompose}
              disabled={!emailContent.trim() || !personalDetails?.recipientEmail?.trim()}
              className="btn btn-primary flex items-center space-x-1 text-xs py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Open Gmail compose with pre-filled email (formatting may be limited)"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Send via Gmail</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleCopyForGmail}
              disabled={!emailContent.trim() || !personalDetails?.recipientEmail?.trim()}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy email with proper formatting to paste into Gmail"
            >
              <Copy className="w-3 h-3" />
              <span>Copy for Gmail</span>
            </button>
            <button
              onClick={handleCopy}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              {copied ? <CheckCircle className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setShowRefinement(!showRefinement)}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <Wand2 className="w-3 h-3" />
              <span>Refine</span>
            </button>
            <button
              onClick={() => setShowSaveTemplate(!showSaveTemplate)}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <Save className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button
              onClick={handleEditAsCustom}
              disabled={isGenerating}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3" />
                  <span>Edit as Custom</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isGenerating ? (
          <div className="text-center py-6 flex-1 flex flex-col justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              AI is Analyzing Your Data
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              Applying negotiation strategies based on your compensation details...
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Analyzing market positioning</div>
              <div>• Selecting optimal negotiation strategy</div>
              <div>• Crafting personalized content</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {isEditing ? (
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full flex-1 p-3 border border-gray-300 rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit your email content..."
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 flex-1 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-xs text-gray-800 leading-relaxed">
                  {emailContent}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Refinement Panel */}
      {showRefinement && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-3">
          <h4 className="text-xs font-semibold text-gray-900 flex items-center">
            <Wand2 className="w-3 h-3 mr-1" />
            AI Email Refinement
          </h4>
          
          <div className="text-xs text-gray-600 bg-yellow-100 rounded p-2">
            <strong>Refine your email with AI:</strong> Use the instructions below and the refinement options to modify tone, length, focus, or add specific requirements.
          </div>
          
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Refinement Instructions</label>
            <textarea
              value={refinementInstructions}
              onChange={(e) => setRefinementInstructions(e.target.value)}
              placeholder="e.g., 'Make it more assertive', 'Add more data points', 'Make it shorter', 'Focus more on benefits'..."
              rows={2}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1"
            />
          </div>
          
          {/* Quick Refinement Options */}
          <div className="bg-white rounded-lg p-3 space-y-3">
            <h5 className="text-xs font-semibold text-gray-900 flex items-center">
              <Settings className="w-3 h-3 mr-1" />
              Quick Refinement Options
            </h5>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Tone</label>
                <select
                  value={userPreferences.tone}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, tone: e.target.value as any }))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="professional">Professional</option>
                  <option value="collaborative">Collaborative</option>
                  <option value="assertive">Assertive</option>
                  <option value="diplomatic">Diplomatic</option>
                  <option value="more_formal">More Formal</option>
                  <option value="more_casual">More Casual</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Focus</label>
                <select
                  value={userPreferences.focus}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, focus: e.target.value as any }))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="salary">Base Salary</option>
                  <option value="benefits">Benefits</option>
                  <option value="total_compensation">Total Package</option>
                  <option value="career_growth">Career Growth</option>
                  <option value="more_data">More Data</option>
                  <option value="more_personal">More Personal</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Length</label>
                <select
                  value={refinementOptions.lengthAdjustment}
                  onChange={(e) => setRefinementOptions(prev => ({ ...prev, lengthAdjustment: e.target.value }))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">No change</option>
                  <option value="shorter">Shorter</option>
                  <option value="longer">Longer</option>
                  <option value="same">Same</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Urgency</label>
                <select
                  value={userPreferences.urgency}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, urgency: e.target.value as any }))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Style</label>
                <select
                  value={refinementOptions.focusAdjustment}
                  onChange={(e) => setRefinementOptions(prev => ({ ...prev, focusAdjustment: e.target.value }))}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">No change</option>
                  <option value="more_benefits">More Benefits</option>
                  <option value="more_salary">More Salary</option>
                  <option value="more_assertive">More Assertive</option>
                  <option value="more_diplomatic">More Diplomatic</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={refineEmail}
              disabled={!refinementInstructions.trim() || isGenerating}
              className="flex-1 bg-yellow-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Refining...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Refine Email
                </>
              )}
            </button>
            <button
              onClick={() => setShowRefinement(false)}
              className="px-3 py-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save Template Panel */}
      {showSaveTemplate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-3">
          <h4 className="text-xs font-semibold text-gray-900 flex items-center">
            <Save className="w-3 h-3 mr-1" />
            Save Email Template
          </h4>
          
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g., 'Salary Negotiation - Q4 2024'"
              className="w-full text-xs border border-gray-300 rounded px-2 py-1"
            />
          </div>
          
          <div className="text-xs text-gray-600">
            <strong>Template includes:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Email type: {emailTemplates.find(t => t.id === selectedTemplate)?.title}</li>
              <li>• Personal details: {personalDetails.recipientName ? 'Yes' : 'No'}</li>
              <li>• Tone: {userPreferences.tone}</li>
              <li>• Focus: {userPreferences.focus.replace('_', ' ')}</li>
            </ul>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={saveTemplate}
              disabled={!templateName.trim()}
              className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Save className="w-3 h-3 mr-1" />
              Save Template
            </button>
            <button
              onClick={() => setShowSaveTemplate(false)}
              className="px-3 py-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Email Summary - Enhanced with AI Info */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2">
        <h3 className="text-xs font-semibold text-gray-900 mb-1">AI-Generated Email Summary</h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">
              {emailContent.split(' ').length}
            </div>
            <div className="text-xs text-gray-600">Words</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-blue-600">
              {emailContent.split('\n').length}
            </div>
            <div className="text-xs text-gray-600">Lines</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">
              {formatCurrencyAmount(breakdown.trueCostToCompany)}
            </div>
            <div className="text-xs text-gray-600">Total CTC</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-orange-600">
              {userPreferences.tone}
            </div>
            <div className="text-xs text-gray-600">Tone</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600 text-center">
          <strong>AI Settings Applied:</strong> {userPreferences.tone} tone • 
          <span className="capitalize">{userPreferences.focus.replace('_', ' ')}</span> focus • 
          {userPreferences.urgency} urgency
          {personalDetails.recipientName && (
            <span className="ml-2 text-green-600">• <strong>Personalized</strong></span>
          )}
          {personalDetails.personalNotes && (
            <span className="ml-2 text-blue-600">• <strong>Performance Highlights Auto-Filled</strong></span>
          )}
        </div>
      </div>

    </div>
  );
}
