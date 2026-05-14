# BioSdk

A React web application demonstrating client-side SDK integration with a simulated server-side scoring API.

## Overview

This app integrates a behavioral analytics SDK and simulates API flows for user authentication and payment scoring.

### Pages

| Page                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| **Home**             | Landing page with session info                    |
| **Login**            | User enters name/email → triggers `init` API call |
| **Account Overview** | Session details + activity log viewer             |
| **Payment**          | Triggers `getScore` API call (only after init)    |

---

## Features Demonstrated

### ✅ SDK Loaded

The SDK is loaded globally in `index.html`:

```html
<script src="https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js"></script>
```

You can verify in DevTools → Network tab that the script loads on every page.

### ✅ CSID Usage

- A unique **Customer Session ID (CSID)** is generated on login using `crypto.randomUUID()`
- Set via `cdApi.setCustomerSessionId(csid)`
- Remains consistent throughout the session
- Regenerated on logout → login (new session cycle)
- Visible in the Account Overview and Payment pages

### ✅ Context Change

Each page calls `cdApi.changeContext()` on mount:

| Page             | Context            |
| ---------------- | ------------------ |
| Home             | `home_screen`      |
| Login            | `login_screen`     |
| Account Overview | `account_overview` |
| Payment          | `payment_screen`   |

Verify in DevTools → Console: `[SDK] changeContext: <context_name>`

### ✅ API Request & Response

**Init (triggered on Login):**

```json
// Request
{
  "customerId": "dummy",
  "action": "init",
  "activityType": "login",
  "uuid": "<random-uuid>",
  "brand": "SD",
  "solution": "ATO",
  "iam": "<user-input>"
}

// Response (HTTP 200)
{
  "attempt": "<uuid>",
  "id": "<uuid>",
  "request_id": "<uuid>",
  "status": "success"
}
```

**GetScore (triggered on Payment):**

```json
// Request
{
  "customerId": "dummy",
  "action": "getScore",
  "activityType": "payment",
  "uuid": "<random-uuid>",
  "brand": "SD",
  "solution": "ATO",
  "iam": "<user-input>"
}

// Response (HTTP 200)
{
  "attempt": "<uuid>",
  "id": "<uuid>",
  "request_id": "<uuid>",
  "status": "success"
}
```

- `getScore` is **blocked** if `init` has not been called first
- Responses are visible in the UI and in DevTools → Console

---

## How to Verify (DevTools)

1. Open the app → press **F12** to open DevTools
2. **Console tab**: See SDK calls (`setCustomerSessionId`, `changeContext`) and API logs
3. **Network tab**: Confirm the SDK script is loaded from `bcdn-4ff4f23f.we-stats.com`
4. **Application tab → Session Storage**: See `csid`, `iam`, `initCompleted`, `activities`

---

## Project Structure

```
src/
├── config/constants.js      # Centralized configuration
├── context/                 # React context (session state)
├── hooks/useSession.js      # Custom session hook
├── components/Navbar.jsx    # Navigation bar
├── pages/                   # Home, Login, AccountOverview, Payment
├── router/routes.jsx        # Route definitions
├── services/api.js          # Mock API service
└── utils/sdk.js             # SDK wrapper utilities
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Flow

```
Login (enter name) → init triggered → navigate to Account
Account → view session info → Go to Payment
Payment → Make Payment → getScore triggered
Logout → session cleared → new CSID on next login
```
