
export interface XAPICourseManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  launch: string;
  activities: XAPIActivity[];
}

export interface XAPIActivity {
  id: string;
  name: string;
  description: string;
  type: string;
  moreInfo?: string;
}

export class XAPICourseExporter {
  private courseId = "http://wcag-quest.com/course/basic-accessibility-testing";
  private version = "1.0.0";

  generateManifest(): XAPICourseManifest {
    return {
      id: this.courseId,
      name: "WCAG Quest - Basic Accessibility Testing",
      description: "Interactive accessibility testing course using real-world scenarios to teach WCAG 2.2 compliance through hands-on practice.",
      version: this.version,
      launch: "index.html",
      activities: [
        {
          id: `${this.courseId}/activities/issue-identification`,
          name: "Issue Identification",
          description: "Learn to identify accessibility issues in web interfaces",
          type: "http://adlnet.gov/expapi/activities/lesson"
        },
        {
          id: `${this.courseId}/activities/wcag-mapping`,
          name: "WCAG Criterion Mapping",
          description: "Map identified issues to correct WCAG 2.2 success criteria",
          type: "http://adlnet.gov/expapi/activities/assessment"
        },
        {
          id: `${this.courseId}/activities/remediation-strategies`,
          name: "Remediation Strategies",
          description: "Select appropriate fixes for accessibility issues",
          type: "http://adlnet.gov/expapi/activities/assessment"
        }
      ]
    };
  }

  generateTinCanXML(): string {
    const manifest = this.generateManifest();
    return `<?xml version="1.0" encoding="UTF-8"?>
<tincan xmlns="http://projecttincan.com/tincan.xsd">
    <activities>
        <activity id="${manifest.id}" type="http://adlnet.gov/expapi/activities/course">
            <name>
                <langstring lang="en-US">${manifest.name}</langstring>
            </name>
            <description>
                <langstring lang="en-US">${manifest.description}</langstring>
            </description>
            <launch lang="en-US">${manifest.launch}</launch>
        </activity>
        ${manifest.activities.map(activity => `
        <activity id="${activity.id}" type="${activity.type}">
            <name>
                <langstring lang="en-US">${activity.name}</langstring>
            </name>
            <description>
                <langstring lang="en-US">${activity.description}</langstring>
            </description>
        </activity>`).join('')}
    </activities>
</tincan>`;
  }

  async exportCourse(): Promise<Blob> {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    // Add tincan.xml manifest
    zip.file("tincan.xml", this.generateTinCanXML());

    // Add course metadata
    zip.file("course.json", JSON.stringify(this.generateManifest(), null, 2));

    // Add self-contained launch file
    const launchHTML = this.generateSelfContainedHTML();
    zip.file("index.html", launchHTML);

    // Add xAPI wrapper
    const xapiWrapper = this.generateXAPIWrapper();
    zip.file("xapi-wrapper.js", xapiWrapper);

    // Add React bundle and dependencies
    await this.addReactBundle(zip);

    return zip.generateAsync({ type: "blob" });
  }

  private generateSelfContainedHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WCAG Quest - Accessibility Testing Course</title>
    <script src="xapi-wrapper.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="root"></div>
    <script src="react-bundle.js"></script>
    
    <script>
        // Initialize xAPI when the React app loads
        window.initializeXAPI = function() {
            if (typeof ADL !== 'undefined' && ADL.XAPIWrapper) {
                const actor = {
                    "name": "Learner",
                    "mbox": "mailto:learner@example.com"
                };
                
                const statement = {
                    "actor": actor,
                    "verb": {
                        "id": "http://adlnet.gov/expapi/verbs/launched",
                        "display": {"en-US": "launched"}
                    },
                    "object": {
                        "id": "${this.courseId}",
                        "definition": {
                            "name": {"en-US": "WCAG Quest - Basic Accessibility Testing"},
                            "description": {"en-US": "Interactive accessibility testing course"}
                        }
                    }
                };
                
                ADL.XAPIWrapper.sendStatement(statement);
            }
        };

