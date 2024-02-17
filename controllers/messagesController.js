const { messageServices } = require('../services');

const getMessages = async (req, res) => {
    try {
        const params = req.query
        const messages = await messageServices.findAll(params);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Error retrieving messages' });
    }
};

module.exports = {
    getMessages
};
