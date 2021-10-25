import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error'};

export const isAuth = async (req, res , next) => {
	const authHeader = req.get('Authorization');
	if (!(authHeader && authHeader.starstWith('Bearer '))){
		return res.status(401).json(AUTH_ERROR);
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token,'3Q7i2T2Z>#e(}@Z',
		async (error, decoded) => {
			if (error) {
				return res.status(401).json(AUTH_ERROR);
			}
			const user = await userRepository.findByUsername(decoded.id);
			if (!user) {
				return res.status(401).json(AUTH_ERROR);
			}
			req.userId = user.id;
			next();
		}
	)
}
