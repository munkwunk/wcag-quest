
import React from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { XAPICourseExporter } from '../utils/xapi-export';

export const CourseExportButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const exporter = new XAPICourseExporter();
      const coursePackage = await exporter.exportCourse();
      
      // Download the package
      const url = URL.createObjectURL(coursePackage);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wcag-quest-xapi-course.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('xAPI course package exported successfully');
    } catch (error) {
      console.error('Failed to export course:', error);
    }
  };

  return (
    <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Export xAPI Course
    </Button>
  );
};
