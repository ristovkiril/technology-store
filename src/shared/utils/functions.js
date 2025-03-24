import {getDownloadURL, ref, uploadBytes, deleteObject} from "firebase/storage";
import {storage} from "@/firebase.js";

export const uploadFile =  async (file, name) => {
  const fileFolderRef = ref(storage, `user-profiles/${name}`)
  const imgRef = await uploadBytes(fileFolderRef, file);
  return await getDownloadURL(imgRef.ref);
}

export const removeFile = async (fileUrl) => {
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
}