const crypto = require('crypto');
const https = require('https');
const config = require('./config'); // Config should have sensitive details

const generateSignature = (data) => {
    // Ensure the order of these keys matches the documentation requirement
    const params = [
        'accessKey', 'amount', 'extraData', 'ipnUrl', 'orderId',
        'orderInfo', 'partnerCode', 'redirectUrl', 'requestId',
        'requestType', 'autoCapture', 'lang', 'orderGroupId'
    ];
    const rawSignature = params.map(key => `${key}=${encodeURIComponent(data[key] || '')}`).join('&');
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);

    return crypto.createHmac('sha256', config.secretKey)
        .update(rawSignature)
        .digest('hex');
};

const sendPaymentRequest = async (paymentData) => {
    const signature = generateSignature(paymentData);
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    paymentData.signature = signature; // Add signature to the data

    const requestBody = JSON.stringify(paymentData);
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    const req = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            console.log('resultCode: ');
            console.log(JSON.parse(body).resultCode);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    console.log("Sending...");
    req.write(requestBody);
    req.end();
};

const PayMomo = async () => {
    const orderId = config.partnerCode + new Date().getTime(); // Generate unique order ID

    const paymentData = {
        accessKey: config.accessKey,
        amount: '50000',
        extraData: '',
        ipnUrl: config.ipnUrl,
        orderId: orderId,
        orderInfo: 'pay with MoMo',
        partnerCode: config.partnerCode,
        redirectUrl: config.redirectUrl,
        requestId: orderId,
        requestType: "payWithMethod",
        autoCapture: true,
        lang: 'vi',
        orderGroupId: ''
    };

    await sendPaymentRequest(paymentData);
};
module.exports = { PayMomo };