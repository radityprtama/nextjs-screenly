const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

async function debugEmailConfig() {
  console.log('🔍 Email Configuration Debug');
  console.log('================================');
  
  // Check SendGrid config
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sendgridFrom = process.env.SENDGRID_FROM_EMAIL;
  
  console.log('📧 SendGrid Configuration:');
  console.log(`   API Key: ${sendgridKey ? '✅ Set (SG.' + sendgridKey.substring(3, 8) + '...)' : '❌ Not set'}`);
  console.log(`   From Email: ${sendgridFrom ? '✅ ' + sendgridFrom : '❌ Not set'}`);
  
  // Check Gmail config
  const gmailUser = process.env.EMAIL_USER;
  const gmailPass = process.env.EMAIL_PASS;
  
  console.log('\n📧 Gmail Configuration:');
  console.log(`   Email User: ${gmailUser ? '✅ ' + gmailUser : '❌ Not set'}`);
  console.log(`   Email Pass: ${gmailPass ? '✅ Set (****)' : '❌ Not set'}`);
  
  // Check which service will be used
  const hasSendGrid = sendgridKey && sendgridFrom;
  const hasGmail = gmailUser && gmailPass;
  
  console.log('\n🚀 Email Service Priority:');
  if (hasSendGrid) {
    console.log('   1. ✅ SendGrid (Primary)');
    if (hasGmail) {
      console.log('   2. ✅ Gmail (Fallback)');
    } else {
      console.log('   2. ❌ Gmail (Not configured)');
    }
  } else if (hasGmail) {
    console.log('   1. ❌ SendGrid (Not configured)');
    console.log('   2. ✅ Gmail (Primary)');
  } else {
    console.log('   ❌ No email service configured!');
  }
  
  // Check other env vars
  console.log('\n🔧 Other Configuration:');
  console.log(`   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ Not set'}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  
  // Test forgot password API condition
  const hasEmailConfig = hasSendGrid || hasGmail;
  console.log('\n🎯 Forgot Password API Will:');
  if (hasEmailConfig) {
    console.log('   ✅ Send actual email');
    console.log(`   📤 Using: ${hasSendGrid ? 'SendGrid' : 'Gmail'}`);
  } else {
    console.log('   ❌ Only log reset link to console');
    console.log('   💡 Configure email service to send real emails');
  }
  
  // Troubleshooting tips
  console.log('\n🔧 Troubleshooting Tips:');
  console.log('   1. Check spam folder in your email');
  console.log('   2. SendGrid delivery can take 1-5 minutes');
  console.log('   3. Verify sender email in SendGrid dashboard');
  console.log('   4. Check SendGrid Activity feed for delivery status');
  console.log('   5. Try different email provider (Gmail, Yahoo, etc.)');
  
  if (hasSendGrid) {
    console.log('\n📊 SendGrid Monitoring:');
    console.log('   Dashboard: https://app.sendgrid.com/');
    console.log('   Activity: Settings → Activity');
    console.log('   Statistics: Email Activity → Statistics');
  }
}

// Test forgot password flow
async function testForgotPassword(email) {
  console.log(`\n🧪 Testing Forgot Password for: ${email}`);
  console.log('================================');
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    console.log(`📡 API Response (${response.status}):`);
    console.log(JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ API call successful!');
      console.log('💡 Check your email (including spam folder)');
      console.log('💡 Check development server logs for email status');
      
      if (data.resetLink) {
        console.log(`\n🔗 Development Reset Link:`);
        console.log(`   http://localhost:3001${data.resetLink}`);
      }
    } else {
      console.log('\n❌ API call failed!');
    }
    
  } catch (error) {
    console.error('❌ Error testing forgot password:', error.message);
  }
}

// Run debug
async function main() {
  await debugEmailConfig();
  
  const testEmail = process.argv[2];
  if (testEmail) {
    await testForgotPassword(testEmail);
  } else {
    console.log('\n💡 Usage: node scripts/debug-email.js [test-email]');
    console.log('   Example: node scripts/debug-email.js eonlixs@gmail.com');
  }
}

main();
