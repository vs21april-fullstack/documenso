import { env } from '../../lib/utils/env.js';
import { normalizeMailHeaders } from './normalize-headers.js';

const VERSION = '1.0.0';
/**
 * Transport for sending email through MailChannels via Cloudflare Workers.
 *
 * Optionally allows specifying a custom endpoint and API key so you can setup a worker
 * to proxy requests to MailChannels with added security.
 *
 * @see https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/
 */
class MailChannelsTransport {
  name = 'CloudflareMailTransport';
  version = VERSION;
  static makeTransport(options) {
    return new MailChannelsTransport(options);
  }
  constructor(options) {
    const {
      apiKey = '',
      endpoint = 'https://api.mailchannels.net/tx/v1/send'
    } = options;
    this._options = {
      apiKey,
      endpoint
    };
  }
  send(mail, callback) {
    if (!mail.data.to || !mail.data.from) {
      return callback(new Error('Missing required fields "to" or "from"'), null);
    }
    const mailTo = this.toMailChannelsAddresses(mail.data.to);
    const mailCc = this.toMailChannelsAddresses(mail.data.cc);
    const mailBcc = this.toMailChannelsAddresses(mail.data.bcc);
    const [from] = this.toMailChannelsAddresses(mail.data.from);
    const [replyTo] = this.toMailChannelsAddresses(mail.data.replyTo);
    if (!from) {
      return callback(new Error('Missing required field "from"'), null);
    }
    const requestHeaders = {
      'Content-Type': 'application/json'
    };
    if (this._options.apiKey) {
      requestHeaders['X-Auth-Token'] = this._options.apiKey;
    }
    fetch(this._options.endpoint, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        from: from,
        reply_to: replyTo,
        headers: normalizeMailHeaders(mail.data.headers),
        subject: mail.data.subject,
        personalizations: [{
          to: mailTo,
          cc: mailCc.length > 0 ? mailCc : undefined,
          bcc: mailBcc.length > 0 ? mailBcc : undefined,
          dkim_domain: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_DOMAIN') || undefined,
          dkim_selector: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_SELECTOR') || undefined,
          dkim_private_key: env('NEXT_PRIVATE_MAILCHANNELS_DKIM_PRIVATE_KEY') || undefined
        }],
        content: [{
          type: 'text/plain',
          value: mail.data.text?.toString('utf-8') ?? ''
        }, {
          type: 'text/html',
          value: mail.data.html?.toString('utf-8') ?? ''
        }]
      })
    }).then(res => {
      if (res.status >= 200 && res.status <= 299) {
        return callback(null, {
          messageId: '',
          envelope: {
            from: mail.data.from,
            to: mail.data.to
          },
          accepted: mail.data.to,
          rejected: [],
          pending: []
        });
      }
      res.json().then(data => callback(new Error(`MailChannels error: ${data.message}`), null)).catch(err => callback(err, null));
    }).catch(err => {
      return callback(err, null);
    });
  }
  /**
   * Converts a nodemailer address(s) to an array of MailChannel compatible address.
   */
  toMailChannelsAddresses(address) {
    if (!address) {
      return [];
    }
    if (typeof address === 'string') {
      return [{
        email: address
      }];
    }
    if (Array.isArray(address)) {
      return address.map(address => {
        if (typeof address === 'string') {
          return {
            email: address
          };
        }
        return {
          email: address.address,
          name: address.name
        };
      });
    }
    return [{
      email: address.address,
      name: address.name
    }];
  }
}

export { MailChannelsTransport };
//# sourceMappingURL=mailchannels.js.map
