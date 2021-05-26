const core = require('@actions/core');
const fs = require('fs')


try {

    // Load the SARIF report 
    const rawData = fs.readFileSync(core.getInput('sarif-file'), 'utf8');
    const data = JSON.parse(rawData);
    const engine = data.runs[0].tool.driver.name;

    const sonarIssues = []; 

    // Loop through all of the items 
    for (const result of data.runs[0].results) {

        const location = result.locations[0].physicalLocation;

        // Transform into Sonar's format 
        const issue = {
            engineId: engine, 
            ruleId: result.ruleId, 
            severity: 'MINOR', // BLOCKER, CRITICAL, MAJOR, MINOR, INFO
            type: 'CODE_SMELL', // BUG, VULNERABILITY, CODE_SMELL
            primaryLocation: {
                message: result.message.text, 
                filePath: location.artifactLocation.uri,
                textRange: {
                    startLine: location.region.startLine, 
                    endLine: location.region.endLine, 
                    startColumn: location.region.startColumn, 
                    endColumn: location.region.endColumn
                }
            }
        }

        sonarIssues.push(issue);

    }
    
    // Save the output file 
    const content = JSON.stringify({ issues: sonarIssues});
    fs.writeFileSync(core.getInput('sonar-file'), content);


} catch (error) {
    core.setFailed(error.message);
}