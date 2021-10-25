import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

//나중에 수정 (서버에 남겨놓으면 좋지안하.ㄷ)
const jwtSecretKey = '3Q7i2T2Z>#e(}@Z';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res){
	const { username,password,name,email,url } = req.body;
	const found = await userRepository.findByUsername(username);
	if(found) {
		return res.status(409).json({message: `${username} already exists`});
	}
	const hashed = await bcrypt.hash(password, bcryptSaltRounds);
	const userId = await userRepository.createUser({
		username,
		password:hashed,
		name,
		email,
		url,
	});
	const token = createJwtToken(userId);
	res.status(201).json({token, username});
}

export async function login(req, res){
	const {username, password} = req.body;
	const user = await userRepository.findByUsername(username);
	if(!user){
		return res.status(401).json({message: 'invalid user or password'});
	}
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword){
		return res.status(401).json({message:'invalid user or password'});
	}
	const token = createJwtToken(user.id);
	res.status(200).json({token, username});
}

export async function me (req, res) {
	const user = await userRepository.findById(req.userId);
	if (!user){
		return res.status(404).json({message: 'User not found'});
	}
	res.status(200).json({token: req.token, username: user.username})
}

function createJwtToken(id){
	return jwt.sign({id},jwtSecretKey, { expiresIn: jwtExpiresInDays});

}
