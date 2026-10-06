import { Router } from 'express'
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addBannerList2, deleteBannerList2, getBannerList2, getBannersList2, updatedBannerList2, uploadImages } from '../controllers/bannerList2.controller.js';
import { removeImageFromCloudinary } from '../controllers/user.controller.js';


const bannerList2Router = Router();
bannerList2Router.post('/uploadImages', auth, upload.array('images'), uploadImages);
bannerList2Router.post('/add', auth, addBannerList2);
bannerList2Router.get('/', getBannersList2);
bannerList2Router.get('/:id', getBannerList2);
bannerList2Router.delete('/deleteImage', auth, removeImageFromCloudinary);
bannerList2Router.delete('/:id', auth, deleteBannerList2);
bannerList2Router.put('/:id', auth, updatedBannerList2);

export default bannerList2Router;