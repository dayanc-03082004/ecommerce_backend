import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    },
    images: [
        {
            type: String,
        }
    ],
    parentCatName: {
        type: String,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", addressSchema);

export default CategoryModel;
