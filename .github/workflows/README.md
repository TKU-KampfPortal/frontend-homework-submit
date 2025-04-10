# GitHub Actions Workflow for Homework Submissions

This directory contains the GitHub Actions workflows configured for the frontend training homework submission repository.

## Deploy Website Workflow

The `deploy-website.yml` workflow automatically deploys all the homework submissions to GitHub Pages whenever changes are pushed to the main branch or when a pull request targets the main branch.

### How It Works

1. **Trigger**: The workflow runs on:

   - Pushes to the main branch
   - Pull requests targeting the main branch
   - Manual trigger (workflow_dispatch)

2. **Build Process**:

   - Checks out the repository code
   - Sets up Node.js environment
   - Creates a `dist` directory for the built website
   - Finds all HTML files following the pattern `/[level]/[week-...]/[name]/index.html`
   - Copies these files to the `dist` directory while preserving their directory structure
   - Copies any associated assets that might be required by the HTML files
   - Generates an index page with links to all submissions, organized by level and week

3. **Deployment**:
   - Deploys the contents of the `dist` directory to the `gh-pages` branch
   - GitHub Pages serves the site from this branch

### Accessing the Deployed Website

Once deployed, the website will be available at:
`https://tku-kampfportal.github.io/frontend-homework-submit/`

The main index page provides links to all student submissions, organized by level and week.
Each student's work is accessible at:
`https://tku-kampfportal.github.io/frontend-homework-submit/{level}/week-{x}/{name}/index.html`
