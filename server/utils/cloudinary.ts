import { v2 as cloudinary } from "cloudinary";

export const deleteResourceFromCloudinary = async (
  resourceName: string,
  resource_type: string | undefined = "image"
) => {
  const config = useRuntimeConfig();
  cloudinary.config({
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    cloud_name: config.public.cloudinaryCloudName,
  });
  await cloudinary.uploader.destroy(resourceName, {
    resource_type,
  });
};
