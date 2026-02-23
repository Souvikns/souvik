# Kitsu — AI Pull Request Summaries via GitHub Actions

## Project Snapshot
- **Role:** Lead Developer  
- **Duration:** ~4 months  
- **Type:** Open-source GitHub Action  
- **Repository:** <https://github.com/Souvikns/kitsu>

## Background
Code review velocity often drops when pull requests are large or cross multiple modules. Reviewers spend significant time understanding change context before they can evaluate implementation quality.

## Problem Statement
How can teams automatically generate high-quality PR summaries at pull request open time, while letting each team bring its own LLM provider/API key?

## Goals
1. Trigger automatically when a pull request is opened.
2. Generate a readable summary of the code changes for reviewers.
3. Use a user-provided LLM API key so teams control provider choice and usage.
4. Keep setup simple through standard GitHub Actions workflow configuration.

## Constraints
- PR diffs can vary from very small to very large.
- Teams may use different LLM providers and key management practices.
- Summaries must be useful without exposing sensitive repository information.

## Solution
Kitsu was built as a GitHub Action that executes on PR open events, inspects the changes, and sends relevant diff/context to an LLM using credentials supplied by the repository owner. It then generates a structured summary to help reviewers quickly understand what changed and why.

## Implementation Highlights
- Event-driven execution on pull request open.
- LLM API integration using user-supplied API credentials.
- Automated change summarization to reduce reviewer ramp-up time.
- Workflow-first design that fits into existing CI/review pipelines.

## Outcome
- Reduced time required to understand incoming pull requests.
- Improved review consistency by standardizing summary quality across PRs.
- Enabled teams to adopt AI-assisted review workflows without changing their core development process.

## Key Learnings
- PR summaries are most effective when they emphasize intent, scope, and risk areas.
- “Bring your own API key” improves flexibility and enterprise adoption.
- Tight event scoping (run on PR open) keeps automation predictable and cost-aware.
