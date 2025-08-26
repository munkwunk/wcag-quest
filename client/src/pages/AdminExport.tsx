import React from 'react';
import { CourseExportButton } from '@/components/CourseExportButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Shield } from 'lucide-react';

const AdminExport = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-3xl font-bold">Admin Export Portal</h1>
            </div>
            <p className="text-muted-foreground">
              Private access for downloading XAPI course packages
            </p>
          </div>

          <Card className="p-8 text-center">
            <div className="mb-6">
              <Download className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">WCAG Quest XAPI Package</h2>
              <p className="text-muted-foreground">
                Download the complete XAPI-compliant course package for LMS integration.
                This package includes all course materials, assessments, and tracking functionality.
              </p>
            </div>

            <div className="space-y-4">
              <CourseExportButton />
              
              <div className="text-sm text-muted-foreground pt-4 border-t">
                <p><strong>Package Contents:</strong></p>
                <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
                  <li>• tincan.xml manifest</li>
                  <li>• Course metadata (course.json)</li>
                  <li>• Launch file (index.html)</li>
                  <li>• XAPI wrapper scripts</li>
                  <li>• Activity definitions</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>This page is for authorized personnel only.</p>
            <p>Copyright © 2025 Growth for ALL. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExport;