# Notion Board — GitHub ↔ Notion Workflow Sync

## Project Snapshot
- **Role:** Full Stack Developer  
- **Duration:** ~3 months  
- **Type:** Open-source GitHub Action  
- **Repository:** <https://github.com/Souvikns/Notion-Board>

## Background
Engineering teams were already managing delivery work in GitHub Issues and Pull Requests, while cross-functional stakeholders tracked status in Notion databases. Maintaining both systems manually created duplicate effort, stale status fields, and reduced visibility.

## Problem Statement
How can teams keep GitHub and Notion aligned automatically, without forcing developers to leave their existing workflow?

## Goals
1. Synchronize GitHub Issues and PR metadata to Notion with minimal setup.
2. Reduce repetitive manual updates and status drift.
3. Make the integration flexible enough for different Notion schemas.

## Constraints
- GitHub and Notion APIs have different object models.
- Teams use custom Notion properties and naming conventions.
- The automation must be reliable in CI and simple to adopt.

## Solution
Notion Board was implemented as a GitHub Action that listens to repository events and maps issue/PR fields into Notion database properties. The implementation emphasizes practical defaults while allowing teams to customize field mapping and workflow behavior.

## Implementation Highlights
- Event-driven sync from GitHub workflows.
- Configurable mapping between GitHub fields and Notion properties.
- Support for both Issues and Pull Requests.
- CI-friendly setup through GitHub Actions YAML.

## Outcome
- Removed significant manual overhead for teams using GitHub + Notion together.
- Improved consistency between developer-facing and stakeholder-facing tooling.
- Lowered integration friction by shipping through GitHub Marketplace conventions.

## Key Learnings
- Configuration ergonomics are as important as technical correctness for automation tools.
- Clear mapping documentation is critical when bridging two flexible platforms.
- Reliability in “everyday edge cases” drives trust and long-term adoption.

## Example Usage
```yaml
name: Sync GitHub to Notion
uses: Souvikns/Notion-Board@v1
```
