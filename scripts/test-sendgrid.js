const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testSendGrid() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  
  if (!apiKey) {
    console.log('❌ SENDGRID_API_KEY not found in .env.local');
    console.log('💡 Add your SendGrid API key to .env.local:');
    console.log('   SENDGRID_API_KEY="SG.your-api-key-here"');
    return;
  }
  
  if (!fromEmail) {
    console.log('❌ SENDGRID_FROM_EMAIL not found in .env.local');
    console.log('💡 Add your verified sender email to .env.local:');
    console.log('   SENDGRID_FROM_EMAIL="noreply@yourdomain.com"');
    return;
  }
  
  console.log('🧪 Testing SendGrid configuration...');
  console.log(`📧 From Email: ${fromEmail}`);
  
  sgMail.setApiKey(apiKey);
  
  const testEmail = process.argv[2] || 'test@example.com';
  
  const msg = {
    to: testEmail,
    from: {
      email: fromEmail,
      name: 'Screenly - Test'
    },
    subject: '🧪 SendGrid Test - Screenly',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: white; padding: 20px;">
        <div style="background: linear-gradient(135deg, #E50914, #B20710); padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="margin: 0; color: white;">Screenly</h1>
          <p style="margin: 10px 0 0 0; color: #ffcccc;">SendGrid Test Email</p>
        </div>
        
        <div style="padding: 20px 0;">
          <h2>🎉 SendGrid Working!</h2>
          <p>Congratulations! Your SendGrid configuration is working correctly.</p>
          
          <div style="background-color: #2a2a2a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #E50914; margin-top: 0;">✅ Test Results:</h3>
            <ul>
              <li>API Key: Valid</li>
              <li>From Email: Verified</li>
              <li>Email Delivery: Success</li>
              <li>HTML Template: Rendered</li>
            </ul>
          </div>
          
          <p>Your reset password emails will now be delivered reliably through SendGrid!</p>
          
          <p style="margin-top: 30px;">
            <strong>Next Steps:</strong><br>
            1. Test the forgot password feature in your app<br>
            2. Monitor email delivery in SendGrid dashboard<br>
            3. Setup domain authentication for better deliverability
          </p>
        </div>
        
        <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center; color: #888; font-size: 14px;">
          <p>© 2024 Screenly. This is a test email.</p>
        </div>
      </div>
    `,
    text: `
      Screenly - SendGrid Test Email
      
      Congratulations! Your SendGrid configuration is working correctly.
      
      Test Results:
      ✅ API Key: Valid
      ✅ From Email: Verified  
      ✅ Email Delivery: Success
      ✅ HTML Template: Rendered
      
      Your reset password emails will now be delivered reliably through SendGrid!
      
      Next Steps:
      1. Test the forgot password feature in your app
      2. Monitor email delivery in SendGrid dashboard
      3. Setup domain authentication for better deliverability
      
      © 2024 Screenly. This is a test email.
    `
  };
  
  try {
    console.log(`📤 Sending test email to: ${testEmail}`);
    const response = await sgMail.send(msg);
    
    console.log('✅ SendGrid test email sent successfully!');
    console.log(`📊 Status Code: ${response[0].statusCode}`);
    console.log(`📧 Message ID: ${response[0].headers['x-message-id']}`);
    console.log('');
    console.log('🎉 Your SendGrid configuration is working perfectly!');
    console.log('💡 Now you can test the forgot password feature in your app.');
    
  } catch (error) {
    console.error('❌ SendGrid test failed:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.body);
      
      if (error.response.body.errors) {
        error.response.body.errors.forEach(err => {
          console.error(`- ${err.message}`);
          
          if (err.field === 'from') {
            console.log('');
            console.log('💡 Fix: Verify your sender email in SendGrid dashboard');
            console.log('   Settings → Sender Authentication → Single Sender Verification');
          }
        });
      }
    } else {
      console.error('Error:', error.message);
    }
    
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Check your SENDGRID_API_KEY is correct');
    console.log('2. Verify your SENDGRID_FROM_EMAIL in SendGrid dashboard');
    console.log('3. Ensure API key has Mail Send permissions');
    console.log('4. Check SendGrid documentation: https://docs.sendgrid.com/');
  }
}

// Run the test
if (require.main === module) {
  console.log('🧪 SendGrid Test Script');
  console.log('Usage: node scripts/test-sendgrid.js [test-email]');
  console.log('');
  
  testSendGrid();
}
