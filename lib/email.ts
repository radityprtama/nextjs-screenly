import nodemailer from "nodemailer";

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password, bukan password biasa
    },
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
) => {
  const transporter = createTransporter();

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: {
      name: "Screenly - Movie Streaming",
      address: process.env.EMAIL_USER!,
    },
    to: email,
    subject: "Reset Your Password - Screenly",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; }
          .header { background: linear-gradient(135deg, #E50914, #B20710); padding: 40px 20px; text-align: center; }
          .logo { color: white; font-size: 32px; font-weight: bold; margin: 0; }
          .content { padding: 40px 20px; color: #ffffff; }
          .button { display: inline-block; background-color: #E50914; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .button:hover { background-color: #B20710; }
          .footer { padding: 20px; text-align: center; color: #888; font-size: 14px; border-top: 1px solid #333; }
          .warning { background-color: #2d1b1b; border-left: 4px solid #E50914; padding: 15px; margin: 20px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Screenly</h1>
            <p style="color: #ffcccc; margin: 10px 0 0 0;">Reset Your Password</p>
          </div>
          
          <div class="content">
            <h2 style="color: #ffffff; margin-top: 0;">Password Reset Request</h2>
            <p>Hi there!</p>
            <p>We received a request to reset your password for your Screenly account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <div class="warning">
              <p style="margin: 0; font-weight: bold;">⚠️ Important Security Information:</p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>This link will expire in 24 hours</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #2a2a2a; padding: 10px; border-radius: 4px; font-family: monospace;">
              ${resetUrl}
            </p>
            
            <p>If you have any questions or need help, please contact our support team.</p>
            
            <p>Best regards,<br>The Screenly Team</p>
          </div>
          
          <div class="footer">
            <p>© 2024 Screenly. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Reset Your Password - Screenly
      
      Hi there!
      
      We received a request to reset your password for your Screenly account.
      
      Click this link to reset your password: ${resetUrl}
      
      This link will expire in 24 hours.
      
      If you didn't request this reset, please ignore this email.
      
      Best regards,
      The Screenly Team
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

// Send welcome email for new users
export const sendWelcomeEmail = async (email: string, name: string) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: {
      name: "Screenly - Movie Streaming",
      address: process.env.EMAIL_USER!,
    },
    to: email,
    subject: "Welcome to Screenly! 🎬",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Screenly</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f0f0f; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; }
          .header { background: linear-gradient(135deg, #E50914, #B20710); padding: 40px 20px; text-align: center; }
          .logo { color: white; font-size: 32px; font-weight: bold; margin: 0; }
          .content { padding: 40px 20px; color: #ffffff; }
          .button { display: inline-block; background-color: #E50914; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; color: #888; font-size: 14px; border-top: 1px solid #333; }
          .feature { background-color: #2a2a2a; padding: 20px; margin: 15px 0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Screenly</h1>
            <p style="color: #ffcccc; margin: 10px 0 0 0;">Welcome to the Family!</p>
          </div>
          
          <div class="content">
            <h2 style="color: #ffffff; margin-top: 0;">Welcome, ${name}! 🎉</h2>
            <p>Thank you for joining Screenly! We're excited to have you as part of our movie-loving community.</p>
            
            <div class="feature">
              <h3 style="color: #E50914; margin-top: 0;">🎬 What you can do now:</h3>
              <ul>
                <li>Browse thousands of movies from TMDB</li>
                <li>Create your personal watchlist</li>
                <li>Watch trailers and get movie details</li>
                <li>Discover new movies with our recommendation system</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}" class="button">Start Watching Now</a>
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
            
            <p>Happy watching!<br>The Screenly Team</p>
          </div>
          
          <div class="footer">
            <p>© 2024 Screenly. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw error for welcome email, it's not critical
    return { success: false, error: error };
  }
};
