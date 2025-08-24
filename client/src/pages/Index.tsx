// Update this page (the content is just a fallback if you fail to update the page)

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Play, Target, Users, BookOpen, Headphones, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/src/assets/logo.jpg" 
                alt="Growth for ALL logo: A Venn diagram showing the intersection of Leadership, Growth, Accessibility, and Learning" 
                className="w-48 h-48 mx-auto mb-6 rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master <span className="text-primary">WCAG</span> Testing with
              <br />
              Interactive Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn accessibility testing through hands-on experience. Navigate with screen readers, 
              identify WCAG failures, and master remediation strategies in a gamified environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero" className="text-lg px-8 py-6">
                <Link to="/game">
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link to="#features">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the most effective way to learn accessibility testing through interactive, 
              real-world scenarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Screen Reader Training</h3>
              </div>
              <p className="text-muted-foreground">
                Learn to navigate and test with NVDA, JAWS, and VoiceOver through guided practice 
                and real-world scenarios.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold ml-4">WCAG Guidelines</h3>
              </div>
              <p className="text-muted-foreground">
                Master Web Content Accessibility Guidelines (WCAG) 2.2 AA standards through 
                interactive identification and remediation exercises.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Gamified Learning</h3>
              </div>
              <p className="text-muted-foreground">
                Progress through increasingly challenging scenarios with immediate feedback, 
                scoring, and achievement tracking.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-error" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Real-world Testing</h3>
              </div>
              <p className="text-muted-foreground">
                Practice with authentic web pages containing common accessibility issues 
                found in production environments.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Multi-Persona Training</h3>
              </div>
              <p className="text-muted-foreground">
                Designed for testers, developers, procurement officers, and accessibility 
                advocates at all skill levels.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Progress Tracking</h3>
              </div>
              <p className="text-muted-foreground">
                Monitor your learning progress with xAPI integration and detailed 
                performance analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our step-by-step approach makes learning accessibility testing intuitive and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Navigate & Explore</h3>
              <p className="text-muted-foreground">
                Use your screen reader to navigate through simulated web pages with accessibility issues.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warning-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Identify Issues</h3>
              <p className="text-muted-foreground">
                Click on elements you suspect have accessibility failures to test your knowledge.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Fix</h3>
              <p className="text-muted-foreground">
                Answer questions about WCAG criteria and remediation strategies, then see fixes applied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Master Accessibility Testing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers, testers, and accessibility advocates who are 
              building more inclusive web experiences.
            </p>
            
            <Button asChild size="lg" variant="hero" className="text-lg px-12 py-6">
              <Link to="/game">
                <Play className="h-5 w-5 mr-2" />
                Start Your Journey
              </Link>
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              No registration required • Free to use • WCAG 2.2 AA compliant
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            WCAG Quest is Copyright &copy; 2025 Growth for ALL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
