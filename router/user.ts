import express from 'express';

import { likePost } from '@userController/like';
import { likeGet } from '@userController/like';
import { myPage } from '@userController/myPage';
import { signIn } from '@userController/signIn';
import { signOut } from '@userController/signOut';
import { signUp } from '@userController/signUp';
import { userInfoPost } from '@userController/userInfo';
import { userInfoGet } from '@userController/userInfo';

const router = express.Router();

router.post('/like', likePost);
router.get('/like', likeGet);
router.get('/myPage', myPage);
router.post('/signIn', signIn);
router.post('/signOut', signOut);
router.post('/signUp', signUp);
router.post('/userInfo', userInfoPost);
router.get('/userInfo', userInfoGet);

export = router;