import mongoose from "mongoose";

const bannerList2Schema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],

    bannerTitle: {
      type: String,
      default: "",
    },

    catId: {
      type: String,
      default: "",
    },

    subCatId: {
      type: String,
      default: "",
    },

    thirdsubCatId: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      default: "",
    },

    alignInfo: {
      type: String,
      default: "left",
    },
  },
  {
    timestamps: true,
  }
);

const BannerList2Model = mongoose.model("bannerList2",bannerList2Schema);

export default BannerList2Model;