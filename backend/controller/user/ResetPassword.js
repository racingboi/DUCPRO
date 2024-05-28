const bcrypt = require('bcryptjs');
const User = require("../../models/userModel");

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const user
    = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Password reset token is invalid or has expired.',
            error: true
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password reset successfully.',
        error: false
    });

    }

    module.exports = resetPassword;