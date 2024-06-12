const StatusCodes = require('http-status-codes');
const moment = require('moment');
const sendMail = require('../../ultils/sendMail');
const User = require("../../models/userModel");
const order = require("../../models/orderModel");
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

const create_payment_url = async (req, res) => {
    // #swagger.tags = ['vnpay']
    // #swagger.summary = 'add'
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let returnUrl = process.env.VNP_RETURN_URL;

    let orderId = req.body.orderId;
    let amount = req.body.amount;

    let bankCode = '';

    let locale = '';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan maGD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'Update Pro';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.set('Content-Type', 'text/html');
    res.send(JSON.stringify(vnpUrl));
};

const vnpay_return = async (req, res) => {
    // #swagger.tags = ['vnpay']
    // #swagger.summary = 'check'
    let {day = 30} = req.body;
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    let gia = vnp_Params['vnp_Amount'];
    let hash = secureHash;

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = 'DENHJRMJZSHXENEAWJVJWBBENOMZAXST';
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, {encode: false});
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    if(vnp_Params['vnp_ResponseCode'] === '00') {
        res.redirect(`${process.env.FRONTEND_URL}/success`);
    } else {
        res.redirect(`${process.env.FRONTEND_URL}/cancel`);
    }

};

const sendSuccessEmail = async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        console.error('Order ID is missing.');
        res.status(400).send('Bad Request: Missing order ID.');
        return;
    }

    let user;
    let orders;

    try {
        user = await User.findOne({ _id: orderId });
        if (!user) {
            console.error('User not found.');
            res.status(404).send('User not found.');
            return;
        }
    } catch (error) {
        console.error('Failed to retrieve user:', error);
        res.status(500).send('Internal Server Error while retrieving user');
        return;
    }

    try {
        orders = await order.findOne({ userId: orderId }).select('total');
        if (!orders) {
            console.error('Order not found.');
            res.status(404).send('Order not found.');
            return;
        }
    } catch (error) {
        console.error('Failed to retrieve order:', error);
        res.status(500).send('Internal Server Error while retrieving order');
        return;
    }

    const { total: paymentAmount } = orders;
    const emailData = {
        email: user.email,
        subject: 'Payment Success',
        html: `
            <div style="background-color: aliceblue; padding: 20px; margin: 20px auto; border-radius: 10px; 
            border: 1px solid #ccc; width: 80%; text-align: center; font-size: 1.2rem; 
            font-family: Arial, sans-serif; color: #333;">
                <h3>Payment Success</h3>
               <p>You have successfully paid ${paymentAmount.toLocaleString('en-US')} VND</p>
            </div>
        `
    };

    try {
        await sendMail(emailData);
        res.send('Email sent successfully.');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Internal Server Error while sending email');
    }
};

module.exports = {
    create_payment_url,
    vnpay_return,
    sendSuccessEmail
}