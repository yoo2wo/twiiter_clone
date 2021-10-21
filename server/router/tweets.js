import express from 'express';
import {} from 'express-async-errors';
import * as tweetController from '../controller/tweet.js';


const router = express.Router();

//GET /tweets => undifined
//GET /tweets?username=:username
router.get('/', tweetController.getTweets );

router.get('/:id', tweetController.getTweet);
//POST /tweets
router.post('/', tweetController.createTweet);
//PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);
//DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
