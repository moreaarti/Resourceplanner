
import config from "../config/config";

import { mediaUpload} from "./api";

export async function uploadFile(file){
  const data = await mediaUpload(config.API_UPLOAD_FILE_URL,file);
  return data;
}
