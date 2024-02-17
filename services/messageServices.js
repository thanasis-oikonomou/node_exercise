const { Message, User } = require('../models');

const feedDatabase = async (dataArray) => {
    const validMessages = [];

    for (const data of dataArray) {
        const senderId = parseInt(data[2]);
        const receiverId = parseInt(data[3]);
        const sender = await User.findByPk(senderId);
        const receiver = await User.findByPk(receiverId);

        if (sender && receiver) {
            validMessages.push({
                id: data[0],
                content: data[1],
                timestampSent: new Date(data[5]),
                seen: data[4],
                senderId: senderId,
                receiverId: receiverId,
                createdAt: new Date(data[5]),
                updatedAt: new Date(),
            });
        }
    }

    await Message.bulkCreate(validMessages, { ignoreDuplicates: true })
        .then(() => {
            console.log('Messages inserted successfully');
        })
}

const findAll = async (params) => {
    const { userIds } = params

    const whereClause = {};
    if (userIds) { whereClause.senderId = userIds; whereClause.receiverId = userIds }

    return await Message.findAll({
        where: whereClause,
        order: [['timestampSent', 'DESC']]
    });
} 

module.exports = {
    feedDatabase,
    findAll
};
