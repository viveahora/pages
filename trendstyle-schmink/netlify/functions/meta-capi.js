const https = require('https');

const PIXEL_ID = '453746324141769';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { eventName, sourceUrl, clientIp, clientUserAgent, fbp, fbc } = body;

  const payload = JSON.stringify({
    data: [
      {
        event_name: eventName || 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: sourceUrl,
        action_source: 'website',
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: clientUserAgent,
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
        },
      },
    ],
  });

  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const req = https.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', (err) => resolve({ statusCode: 500, body: err.message }));
    req.write(payload);
    req.end();
  });
};
