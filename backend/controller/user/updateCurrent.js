const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

// Update current user info
const updateCurrent = asyncHandler(async (req, res) => {
    const { userId, email, profilePic, name, password } = req.body;

    // Build the update payload based on provided fields
    const payload = {
        ...(email && { email }),
        ...(name && { name }),
        ...(profilePic && { profilePic }),
        ...(password && { password: await bcrypt.hash(password, 10) }) // Asynchronously hash the password
    };

    // Ensure payload is not empty before updating
    if (Object.keys(payload).length === 0) {
        return res.status(400).json({
            message: 'No update fields provided',
            success: false,
            error: true
        });
    }

    try {
        // Update the user and return the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
                error: true
            });
        }

        res.json({
            data: updatedUser,
            message: 'User Updated',
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Server error',
            success: false,
            error: true
        });
    }
});

module.exports = updateCurrent;
