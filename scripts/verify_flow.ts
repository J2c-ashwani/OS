import 'dotenv/config';
import { createOrUpdateBusinessTarget, getDashboardStats } from '../lib/services/businessService';
import { runDiagnosticsEngine } from '../lib/services/diagnosticsService';

async function verifyFlow() {
    const testDomain = `test-biz-${Date.now()}.com`;
    const testEmail = `contact@${testDomain}`;

    console.log('--- STARTING E2E VERIFICATION (SERVICE LAYER) ---');

    // 2. LEAD CAPTURE
    console.log(`\n[1] Submitting Lead via Service: ${testDomain}`);
    try {
        const business = await createOrUpdateBusinessTarget({
            email: testEmail,
            websiteUrl: `https://${testDomain}`
        });
        console.log('Lead Saved. ID:', business.id);
    } catch (e) {
        console.error(e);
        throw new Error('Lead Capture Service Failed');
    }

    // 3. DASHBOARD STATS
    console.log('\n[2] Checking Dashboard Stats Service...');
    const stats1 = await getDashboardStats();
    const foundBiz = stats1.businesses.find((b: any) => b.name === testDomain);
    console.log('Business Found in Stats:', !!foundBiz);

    if (!foundBiz) throw new Error('Dashboard Stats did not return new business');

    // 4. RUN DIAGNOSTICS
    console.log('\n[3] Running Diagnostics Service...');
    const diagResult = await runDiagnosticsEngine();
    console.log('Diagnostics Result:', diagResult);

    // 5. CHECK MONITORING/LOGS
    console.log('\n[4] Verifying Logs via Dashboard Service...');
    const stats2 = await getDashboardStats();
    const logs = stats2.logs.filter((l: any) => l.businessId === foundBiz.id);
    console.log(`Found ${logs.length} logs for ${testDomain}`);

    if (logs.length === 0) {
        console.warn('WARNING: No logs found. Did the mock probe run?');
    } else {
        console.log('Log Sample:', logs[0]);
    }

    console.log('\n--- VERIFICATION COMPLETE ---');
}

verifyFlow()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
