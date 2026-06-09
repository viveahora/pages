const https = require('https');

const PIXEL_ID = '453746324141769';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!ACCESS_TOKEN) {
    console.error('META_CAPI_TOKEN is not set');
    return { statusCode: 500, body: 'Token not configured' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { eventName, sourceUrl, clientUserAgent, fbp, fbc } = body;

  // IP aus Netlify Request Headers holen
  const clientIp =
    event.headers['x-forwarded-for']?.split(',')[0].trim() ||
    event.headers['client-ip'] ||
    '0.0.0.0';

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: clientUserAgent || '',
  };
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = JSON.stringify({
    data: [
      {
        event_name: eventName || 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: sourceUrl || '',
        action_source: 'website',
        user_data: userData,
      },
    ],
  });

  console.log('Sending CAPI event:', eventName, 'IP:', clientIp);

  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Meta CAPI response:', res.statusCode, data);
        resolve({ statusCode: res.statusCode, body: data });
      });
    });
    req.on('error', (err) => {
      console.error('CAPI request error:', err.message);
      resolve({ statusCode: 500, body: err.message });
    });
    req.write(payload);
    req.end();
  });
};
