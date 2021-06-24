import * as express from 'express';

import { deleteSpot } from '@tripController/deleteSpot';
import { insertSpot } from '@tripController/insertSpot';
import { listPost } from '@tripController/list';
import { listGet } from '@tripController/list';
import { recommend } from '@tripController/recommend';
import { search } from '@tripController/search';

const router = express.Router();

router.post('/deleteSpot', deleteSpot);
router.post('/insertSpot', insertSpot);
router.post('/list', listPost);
router.get('/list', listGet);
router.post('/recommend', recommend);
router.post('/search', search);

export = router;