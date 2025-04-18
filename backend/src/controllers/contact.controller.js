const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send contact message
exports.sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save message to database
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });
        await contact.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New Contact Message: ${subject}`,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all messages (admin only)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update message status (admin only)
exports.updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}; 