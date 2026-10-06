import BannerList2Model from "../models/bannerList2.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
        },
      );
    }

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function addBannerList2(request, response) {
  try {
    const banner = new BannerList2Model({
      bannerTitle: request.body.bannerTitle,
      images: request.body.images || [],
      catId: request.body.catId,
      subCatId: request.body.subCatId,
      thirdsubCatId: request.body.thirdsubCatId,
      price: request.body.price,
      alignInfo: request.body.alignInfo,
    });

    const savedBanner = await banner.save();

    return response.status(200).json({
      message: "Banner created",
      error: false,
      success: true,
      banner: savedBanner,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBannersList2(request, response) {
  try {
      const banners = await BannerList2Model.find();
      
      if(!banners) {
        return response.status(500).json({
          error: true,
          success: false
        })
      }
    return response.status(200).json({
      error: false,
      success: true,
      data: banners,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBannerList2(request, response) {
  try {
    const banner = await BannerList2Model.findById(request.params.id);

    if (!banner) {
      response.status(500).json({
        message: "The banner with the given ID was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      banner: banner,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteBannerList2(request, response) {
  const banner = await BannerList2Model.findById(request.params.id);
  const images = banner.images;
  let img;

  for (img of images) {
    const imgUrl = img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split(".")[0];

    if (imageName) {
      cloudinary.uploader.destroy(imageName, (error, result) => {});
    }
  }

  const deletedBanner = await BannerList2Model.findByIdAndDelete(request.params.id);
  if (!deletedBanner) {
    response.status(404).json({
      message: "Banner not found!",
      success: false,
      error: true,
    });
  }
  response.status(200).json({
    message: "Banner Deleted!",
    success: true,
    error: false,
  });
}

export async function updatedBannerList2(request, response) {
  const banner = await BannerList2Model.findByIdAndUpdate(
    request.params.id,
    {
      bannerTitle: request.body.bannerTitle,
      images: imagesArr.length>0 ? imagesArr[0] : request.body.images,
      catId: request.body.catId,
      subCatId: request.body.subCatId,
      thirdsubCatId: request.body.thirdsubCatId,
      price: request.body.price,
      alignInfo: request.body.alignInfo,
    },
    { new: true },
  );

  if (!banner) {
    return response.status(500).json({
      message: "Banner cannot be updated!",
      success: false,
      error: true,
    });
  }

  imagesArr = [];
  response.status(200).json({
    error: false,
    success: true,
    banner: banner,
    message: "Banner updated successfully"
  });
}