        // Initialize when page loads
        window.addEventListener('load', window.initializeXAPI);
    </script>
</body>
</html>`;
  }

  private async addReactBundle(zip: any): Promise<void> {
    // Add CSS styles
    const styles = this.generateBundledCSS();
    zip.file("styles.css", styles);

    // Add React bundle (simplified version with core components)
    const reactBundle = this.generateReactBundle();
    zip.file("react-bundle.js", reactBundle);
  }

  private generateBundledCSS(): string {
    return `
/* Tailwind CSS Reset and Base Styles */
*,::before,::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

body {
  margin: 0;
  line-height: inherit;
  background-color: #f8fafc;
  color: #1e293b;
}

/* Component Styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  text-sm;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
}

.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.text-center { text-align: center; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }

/* Game-specific styles */
.test-interface {
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 2rem 0;
}

.issue-highlight {
  background-color: #fef3c7;
  border: 2px dashed #f59e0b;
  padding: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: 0.25rem;
}

.issue-highlight:hover {
  background-color: #fde68a;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #e2e8f0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #10b981;
  transition: width 0.3s ease;
}

.success { color: #059669; }
.error { color: #dc2626; }
.warning { color: #d97706; }
`;
  }

  private generateReactBundle(): string {
    return `
// Embedded React App Bundle for WCAG Quest
(function() {
  'use strict';

  // Mock React and ReactDOM for standalone operation
  window.React = {
    createElement: function(type, props, ...children) {
      const element = document.createElement(type);
      if (props) {
        Object.keys(props).forEach(key => {
          if (key === 'className') {
            element.className = props[key];
          } else if (key.startsWith('on')) {
            const event = key.substring(2).toLowerCase();
            element.addEventListener(event, props[key]);
          } else {
            element.setAttribute(key, props[key]);
          }
        });
      }
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child) {
          element.appendChild(child);
        }
      });
      return element;
    },
    useState: function(initial) {
      let value = initial;
      const setValue = (newValue) => {
        value = newValue;
        renderApp();
      };
      return [() => value, setValue];
    }
  };

  // Sample accessibility issues data
  const accessibilityIssues = [
    {
      id: 'missing-alt-text',
      element: 'Image without alt text',
      failure: 'Decorative image missing alt="" attribute',
      wcag: '1.1.1 Non-text Content',
      level: 'A',
      fixOptions: [
        'Add alt="" for decorative images',
        'Add descriptive alt text',
        'Remove the image',
        'Use CSS background-image instead'
      ],
      correctFix: 'Add alt="" for decorative images',
      description: 'This decorative image is missing an alt attribute, making it inaccessible to screen readers.',
      beforeFix: '<img src="decoration.jpg">',
      afterFix: '<img src="decoration.jpg" alt="">'
    },
    {
      id: 'insufficient-contrast',
      element: 'Low contrast text',
      failure: 'Text contrast ratio below 4.5:1',
      wcag: '1.4.3 Contrast (Minimum)',
      level: 'AA',
      fixOptions: [
        'Darken the text color',
        'Lighten the background color',
        'Increase font weight',
        'Use a different font family'
      ],
      correctFix: 'Darken the text color',
      description: 'This text has insufficient color contrast against its background.',
      beforeFix: 'color: #999999; background: #ffffff;',
      afterFix: 'color: #333333; background: #ffffff;'
    },
    {
      id: 'missing-form-label',
      element: 'Unlabeled form input',
      failure: 'Form input without associated label',
      wcag: '1.3.1 Info and Relationships',
      level: 'A',
      fixOptions: [
        'Add a <label> element',
        'Use aria-label attribute',
        'Use aria-labelledby attribute',
        'Add placeholder text only'
      ],
      correctFix: 'Add a <label> element',
      description: 'This form input lacks a proper label, making it unclear what information is expected.',
      beforeFix: '<input type="email" name="email">',
      afterFix: '<label for="email">Email Address</label>\\n<input type="email" id="email" name="email">'
    }
  ];

  // Game state
  let gameState = {
    currentIssues: accessibilityIssues,
    foundIssues: [],
    completedIssues: [],
    score: 0,
    isComplete: false,
    currentModal: null
  };

  // xAPI Integration
  function trackIssueIdentified(issueId, issueName) {
    if (window.ADL && window.ADL.XAPIWrapper) {
      const statement = {
        actor: { name: "Learner", mbox: "mailto:learner@example.com" },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/identified",
          display: { "en-US": "identified" }
        },
        object: {
          id: \`http://wcag-game.com/issues/\${issueId}\`,
          definition: {
            name: { "en-US": issueName },
            description: { "en-US": \`User identified accessibility issue: \${issueName}\` }
          }
        }
      };
      window.ADL.XAPIWrapper.sendStatement(statement);
    }
  }

  function trackWCAGSelection(issueId, selectedWCAG, isCorrect) {
    if (window.ADL && window.ADL.XAPIWrapper) {
      const statement = {
        actor: { name: "Learner", mbox: "mailto:learner@example.com" },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/answered",
          display: { "en-US": "answered" }
        },
        object: {
          id: \`http://wcag-game.com/wcag-selection/\${issueId}\`,
          definition: {
            name: { "en-US": "WCAG Criterion Selection" },
            description: { "en-US": \`User selected WCAG criterion: \${selectedWCAG}\` }
          }
        },
        result: {
          success: isCorrect,
          score: { scaled: isCorrect ? 1.0 : 0.0 }
        }
      };
      window.ADL.XAPIWrapper.sendStatement(statement);
    }
  }

  function trackLessonCompleted(totalIssues, correctAnswers) {
    if (window.ADL && window.ADL.XAPIWrapper) {
      const statement = {
        actor: { name: "Learner", mbox: "mailto:learner@example.com" },
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
      };
      window.ADL.XAPIWrapper.sendStatement(statement);
    }
  }

  // App Components
  function createProgressTracker() {
    const progress = (gameState.completedIssues.length / gameState.currentIssues.length) * 100;
    
    const container = React.createElement('div', { className: 'mb-6' },
      React.createElement('div', { className: 'text-center mb-4' },
        React.createElement('h2', { className: 'text-xl font-semibold' }, 
          'Progress: ', gameState.completedIssues.length, ' of ', gameState.currentIssues.length, ' issues completed'
        ),
        React.createElement('p', { className: 'text-lg' }, 'Score: ', gameState.score)
      ),
      React.createElement('div', { className: 'progress-bar' },
        React.createElement('div', { 
          className: 'progress-fill',
          style: \`width: \${progress}%\`
        })
      )
    );
    
    return container;
  }

  function createTestInterface() {
    const handleIssueClick = (issue) => {
      if (!gameState.foundIssues.includes(issue.id)) {
        gameState.foundIssues.push(issue.id);
        gameState.currentModal = issue;
        trackIssueIdentified(issue.id, issue.element);
        renderApp();
      }
    };

    const testArea = React.createElement('div', { className: 'test-interface' },
      React.createElement('h3', { className: 'text-lg font-semibold mb-4' }, 
        'Test Interface - Find the Accessibility Issues'
      ),
      React.createElement('p', { className: 'mb-4' }, 
        'Click on elements that have accessibility issues:'
      ),
      ...gameState.currentIssues.map(issue => {
        const isFound = gameState.foundIssues.includes(issue.id);
        const isCompleted = gameState.completedIssues.includes(issue.id);
        
        return React.createElement('div', {
          key: issue.id,
          className: \`issue-highlight \${isCompleted ? 'success' : isFound ? 'warning' : ''}\`,
          onclick: () => handleIssueClick(issue)
        }, 
          React.createElement('strong', {}, issue.element),
          React.createElement('span', {}, ' - ' + issue.failure),
          isCompleted && React.createElement('span', { className: 'success' }, ' ✓ Fixed')
        );
      })
    );

    return testArea;
  }

  function createModal() {
    if (!gameState.currentModal) return null;

    const issue = gameState.currentModal;
    
    const handleWCAGSelect = (selectedWCAG) => {
      const isCorrect = selectedWCAG === issue.wcag;
      trackWCAGSelection(issue.id, selectedWCAG, isCorrect);
      
      if (isCorrect) {
        gameState.score += 10;
        // Show fix options
        showFixOptions();
      } else {
        alert('Incorrect WCAG criterion. Try again!');
      }
    };

    const showFixOptions = () => {
      // This would normally show fix selection UI
      // For simplicity, auto-complete the issue
      gameState.completedIssues.push(issue.id);
      gameState.score += 10;
      gameState.currentModal = null;
      
      if (gameState.completedIssues.length === gameState.currentIssues.length) {
        gameState.isComplete = true;
        trackLessonCompleted(gameState.currentIssues.length, gameState.completedIssues.length);
      }
      
      renderApp();
    };

    const wcagOptions = [
      '1.1.1 Non-text Content',
      '1.3.1 Info and Relationships', 
      '1.4.3 Contrast (Minimum)',
      '2.4.6 Headings and Labels'
    ];

    const modal = React.createElement('div', { className: 'modal' },
      React.createElement('div', { className: 'modal-content' },
        React.createElement('h3', { className: 'text-xl font-bold mb-4' }, issue.element),
        React.createElement('p', { className: 'mb-4' }, issue.description),
        React.createElement('h4', { className: 'font-semibold mb-2' }, 'Select the correct WCAG criterion:'),
        ...wcagOptions.map(wcag => 
          React.createElement('button', {
            key: wcag,
            className: 'btn btn-secondary mb-2 block w-full',
            onclick: () => handleWCAGSelect(wcag)
          }, wcag)
        ),
        React.createElement('button', {
          className: 'btn btn-secondary mt-4',
          onclick: () => {
            gameState.currentModal = null;
            renderApp();
          }
        }, 'Close')
      )
    );

    return modal;
  }

  function createCompletionScreen() {
    return React.createElement('div', { className: 'text-center py-16' },
      React.createElement('h2', { className: 'text-3xl font-bold mb-6' }, 
        'Congratulations! 🎉'
      ),
      React.createElement('p', { className: 'text-xl mb-4' }, 
        'You completed the WCAG Quest!'
      ),
      React.createElement('p', { className: 'text-lg mb-6' }, 
        'Final Score: ', gameState.score, ' points'
      ),
      React.createElement('button', {
        className: 'btn btn-primary',
        onclick: () => {
          // Reset game
          gameState = {
            currentIssues: accessibilityIssues,
            foundIssues: [],
            completedIssues: [],
            score: 0,
            isComplete: false,
            currentModal: null
          };
          renderApp();
        }
      }, 'Play Again')
    );
  }

  function createApp() {
    const container = React.createElement('div', { className: 'container py-8' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-3xl font-bold mb-4' }, 
          'WCAG Quest - Accessibility Testing Course'
        ),
        React.createElement('p', { className: 'text-lg' }, 
          'Learn to identify and fix accessibility issues in web interfaces'
        )
      ),
      
      gameState.isComplete ? 
        createCompletionScreen() :
        React.createElement('div', {},
          createProgressTracker(),
          createTestInterface()
        ),
      
      createModal()
    );

    return container;
  }

  function renderApp() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(createApp());
  }

  // Initialize app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }

  // Initialize xAPI when available
  if (window.initializeXAPI) {
    window.initializeXAPI();
  }

})();
`;
  }

  private generateXAPIWrapper(): string {
    return `// xAPI Wrapper for WCAG Quest
var ADL = ADL || {};
ADL.XAPIWrapper = (function() {
    var instance = {};
    
    instance.sendStatement = function(stmt) {
        // This will be handled by the LRS platform
        console.log('xAPI Statement:', stmt);
        
        // If in development, log to console
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Development mode - statement logged to console');
            return;
        }
        
        // Production xAPI sending will be handled by LRS platform
        return true;
    };
    
    return instance;
})();`;
  }
}
