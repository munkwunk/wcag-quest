import { XAPIStatement } from '../types/game';

// XAPI configuration - replace with actual endpoint
const XAPI_ENDPOINT = 'https://api.buildcapable.com/xapi/statements';
const DEFAULT_ACTOR = { name: 'Anonymous User' };

export class XAPITracker {
  private actor: { name?: string; mbox?: string };

  constructor(userInfo?: { name?: string; email?: string }) {
    this.actor = {
      name: userInfo?.name || DEFAULT_ACTOR.name,
      mbox: userInfo?.email ? `mailto:${userInfo.email}` : undefined
    };
  }

  private async sendStatement(statement: XAPIStatement): Promise<void> {
    try {
      // Add timestamp and actor if not present
      const fullStatement = {
        ...statement,
        actor: this.actor,
        timestamp: new Date().toISOString()
      };

      // For now, just log to console. In production, send to XAPI endpoint
      console.log('XAPI Statement:', JSON.stringify(fullStatement, null, 2));
      
      // Uncomment for production XAPI endpoint
      /*
      await fetch(XAPI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullStatement)
      });
      */
    } catch (error) {
      console.error('Failed to send xAPI statement:', error);
    }
  }

  async trackIssueIdentified(issueId: string, issueName: string): Promise<void> {
    await this.sendStatement({
      actor: this.actor,
      verb: {
        id: "http://adlnet.gov/expapi/verbs/identified",
        display: { "en-US": "identified" }
      },
      object: {
        id: `http://wcag-game.com/issues/${issueId}`,
        definition: {
          name: { "en-US": issueName },
          description: { "en-US": `User identified accessibility issue: ${issueName}` }
        }
      }
    });
  }

  async trackWCAGSelection(issueId: string, selectedWCAG: string, isCorrect: boolean): Promise<void> {
    await this.sendStatement({
      actor: this.actor,
      verb: {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" }
      },
      object: {
        id: `http://wcag-game.com/wcag-selection/${issueId}`,
        definition: {
          name: { "en-US": "WCAG Criterion Selection" },
          description: { "en-US": `User selected WCAG criterion: ${selectedWCAG}` }
        }
      },
      result: {
        success: isCorrect,
        score: { scaled: isCorrect ? 1.0 : 0.0 }
      }
    });
  }

  async trackFixSubmitted(issueId: string, selectedFix: string, isCorrect: boolean): Promise<void> {
    await this.sendStatement({
      actor: this.actor,
      verb: {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" }
      },
      object: {
        id: `http://wcag-game.com/fix-selection/${issueId}`,
        definition: {
          name: { "en-US": "Remediation Strategy Selection" },
          description: { "en-US": `User selected fix: ${selectedFix}` }
        }
      },
      result: {
        success: isCorrect,
        score: { scaled: isCorrect ? 1.0 : 0.0 }
      }
    });
  }

  async trackLessonCompleted(totalIssues: number, correctAnswers: number): Promise<void> {
    await this.sendStatement({
      actor: this.actor,
      verb: {
        id: "http://adlnet.gov/expapi/verbs/completed",
        display: { "en-US": "completed" }
      },
      object: {
        id: "http://wcag-game.com/lesson/basic-accessibility-testing",
        definition: {
          name: { "en-US": "Basic Accessibility Testing Lesson" },
          description: { "en-US": "Completed WCAG accessibility testing game lesson" }
        }
      },
      result: {
        success: correctAnswers === totalIssues,
        score: { scaled: correctAnswers / totalIssues }
      }
    });
  }
}