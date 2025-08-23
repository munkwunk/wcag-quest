import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ProgressTrackerProps {
  totalIssues: number;
  foundIssues: number;
  completedIssues: number;
  score: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalIssues,
  foundIssues,
  completedIssues,
  score
}) => {
  const progressPercentage = (completedIssues / totalIssues) * 100;

  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Progress Tracker</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Issues Completed</span>
            <span>{completedIssues} of {totalIssues}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-accent rounded-lg p-3">
            <div className="font-medium text-accent-foreground">Found</div>
            <div className="text-2xl font-bold text-primary">{foundIssues}</div>
          </div>
          <div className="bg-accent rounded-lg p-3">
            <div className="font-medium text-accent-foreground">Score</div>
            <div className="text-2xl font-bold text-success">{score}%</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Issue Status:</h3>
          {Array.from({ length: totalIssues }, (_, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {index < completedIssues ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={index < completedIssues ? 'text-success' : 'text-muted-foreground'}>
                Issue {index + 1}
                {index < completedIssues && ' ✓'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};