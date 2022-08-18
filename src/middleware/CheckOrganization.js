import Models from '../database/models';

const CheckOrganization = async (req, res, next) => {
	const { name } = req.body;
	const { organizations } = Models;
	const found = await organizations.findOne({ where: { name } });
	if (found) {
		 req.organization = found
		 return next()
	}
   req.organization = null
	next();
};

export default CheckOrganization;

// findOne({ where: { email } });