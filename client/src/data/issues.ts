import { AccessibilityIssue } from '../types/game';

export const accessibilityIssues: AccessibilityIssue[] = [
  {
    id: "missing-alt-text",
    element: "#hero-image",
    failure: "Image missing alternative text",
    wcag: "1.1.1 Non-text Content",
    level: "A",
    fixOptions: [
      "Add decorative alt='' attribute",
      "Add descriptive alt text",
      "Remove the image",
      "Add title attribute instead"
    ],
    correctFix: "Add descriptive alt text",
    description: "Screen readers cannot access the content of this image because it lacks alternative text.",
    beforeFix: '<img src="/src/assets/logo.jpg" class="hero-image">',
    afterFix: '<img src="/src/assets/logo.jpg" alt="Growth for ALL logo: A Venn diagram showing the intersection of Leadership, Growth, Accessibility, and Learning" class="hero-image">'
  },
  {
    id: "heading-hierarchy",
    element: "#main-heading",
    failure: "Improper heading hierarchy (H1 to H4 skip)",
    wcag: "1.3.1 Info and Relationships",
    level: "A",
    fixOptions: [
      "Change H4 to H2",
      "Add H2 and H3 headings above",
      "Use ARIA level attribute",
      "Keep as H4 but add role='heading'"
    ],
    correctFix: "Change H4 to H2",
    description: "Heading levels should not skip - this H4 should be H2 to follow proper hierarchy after the H1.",
    beforeFix: '<h4 id="main-heading">Key Features</h4>',
    afterFix: '<h2 id="main-heading">Key Features</h2>'
  },
  {
    id: "unlabeled-input",
    element: "#email-input",
    failure: "Form input without associated label",
    wcag: "1.3.1 Info and Relationships",
    level: "A",
    fixOptions: [
      "Add aria-label attribute",
      "Associate with existing label using for/id",
      "Add aria-labelledby attribute",
      "Add placeholder text only"
    ],
    correctFix: "Associate with existing label using for/id",
    description: "Screen readers cannot identify what this input field is for without a proper label association.",
    beforeFix: '<input type="email" id="email-input" placeholder="Enter your email">',
    afterFix: '<label for="email-input">Email Address</label><input type="email" id="email-input" placeholder="Enter your email">'
  },
  {
    id: "vague-link-text",
    element: "#learn-more-link",
    failure: "Non-descriptive link text",
    wcag: "2.4.4 Link Purpose (In Context)",
    level: "A",
    fixOptions: [
      "Change text to 'Learn more about WCAG guidelines'",
      "Add aria-label with descriptive text",
      "Add title attribute",
      "Keep 'Learn more' but add context before it"
    ],
    correctFix: "Change text to 'Learn more about WCAG guidelines'",
    description: "Links with text like 'Learn more' don't provide context when read out of sequence by screen readers.",
    beforeFix: '<a href="/wcag-guide" id="learn-more-link">Learn more</a>',
    afterFix: '<a href="/wcag-guide" id="learn-more-link">Learn more about WCAG guidelines</a>'
  },
  {
    id: "missing-skip-link",
    element: "body",
    failure: "Missing skip navigation link",
    wcag: "2.4.1 Bypass Blocks",
    level: "A",
    fixOptions: [
      "Add skip link to main content",
      "Add skip link to navigation",
      "Use ARIA landmarks only",
      "Add multiple skip links for different sections"
    ],
    correctFix: "Add skip link to main content",
    description: "Keyboard users need a way to skip repetitive navigation and go directly to the main content.",
    beforeFix: '<body><nav>...</nav><main>...',
    afterFix: '<body><a href="#main-content" class="skip-link">Skip to main content</a><nav>...</nav><main id="main-content">...'
  }
];