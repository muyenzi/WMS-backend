import Models from '../database/models';

const CheckPublicPlace = async (req, res, next) => {
	const { name } = req.body;
	const { publicplaces } = Models;
	const found = await publicplaces.findOne({ where: { name } });
	if (found) {
		 req.publicplace = found
		 return next()
	}
   req.publicplace = null
	next();
};

export default CheckPublicPlace;

// findOne({ where: { email } });