import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccessibilityIssue } from '@/types/game';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface GameModalProps {
  issue: AccessibilityIssue;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (isCorrect: boolean) => void;
  onTrackWCAG: (selected: string, isCorrect: boolean) => void;
  onTrackFix: (selected: string, isCorrect: boolean) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  issue,
  isOpen,
  onClose,
  onComplete,
  onTrackWCAG,
  onTrackFix
}) => {
  const [currentStep, setCurrentStep] = useState<'identify' | 'fix' | 'result'>('identify');
  const [selectedWCAG, setSelectedWCAG] = useState<string>('');
  const [selectedFix, setSelectedFix] = useState<string>('');
  const [wcagCorrect, setWcagCorrect] = useState<boolean>(false);
  const [fixCorrect, setFixCorrect] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('identify');
      setSelectedWCAG('');
      setSelectedFix('');
      setWcagCorrect(false);
      setFixCorrect(false);
      // Focus the title when modal opens
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  }, [isOpen, issue]);

  useEffect(() => {
    // Focus the title when step changes
    setTimeout(() => {
      titleRef.current?.focus();
    }, 100);
  }, [currentStep]);

  const handleWCAGSubmit = () => {
    const isCorrect = selectedWCAG === issue.wcag;
    setWcagCorrect(isCorrect);
    onTrackWCAG(selectedWCAG, isCorrect);
    setCurrentStep('fix');
  };

  const handleFixSubmit = () => {
    const isCorrect = selectedFix === issue.correctFix;
    setFixCorrect(isCorrect);
    onTrackFix(selectedFix, isCorrect);
    setCurrentStep('result');
  };

  const handleComplete = () => {
    onComplete(wcagCorrect && fixCorrect);
    onClose();
  };

  const wcagOptions = [
    "1.1.1 Non-text Content",
    "1.3.1 Info and Relationships", 
    "2.4.1 Bypass Blocks",
    "2.4.4 Link Purpose (In Context)",
    "3.3.2 Labels or Instructions"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        aria-describedby="modal-description"
      >
        <DialogHeader>
          <DialogTitle 
            ref={titleRef}
            tabIndex={-1}
            className="text-xl font-semibold flex items-center gap-2 outline-none"
          >
            <AlertCircle className="h-5 w-5 text-warning" />
            Accessibility Issue Detected
          </DialogTitle>
          <DialogDescription id="modal-description">
            Help identify and fix this accessibility issue step by step.
          </DialogDescription>
        </DialogHeader>

        {currentStep === 'identify' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Issue Description:</h3>
              <p className="text-muted-foreground">{issue.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Which WCAG Success Criterion does this violate?</h3>
              <div className="space-y-2">
                {wcagOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="wcag"
                      value={option}
                      checked={selectedWCAG === option}
                      onChange={(e) => setSelectedWCAG(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedWCAG === option 
                        ? 'border-primary bg-primary' 
                        : 'border-gray-300'
                    }`}>
                      {selectedWCAG === option && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span className={selectedWCAG === option ? 'font-medium' : ''}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleWCAGSubmit} 
              disabled={!selectedWCAG}
              className="w-full"
            >
              Next: Choose Fix
            </Button>
          </div>
        )}

        {currentStep === 'fix' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
              {wcagCorrect ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-error" />
              )}
              <span>WCAG Identification: {wcagCorrect ? 'Correct!' : `Incorrect. The right answer was: ${issue.wcag}`}</span>
            </div>

            <div>
              <h3 className="font-semibold mb-3">How should this issue be fixed?</h3>
              <div className="space-y-2">
                {issue.fixOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="fix"
                      value={option}
                      checked={selectedFix === option}
                      onChange={(e) => setSelectedFix(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedFix === option 
                        ? 'border-primary bg-primary' 
                        : 'border-gray-300'
                    }`}>
                      {selectedFix === option && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span className={selectedFix === option ? 'font-medium' : ''}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleFixSubmit} 
              disabled={!selectedFix}
              className="w-full"
            >
              Submit Fix
            </Button>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
              {wcagCorrect ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-error" />
              )}
              <span>WCAG Identification: {wcagCorrect ? 'Correct!' : `Incorrect. The right answer was: ${issue.wcag}`}</span>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
              {fixCorrect ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-error" />
              )}
              <span>Fix Selection: {fixCorrect ? 'Correct!' : `Incorrect. The right answer was: ${issue.correctFix}`}</span>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Code Changes:</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-error mb-1">Before:</p>
                  <code className="text-xs bg-error-light p-2 rounded block">{issue.beforeFix}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-success mb-1">After:</p>
                  <code className="text-xs bg-success-light p-2 rounded block">{issue.afterFix}</code>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleComplete}
              variant={wcagCorrect && fixCorrect ? 'success' : 'default'}
              className="w-full"
            >
              {wcagCorrect && fixCorrect ? 'Great job! Continue' : 'Continue Learning'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};