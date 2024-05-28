const crypto = require('crypto');
const sendMail = require('../../ultils/sendMail');
const User = require("../../models/userModel")

forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'No user found with this email.',
            error: true
        });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetPasswordExpires;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    // const resetURL = `http://localhost:8080/api/reset-password/${resetToken}`;
    const message = `
   <div style="background-color: aliceblue; 
    padding: 20px; 
    margin: 20px; 
    border-radius: 10px; 
    border: 1px solid #ccc; 
    width: 80%; 
    margin: 0 auto; 
    text-align: center; 
    font-size: 1.2rem; 
    font-family: Arial, sans-serif; 
    color: #333;"
   >
    <h3>Reset Password</h3>
    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.
    Please click on the following button to complete the process within one hour of receiving it:</p>
    <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">Reset Password</a>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
</div>
`;
    const data = {
        email: user.email,
        subject: 'Password Reset',
        html: message
    }
    try {
        await sendMail(data);

        res.status(200).json({
            success: true,
            message: 'Reset Password link sent to email.',
            error: false
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return res.status(500).json({
            success: false,
            message: 'There was an error sending the email.',
            error: true
        });
    }
};

module.exports = forgotPassword;
