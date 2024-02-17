const { userServices } = require('../services');

const getUsers = async (req, res) => {
    try {
        const params = req.query;
        const users = await userServices.findAll(params);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Error retrieving users' });
    }
}

const getRecentContacts = async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await userServices.findAllRecentUsers(userId);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving recent contacts:', error);
        res.status(500).json({ error: 'Error retrieving recent contacts' });
    }
}

module.exports = {
    getUsers,
    getRecentContacts
};
