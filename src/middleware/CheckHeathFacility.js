import Models from '../database/models';

const CheckHealthFacility = async (req, res, next) => {
	const { name } = req.body;
	const { healthfacilities } = Models;
	const found = await healthfacilities.findOne({ where: { name } });
	if (found) {
		 req.healthFacility = found
		 return next()
	}
   req.healthFacility = null
	next();
};

export default CheckHealthFacility;

// findOne({ where: { email } });