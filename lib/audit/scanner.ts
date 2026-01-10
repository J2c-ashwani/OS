import { promises as dns } from 'dns';

export interface AuditResult {
    domain: string;
    isOnline: boolean;
    hasMxRecords: boolean;
    hasContactPage: boolean;
    hasForms: boolean;
    serverLocation?: string;
    responseResult: 'CLEAN' | 'ISSUE' | 'POTENTIAL_RISK'; // For the landing page high-level result
    details: string[];
}

/**
 * Performs a real-time audit of the provided domain.
 */
export async function performSiteAudit(domainInput: string): Promise<AuditResult> {
    const details: string[] = [];

    // 1. Sanitize Domain
    let domain = domainInput.replace(/^(https?:\/\/)/, '').replace(/\/$/, '');
    // Handle "www." stripping if desired, or keep as is. Let's generally strip for DNS checks but keep for HTTP.

    const url = `https://${domain}`;

    let isOnline = false;
    let hasMxRecords = false;
    let hasContactPage = false;
    let hasForms = false;

    // 2. DNS / MX Check
    try {
        const mxRecords = await dns.resolveMx(domain);
        if (mxRecords && mxRecords.length > 0) {
            hasMxRecords = true;
            details.push(`Email Server Detected (${mxRecords[0].exchange})`);
        } else {
            details.push('No Email Server Records (MX) found');
        }
    } catch (error) {
        details.push('Could not verify email records (DNS Error)');
    }

    // 3. HTTP Availability Check
    try {
        const start = Date.now();
        const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'ResponseAudit/1.0' } });
        const duration = Date.now() - start;

        if (res.ok) {
            isOnline = true;
            details.push(`Website is Online (Status: ${res.status}) - ${duration}ms`);

            // 4. Content Scan (Forms)
            const html = await res.text();
            if (html.includes('<form') || html.includes('type="submit"')) {
                hasForms = true;
                details.push('Contact forms detected on homepage');
            } else {
                details.push('No obvious forms detected on homepage');
            }

        } else {
            details.push(`Website returned error status: ${res.status}`);
        }
    } catch (error) {
        details.push('Website unreachable (Connection Failed)');
    }

    // 5. Contact Page Check
    // Often at /contact or /contact-us
    if (isOnline) {
        try {
            const contactUrl = `https://${domain}/contact`;
            const res = await fetch(contactUrl, { method: 'HEAD', headers: { 'User-Agent': 'ResponseAudit/1.0' } });
            if (res.ok || res.status === 405) { // 405 often means exists but method not allowed
                hasContactPage = true;
                details.push('Dedicated /contact page found');
            }
        } catch (e) {
            // Ignore
        }
    }

    // 6. Synthesis (STRICT ACCURACY MODE)
    // Logic:
    // - ISSUE: Site Down OR No MX Records (Confirmed broken).
    // - POTENTIAL_RISK: Online + Forms + No Monitoring (We suspect they might be slow, but it's not "broken" yet).
    // - CLEAN: Online + No obvious gaps (or we can't tell).

    let responseResult: 'CLEAN' | 'ISSUE' | 'POTENTIAL_RISK' = 'CLEAN';

    if (!isOnline) {
        responseResult = 'ISSUE'; // Site is definitely down.
        details.push('CRITICAL: Website is unreachable.');
    } else if (!hasMxRecords) {
        responseResult = 'ISSUE'; // Business cannot receive email.
        details.push('CRITICAL: No email servers (MX Records) configured.');
    } else if (hasForms || hasContactPage) {
        // Site works, but we don't know if they reply fast.
        // We label this specifically as "Unverified Risk" not an "Error".
        responseResult = 'POTENTIAL_RISK';
        details.push('OBSERVATION: Lead channels exist but response time is unmonitored.');
    } else {
        responseResult = 'CLEAN';
        details.push('System appears functional. No visible lead capture forms to audit.');
    }

    return {
        domain,
        isOnline,
        hasMxRecords,
        hasContactPage,
        hasForms,
        responseResult,
        details
    };
}
