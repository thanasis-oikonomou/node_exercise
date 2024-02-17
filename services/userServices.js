const { Op } = require('sequelize');
const { User, Message } = require('../models');

const feedDatabase = async (dataArray) => {
    const usersData = dataArray.filter(data => data.length > 0).map(data => ({
        id: data[0],
        firstName: data[1],
        lastName: data[2],
        birthDate: new Date(data[3]),
        gender: data[4],
        username: data[5]
    }));

    await User.bulkCreate(usersData, { ignoreDuplicates: true })
        .then(() => {
            console.log('Users inserted successfully');
        })
}

const findAll = async (params) => {
    const { searchText, userIds } = params
    let whereClause = {};

    if (userIds) whereClause.id = userIds;

    if (searchText) {
        const words = searchText.split(' ').filter(word => word.trim() !== '');

        whereClause = {
            [Op.or]: words.map(word => ({
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${word}%` } },
                    { lastName: { [Op.iLike]: `%${word}%` } }
                ]
            }))
        };
    }

    return await User.findAll({ where: whereClause });
}

const findAllRecentUsers = async (userId) => {
  return await User.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    include: [
      {
        model: Message,
        as: 'sentMessages',
        where: {
          receiverId: userId,
        },
        required: false,
      },
      {
        model: Message,
        as: 'receivedMessages',
        where: {
          senderId: userId,
        },
        required: false,
      },
    ],
    where: {
      [Op.or]: [
        { '$sentMessages.receiverId$': userId },
        { '$receivedMessages.senderId$': userId },
      ],
    },
    order: [
      ['sentMessages', 'timestampSent', 'DESC'],
      ['receivedMessages', 'timestampSent', 'DESC'],
    ],
    distinct: true,
  });
};

module.exports = {
    feedDatabase,
    findAll,
    findAllRecentUsers
};
