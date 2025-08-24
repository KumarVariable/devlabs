## Privacy Policy — Code Review Agent (POC)

Effective date: 2025-08-24
Controller: Kunal Devlab's
Contact: nkunal@aol.com

### Overview

Code Review Agent (the “App”) is a proof-of-concept Forge app for Bitbucket Cloud. It connects a Bitbucket workspace to a lightweight backend to demonstrate an OAuth-based integration.

### Data We Process

- Authentication data: Bitbucket OAuth access/refresh tokens and granted scopes.

- Identifiers: Bitbucket workspace ID and installation ID.

- Operational logs: Minimal technical logs (timestamps, HTTP status codes, error messages).

- No repository contents are persisted in this POC.

### Purpose & Legal Basis

- Purpose: Authenticate the App and check connection status; (future) enable code-review automations.

- Legal basis: Your consent when you authorize the App and our legitimate interests in operating the POC.

### Storage & Retention

- Tokens are kept in memory on our backend and may be cleared on restart; no database in this POC.

- Logs are short-lived and used only for troubleshooting.

- You can revoke access any time from Bitbucket → Workspace settings → OAuth.

### Sharing & Sub-processors

The App calls Atlassian/Bitbucket APIs.

During the POC we use ngrok as a reverse proxy. No other sub-processors.

### Security

TLS for data in transit; least-privilege scopes.

Secrets will move to environment variables and a stable host before any non-POC release.

### International Transfers

Traffic may transit globally depending on hosting and ngrok points of presence.

### Your Rights

Request access, correction, or deletion by emailing nkunal@aol.com

### Children

Not intended for children under 16.

### Changes

We may update this policy; updates apply upon posting.

We may update this policy; updates apply upon posting.
