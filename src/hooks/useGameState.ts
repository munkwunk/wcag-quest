import { useState, useCallback } from 'react';
import { GameState, AccessibilityIssue } from '@/types/game';
import { accessibilityIssues } from '@/data/issues';
import { XAPITracker } from '@/utils/xapi';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentIssues: accessibilityIssues,
    foundIssues: [],
    completedIssues: [],
    score: 0,
    isComplete: false,
    currentModal: null
  });

  const [xapiTracker] = useState(() => new XAPITracker());

  const openModal = useCallback((issue: AccessibilityIssue) => {
    setGameState(prev => ({
      ...prev,
      currentModal: issue,
      foundIssues: prev.foundIssues.includes(issue.id) 
        ? prev.foundIssues 
        : [...prev.foundIssues, issue.id]
    }));
    
    // Track issue identification
    xapiTracker.trackIssueIdentified(issue.id, issue.failure);
  }, [xapiTracker]);

  const closeModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentModal: null
    }));
  }, []);

  const completeIssue = useCallback((isCorrect: boolean) => {
    if (!gameState.currentModal) return;

    const issueId = gameState.currentModal.id;
    const newCompletedIssues = [...gameState.completedIssues, issueId];
    const correctAnswers = newCompletedIssues.length; // Simplified scoring
    const newScore = Math.round((correctAnswers / accessibilityIssues.length) * 100);
    const isGameComplete = newCompletedIssues.length === accessibilityIssues.length;

    setGameState(prev => ({
      ...prev,
      completedIssues: newCompletedIssues,
      score: newScore,
      isComplete: isGameComplete,
      currentModal: null
    }));

    // Track lesson completion if game is complete
    if (isGameComplete) {
      xapiTracker.trackLessonCompleted(accessibilityIssues.length, correctAnswers);
    }
  }, [gameState.currentModal, gameState.completedIssues, xapiTracker]);

  const trackWCAGSelection = useCallback((selected: string, isCorrect: boolean) => {
    if (!gameState.currentModal) return;
    xapiTracker.trackWCAGSelection(gameState.currentModal.id, selected, isCorrect);
  }, [gameState.currentModal, xapiTracker]);

  const trackFixSelection = useCallback((selected: string, isCorrect: boolean) => {
    if (!gameState.currentModal) return;
    xapiTracker.trackFixSubmitted(gameState.currentModal.id, selected, isCorrect);
  }, [gameState.currentModal, xapiTracker]);

  const resetGame = useCallback(() => {
    setGameState({
      currentIssues: accessibilityIssues,
      foundIssues: [],
      completedIssues: [],
      score: 0,
      isComplete: false,
      currentModal: null
    });
  }, []);

  return {
    gameState,
    openModal,
    closeModal,
    completeIssue,
    trackWCAGSelection,
    trackFixSelection,
    resetGame
  };
};