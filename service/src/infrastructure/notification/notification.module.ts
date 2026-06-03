import { Module } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { SmsService } from './sms/sms.service';

@Module({
  imports: [],
  providers: [MailService, SmsService],
  exports: [MailService, SmsService],
})
export class NotificationModule {}
