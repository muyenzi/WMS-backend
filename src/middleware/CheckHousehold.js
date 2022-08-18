import Models from '../database/models';

const CheckHousehold = async (req, res, next) => {
	const { phoneNumber } = req.body;
	const { households } = Models;
	const found = await households.findOne({ where: { phoneNumber } });
	if (found) {
		 req.household = found
		 return next()
	}
   req.household = null
	next();
};

export default CheckHousehold;

// findOne({ where: { email } });