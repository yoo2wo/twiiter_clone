import express from 'express';
import {body} from 'express-validator';
import {} from 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';
import  { isAuth } from '../middleware/auth.js'

const router = express.Router();

const validateTweet = [
	body('text')
		.trim()
		.isLength({min: 3})
		.withMessage('text >= 3'),
	validate
];

//GET /tweets => undifined
//GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);
router.get('/:id', isAuth,tweetController.getTweet);
//POST /tweets
router.post('/', isAuth,validateTweet, tweetController.createTweet);
//PUT /tweets/:id
router.put('/:id', isAuth,validateTweet, tweetController.updateTweet);
//DELETE /tweets/:id
router.delete('/:id', isAuth,tweetController.deleteTweet);

export default router;
