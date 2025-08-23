export interface AccessibilityIssue {
  id: string;
  element: string;
  failure: string;
  wcag: string;
  level: 'A' | 'AA' | 'AAA';
  fixOptions: string[];
  correctFix: string;
  description: string;
  beforeFix: string;
  afterFix: string;
}

export interface GameState {
  currentIssues: AccessibilityIssue[];
  foundIssues: string[];
  completedIssues: string[];
  score: number;
  isComplete: boolean;
  currentModal: AccessibilityIssue | null;
}

export interface XAPIStatement {
  actor: {
    name?: string;
    mbox?: string;
  };
  verb: {
    id: string;
    display: {
      "en-US": string;
    };
  };
  object: {
    id: string;
    definition: {
      name: {
        "en-US": string;
      };
      description?: {
        "en-US": string;
      };
    };
  };
  result?: {
    success?: boolean;
    score?: {
      scaled: number;
    };
  };
  timestamp?: string;
}