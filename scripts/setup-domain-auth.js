const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

function setupDomainAuthentication() {
  console.log('🔐 Domain Authentication Setup Guide');
  console.log('=====================================');
  
  const currentFromEmail = process.env.SENDGRID_FROM_EMAIL;
  
  if (!currentFromEmail) {
    console.log('❌ SENDGRID_FROM_EMAIL not found in .env.local');
    return;
  }
  
  console.log(`📧 Current From Email: ${currentFromEmail}`);
  
  // Extract domain from email
  const domain = currentFromEmail.split('@')[1];
  console.log(`🌐 Domain: ${domain}`);
  
  if (domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'hotmail.com' || domain === 'outlook.com') {
    console.log('\n⚠️  WARNING: Using public email provider!');
    console.log('📧 Public providers (Gmail, Yahoo, etc.) have poor deliverability for transactional emails.');
    console.log('🎯 Recommendation: Use your own domain for better deliverability.');
    
    console.log('\n🚀 Quick Solutions:');
    console.log('1. Buy a domain ($10-15/year)');
    console.log('2. Use subdomain of existing domain');
    console.log('3. Use free domain services (some limitations)');
    
    console.log('\n💡 Example domains for Screenly:');
    console.log('   - screenly.app');
    console.log('   - watchscreenly.com');
    console.log('   - mail.yourdomain.com (subdomain)');
    
    return;
  }
  
  console.log('\n✅ Good! You\'re using your own domain.');
  console.log('🔧 Now let\'s setup domain authentication...');
  
  console.log('\n📋 Step 1: SendGrid Domain Authentication');
  console.log('==========================================');
  console.log('1. Login to SendGrid Dashboard: https://app.sendgrid.com/');
  console.log('2. Go to Settings → Sender Authentication');
  console.log('3. Click "Authenticate Your Domain"');
  console.log(`4. Enter your domain: ${domain}`);
  console.log('5. Choose "Yes" for branded links (recommended)');
  console.log('6. Copy the DNS records provided');
  
  console.log('\n📋 Step 2: DNS Records Setup');
  console.log('=============================');
  console.log('Add these DNS records to your domain provider:');
  console.log('(Exact values will be provided by SendGrid)');
  
  console.log('\n🔑 CNAME Records (DKIM):');
  console.log(`Host: s1._domainkey.${domain}`);
  console.log('Value: s1.domainkey.uXXXXXX.wlXXX.sendgrid.net');
  console.log('');
  console.log(`Host: s2._domainkey.${domain}`);
  console.log('Value: s2.domainkey.uXXXXXX.wlXXX.sendgrid.net');
  
  console.log('\n📬 TXT Record (SPF):');
  console.log(`Host: ${domain}`);
  console.log('Value: v=spf1 include:sendgrid.net ~all');
  
  console.log('\n🔗 CNAME Record (Link Branding):');
  console.log(`Host: url1234.${domain}`);
  console.log('Value: sendgrid.net');
  
  console.log('\n📋 Step 3: Popular DNS Providers');
  console.log('=================================');
  
  console.log('\n🌐 Cloudflare:');
  console.log('1. Login to Cloudflare Dashboard');
  console.log('2. Select your domain');
  console.log('3. Go to DNS → Records');
  console.log('4. Click "Add record"');
  console.log('5. Add each CNAME/TXT record');
  
  console.log('\n🌐 Namecheap:');
  console.log('1. Login to Namecheap Account');
  console.log('2. Go to Domain List → Manage');
  console.log('3. Advanced DNS → Add New Record');
  console.log('4. Add each CNAME/TXT record');
  
  console.log('\n🌐 GoDaddy:');
  console.log('1. Login to GoDaddy Account');
  console.log('2. My Products → DNS');
  console.log('3. Add → CNAME/TXT');
  console.log('4. Add each record');
  
  console.log('\n⏰ Step 4: Wait for Verification');
  console.log('================================');
  console.log('⏳ DNS propagation: 15 minutes - 48 hours');
  console.log('🔍 Check status in SendGrid Dashboard');
  console.log('✅ Green checkmark = Authentication complete');
  
  console.log('\n🎯 Step 5: Update Email Configuration');
  console.log('=====================================');
  console.log('After verification, you can use:');
  console.log(`📧 noreply@${domain}`);
  console.log(`📧 support@${domain}`);
  console.log(`📧 no-reply@${domain}`);
  
  console.log('\n🚀 Benefits After Setup:');
  console.log('========================');
  console.log('✅ Emails won\'t go to spam');
  console.log('✅ Better delivery rates');
  console.log('✅ Professional appearance');
  console.log('✅ Brand trust');
  console.log('✅ Email analytics');
  
  console.log('\n🔧 Testing After Setup:');
  console.log('=======================');
  console.log('1. Update SENDGRID_FROM_EMAIL in .env.local');
  console.log('2. Run: npm run test:sendgrid your-email@gmail.com');
  console.log('3. Test forgot password in your app');
  console.log('4. Check SendGrid Activity for delivery status');
  
  console.log('\n💡 Pro Tips:');
  console.log('============');
  console.log('🎯 Use consistent "From" name and email');
  console.log('📧 Avoid spam trigger words in subject/content');
  console.log('🔄 Monitor bounce rates in SendGrid');
  console.log('📊 Check email analytics regularly');
  console.log('🛡️  Keep your domain reputation clean');
}

// Quick domain check
function quickDomainCheck() {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  
  if (!fromEmail) {
    console.log('❌ No SENDGRID_FROM_EMAIL configured');
    return;
  }
  
  const domain = fromEmail.split('@')[1];
  const isPublicProvider = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'].includes(domain);
  
  console.log('\n📊 Quick Domain Analysis');
  console.log('========================');
  console.log(`📧 Email: ${fromEmail}`);
  console.log(`🌐 Domain: ${domain}`);
  console.log(`🏢 Provider Type: ${isPublicProvider ? 'Public (Gmail, Yahoo, etc.)' : 'Custom Domain'}`);
  console.log(`📈 Deliverability: ${isPublicProvider ? '❌ Poor (likely spam)' : '✅ Good (with proper setup)'}`);
  
  if (isPublicProvider) {
    console.log('\n🎯 Recommendation: Switch to custom domain');
    console.log('💰 Cost: $10-15/year for domain');
    console.log('⏰ Setup time: 30 minutes + DNS propagation');
    console.log('📈 Result: 90%+ inbox delivery rate');
  } else {
    console.log('\n✅ Great choice! Now setup domain authentication.');
  }
}

// Main execution
console.log('🎬 Screenly Email Deliverability Setup');
console.log('======================================');

quickDomainCheck();
setupDomainAuthentication();

console.log('\n📞 Need Help?');
console.log('=============');
console.log('📚 SendGrid Docs: https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication');
console.log('💬 SendGrid Support: https://support.sendgrid.com/');
console.log('🎥 Video Tutorial: Search "SendGrid domain authentication" on YouTube');
