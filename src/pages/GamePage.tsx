import React from 'react';
import { AccessibilityTestPage } from '@/components/AccessibilityTestPage';
import { ProgressTracker } from '@/components/ProgressTracker';
import { GameModal } from '@/components/GameModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameState } from '@/hooks/useGameState';
import { ArrowLeft, Trophy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const GamePage: React.FC = () => {
  const {
    gameState,
    openModal,
    closeModal,
    completeIssue,
    trackWCAGSelection,
    trackFixSelection,
    resetGame
  } = useGameState();

  if (gameState.isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <Trophy className="h-16 w-16 text-warning mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                You've successfully completed the WCAG accessibility testing challenge!
              </p>
              
              <div className="bg-accent rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{gameState.completedIssues.length}</div>
                    <div className="text-sm text-muted-foreground">Issues Fixed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">{gameState.score}%</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-semibold mb-2">What you learned:</h2>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• How to identify common accessibility failures</li>
                  <li>• WCAG Success Criteria and their applications</li>
                  <li>• Practical remediation strategies</li>
                  <li>• Screen reader navigation techniques</li>
                </ul>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={resetGame} variant="hero" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Game Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-semibold">WCAG Testing Challenge</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Use your screen reader to navigate and click on accessibility issues
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProgressTracker
                totalIssues={gameState.currentIssues.length}
                foundIssues={gameState.foundIssues.length}
                completedIssues={gameState.completedIssues.length}
                score={gameState.score}
              />
            </div>
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3">
            <AccessibilityTestPage
              issues={gameState.currentIssues}
              completedIssues={gameState.completedIssues}
              onIssueClick={openModal}
            />
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {gameState.currentModal && (
        <GameModal
          issue={gameState.currentModal}
          isOpen={!!gameState.currentModal}
          onClose={closeModal}
          onComplete={completeIssue}
          onTrackWCAG={trackWCAGSelection}
          onTrackFix={trackFixSelection}
        />
      )}
    </div>
  );
};

export default GamePage;