const fetch = require('node-fetch');

module.exports = async function (context, req) {
    // Replace these with your GitHub username/repo
    const githubUsername = 'digerate';
    const githubRepo = 'my-static-web-app';

    const githubToken = process.env.GITHUB_TOKEN; // Ensure this is set in your Function App settings
    const workflowDispatchUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/dispatches`;

    try {
        const response = await fetch(workflowDispatchUrl, {
            method: 'POST',
            body: JSON.stringify({
                event_type: 'deploy-trigger'
            }),
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.everest-preview+json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            context.res = { body: "Deployment triggered successfully." };
        } else {
            const errorResponse = await response.text();
            context.log.error(`Failed to trigger deployment. GitHub API responded with status ${response.status}: ${errorResponse}`);
            context.res = { status: 500, body: "Failed to trigger deployment." };
        }
    } catch (error) {
        context.log.error(`An error occurred while triggering the deployment: ${error.message}`);
        context.res = { status: 500, body: "An error occurred while triggering the deployment." };
    }
};
