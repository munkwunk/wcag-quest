
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

    // Add launch file with xAPI initialization
    const launchHTML = this.generateLaunchHTML();
    zip.file("index.html", launchHTML);

    // Add xAPI wrapper
    const xapiWrapper = this.generateXAPIWrapper();
    zip.file("xapi-wrapper.js", xapiWrapper);

    return zip.generateAsync({ type: "blob" });
  }

  private generateLaunchHTML(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WCAG Quest - Accessibility Testing Course</title>
    <script src="xapi-wrapper.js"></script>
</head>
<body>
    <div id="course-container">
        <h1>WCAG Quest - Basic Accessibility Testing</h1>
        <p>This course teaches accessibility testing through interactive scenarios.</p>
        <button id="launch-course" onclick="launchCourse()">Start Learning</button>
    </div>

    <script>
        // Initialize xAPI
        function initializeXAPI() {
            if (typeof ADL !== 'undefined' && ADL.XAPIWrapper) {
                // LRS connection will be configured by the hosting platform
                const actor = {
                    "name": "Learner",
                    "mbox": "mailto:learner@example.com"
                };
                
                // Send course launched statement
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
        }

        function launchCourse() {
            // Redirect to your actual course URL
            window.location.href = "${window.location.origin}/game";
        }

        // Initialize when page loads
        window.addEventListener('load', initializeXAPI);
    </script>
</body>
</html>`;
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
