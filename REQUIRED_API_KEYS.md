# 🔑 Master API Key Requirements

This document lists every external service required to run **AuditOS** in "Production Mode" with 100% accuracy and autonomy.

## 📋 Quick Checklist

| Service | Category | Criticality | Cost | Variable Name |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI / Gemini** | Intelligence | 🔴 Critical | Paid | `LLM_API_KEY` |
| **Google Places** | Sourcing | 🔴 Critical | Free Tier | `GOOGLE_PLACES_API_KEY` |
| **Serper (Google)** | Research | 🟡 High | Freemium | `SERPER_API_KEY` |
| **LemonSqueezy** | Payments (MoR) | 🔴 Critical | Transaction % | `LEMONSQUEEZY_API_KEY` |
| **SMTP (SendGrid)** | Outreach | 🔴 Critical | Free Tier | `SMTP_PASS` |
| **Hunter / Apollo** | Enrichment | ⚪ Optional | Free Tier | `HUNTER_API_KEY` |

> **💡 Pro Tip (Save Money):** You do **NOT** need expensive LinkedIn scrapers (ProxyCurl). We can use **Serper (Google Search)** to find CEOs for free by searching `site:linkedin.com "CEO" [Company Name]`.

---

## 🛠️ Environment Configuration (`.env`)

Copy this block into your `.env.local` file and fill in the values.

```bash
# ------------------------------------------------------------------
# 1. INTELLIGENCE ENGINE (The Brain)
# Required for: Writing personalized emails & analyzing website content
# Get Key: https://platform.openai.com/api-keys
# ------------------------------------------------------------------
LLM_PROVIDER="openai" # or "gemini"
LLM_API_KEY="sk-..."

# ------------------------------------------------------------------
# 2. LEAD SOURCING (finding businesses)
# Required for: Finding real businesses (e.g. "Dentists in Miami")
# Get Key: https://console.cloud.google.com/apis/credentials
# ------------------------------------------------------------------
GOOGLE_PLACES_API_KEY="AIza..."

# ------------------------------------------------------------------
# 3. SMART RESEARCH (Googling CEOs)
# Required for: Finding "Who is the CEO of X?" via Google Search
# Get Key: https://serper.dev/
# ------------------------------------------------------------------
SERPER_API_KEY="6e4..."

# ------------------------------------------------------------------
# 4. OUTREACH (Sending Emails)
# Required for: Delivering the audit report to the user
# Get Key: https://app.sendgrid.com/settings/api_keys
# ------------------------------------------------------------------
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="SG..."
SMTP_FROM_EMAIL="agent@auditos.com"

# ------------------------------------------------------------------
# 5. PAYMENTS (Global MoR) - LemonSqueezy
# Required for: Accepting Cards & PayPal from ANY country
# Get Key: https://app.lemonsqueezy.com/settings/api
# ------------------------------------------------------------------
LEMONSQUEEZY_API_KEY="eyJ..."
LEMONSQUEEZY_STORE_ID="12345"
LEMONSQUEEZY_WEBHOOK_SECRET="whsec..."

# ------------------------------------------------------------------
# 6. ENRICHMENT (Finding Emails) - Optional but Recommended
# Required for: Verifying email addresses exist
# Get Key: https://hunter.io/api_keys
# ------------------------------------------------------------------
HUNTER_API_KEY="8d9..."
```

## 📝 Detailed Explanations

### 1. Intelligence (OpenAI / Gemini)
- **Why**: The system needs a brain to read a prospect's website and say *"I noticed you sell X"* instead of a generic template.
- **Risk if missing**: Emails will look like spam templates.

### 2. Google Places API
- **Why**: We need accurate business names, websites, and address data.
- **Risk if missing**: We are stuck generating fake names like "TechCorp Inc".

### 3. Serper (Google Search API)
- **Why**: Sometimes Google Places doesn't list the CEO. Serper lets the agent "Google it" automatically.
- **Risk if missing**: Lower success rate in finding decision makers.

### 4. Stripe
- **Why**: To actually confirm a purchase.
- **Risk if missing**: You cannot make money.
