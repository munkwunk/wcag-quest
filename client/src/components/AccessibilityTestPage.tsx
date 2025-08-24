import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AccessibilityIssue } from '@/types/game';

interface AccessibilityTestPageProps {
  issues: AccessibilityIssue[];
  completedIssues: string[];
  onIssueClick: (issue: AccessibilityIssue) => void;
}

export const AccessibilityTestPage: React.FC<AccessibilityTestPageProps> = ({
  issues,
  completedIssues,
  onIssueClick
}) => {
  const [isFixed, setIsFixed] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fixedState: { [key: string]: boolean } = {};
    completedIssues.forEach(issueId => {
      fixedState[issueId] = true;
    });
    setIsFixed(fixedState);
  }, [completedIssues]);

  const handleIssueClick = (issue: AccessibilityIssue) => {
    if (!completedIssues.includes(issue.id)) {
      onIssueClick(issue);
    }
  };

  const renderIssueButton = (issue: AccessibilityIssue, children: React.ReactNode) => {
    const isCompleted = completedIssues.includes(issue.id);
    
    return (
      <Button
        type="button"
        variant={isCompleted ? "ghost" : "issue"}
        className={`${isCompleted ? 'cursor-default opacity-75' : ''} relative`}
        onClick={() => handleIssueClick(issue)}
        disabled={isCompleted}
        aria-label={isCompleted ? 'Issue fixed' : 'Fix this issue'}
      >
        {children}
        {!isCompleted && (
          <span className="absolute -top-2 -right-2 bg-warning text-warning-foreground text-xs px-1.5 py-0.5 rounded-full">
            !
          </span>
        )}
      </Button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-background">
      {/* Instructions Banner */}
      <div className="bg-amber-100 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
            !
          </div>
          <div>
            <h2 className="font-semibold text-amber-800 mb-1">Testing Instructions</h2>
            <p className="text-amber-700 text-sm">
              This page intentionally contains WCAG accessibility failures for educational purposes. 
              Use your screen reader to navigate and click "Fix this issue" on elements that need correction.
            </p>
          </div>
        </div>
      </div>

      {/* Skip Link - Initially missing, will be added when fixed */}
      {isFixed['missing-skip-link'] ? (
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
      ) : (
        <div className="mb-4">
          {renderIssueButton(
            issues.find(i => i.id === 'missing-skip-link')!,
            <span className="text-xs">Add missing skip link</span>
          )}
        </div>
      )}

      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Accessibility Learning Platform</h1>
          <p className="mt-2 text-primary-foreground/90">Master WCAG guidelines through hands-on testing</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-secondary border-b">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-4">
            <li><a href="#" className="text-secondary-foreground hover:text-primary">Home</a></li>
            <li><a href="#" className="text-secondary-foreground hover:text-primary">Courses</a></li>
            <li><a href="#" className="text-secondary-foreground hover:text-primary">Resources</a></li>
            <li><a href="#" className="text-secondary-foreground hover:text-primary">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Hero Section with Image Issue */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Learn Accessibility Testing</h2>
              <p className="text-muted-foreground mb-6">
                Develop essential skills in web accessibility testing using screen readers. 
                Our interactive platform helps you identify and fix common WCAG violations.
              </p>
              
              {/* Issue: Vague link text */}
              <div className="flex items-center gap-2">
                {isFixed['vague-link-text'] ? (
                  <a href="#" className="text-primary hover:underline" onClick={(e) => e.preventDefault()}>
                    Learn more about WCAG guidelines
                  </a>
                ) : (
                  <>
                    <a href="#" className="text-primary hover:underline" onClick={(e) => e.preventDefault()}>
                      Learn more
                    </a>
                    {renderIssueButton(
                      issues.find(i => i.id === 'vague-link-text')!,
                      <span className="text-xs">Fix this issue</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-center relative">
              {/* Issue: Missing alt text */}
              {isFixed['missing-alt-text'] ? (
                <img 
                  src="/src/assets/logo.jpg" 
                  alt="Growth for ALL logo: A Venn diagram showing the intersection of Leadership, Growth, Accessibility, and Learning"
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                  id="hero-image"
                />
              ) : (
                <img 
                  src="/src/assets/logo.jpg" 
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                  id="hero-image"
                />
              )}
              {!isFixed['missing-alt-text'] && (
                <div className="absolute top-2 right-2">
                  {renderIssueButton(
                    issues.find(i => i.id === 'missing-alt-text')!,
                    <span className="text-xs">Fix this issue</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section with Heading Issue */}
        <section className="mb-12">
          {/* Issue: Improper heading hierarchy */}
          <div className="flex items-center gap-4 mb-6">
            {isFixed['heading-hierarchy'] ? (
              <h2 id="main-heading" className="text-xl font-bold">Key Features</h2>
            ) : (
              <>
                <h4 id="main-heading" className="text-xl font-bold">Key Features</h4>
                {renderIssueButton(
                  issues.find(i => i.id === 'heading-hierarchy')!,
                  <span className="text-xs">Fix this issue</span>
                )}
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Screen Reader Training</h3>
              <p className="text-muted-foreground">Learn to navigate and test with NVDA, JAWS, and VoiceOver</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">WCAG Guidelines</h3>
              <p className="text-muted-foreground">Understand and apply Web Content Accessibility Guidelines</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Real-world Testing</h3>
              <p className="text-muted-foreground">Practice with authentic scenarios and common issues</p>
            </Card>
          </div>
        </section>

        {/* Contact Form with Input Issue */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
          <Card className="p-6 max-w-md">
            <form className="space-y-4">
              <div>
                {/* Issue: Unlabeled input */}
                {isFixed['unlabeled-input'] ? (
                  <>
                    <label htmlFor="email-input" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      id="email-input" 
                      placeholder="Enter your email"
                      className="w-full"
                    />
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input 
                        type="email" 
                        id="email-input" 
                        className="flex-1"
                      />
                      {renderIssueButton(
                        issues.find(i => i.id === 'unlabeled-input')!,
                        <span className="text-xs">Fix this issue</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full">
                Start Learning
              </Button>
            </form>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-secondary-foreground">&copy; 2024 Accessibility Learning Platform. Built with WCAG 2.2 AA compliance.</p>
        </div>
      </footer>
    </div>
  );
};