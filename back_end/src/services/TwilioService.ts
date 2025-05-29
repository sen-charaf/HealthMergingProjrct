import twilio from 'twilio';
import User from '../models/User.js';

class TwilioService {
  private client: twilio.Twilio;
  private serviceSid: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID || '';

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials are required');
    }

    this.client = twilio(accountSid, authToken);
  }

  async sendVerificationCode(phoneNumber: string): Promise<{ status: string; sid: string }> {
    try {
      const verification = await this.client.verify.v2
        .services(this.serviceSid)
        .verifications.create({
          to: phoneNumber,
          channel: 'sms'
        });

      return {
        status: verification.status,
        sid: verification.sid
      };
    } catch (error) {
      console.error('Error sending verification code:', error);
      throw new Error('Failed to send verification code');
    }
  }

  async verifyCode(phoneNumber: string, code: string): Promise<{ status: string; valid: boolean }> {
    try {
      const verificationCheck = await this.client.verify.v2
        .services(this.serviceSid)
        .verificationChecks.create({
          to: phoneNumber,
          code: code
        });

      return {
        status: verificationCheck.status,
        valid: verificationCheck.status === 'approved'
      };
    } catch (error) {
      console.error('Error verifying code:', error);
      throw new Error('Failed to verify code');
    }
  }
}

export default new TwilioService();


// Add these methods to your AuthService.ts


