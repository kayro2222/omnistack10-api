const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(request, response){
		const devs = await Dev.find();

		return response.json(devs);
	},

	async store(request, response){
		const { github_username, technologies, latitude, longitude  } = request.body;

		let dev = await Dev.findOne({github_username});
		const githubUrl = `https://api.github.com/users/${github_username}`;

		if(!dev){
			const apiResponse = await axios.get(githubUrl);
			const { name = login, avatar_url, bio } = apiResponse.data;

			const technologiesArray = parseStringAsArray(technologies);

			const location = {
				type: 'Point',
				coordinates: [longitude, latitude],
			}

			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				technologies: technologiesArray,
				location,
			});
		}
		
		return response.json(dev);
	}
}