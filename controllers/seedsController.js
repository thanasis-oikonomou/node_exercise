const xlsx = require('node-xlsx');
const path = require('path');
const { userServices, messageServices } = require('../services');

const feedDatabase = async (_req, res) => {
    try {
        const seeds = xlsx.parse(path.join(__dirname, '../seeds.xlsx'));

        await userServices.feedDatabase(seeds[0]['data'])
        await messageServices.feedDatabase(seeds[1]['data'])

        res.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
        console.error('Error importing data:', error);
        res.status(422).json({ error: 'Error importing data' });
    }
}

module.exports = {
    feedDatabase
};
