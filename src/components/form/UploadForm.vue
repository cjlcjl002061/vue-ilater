<template>
  <div class="upload-form-box">
    <el-upload
        class="upload-template"
        ref="uploadRef"
        v-model:file-list="fileList"
        drag
        :show-file-list="true"
        :auto-upload="false"
        :multiple="false"
        :action="postUrl"
        :name="postFileName"
        :data="postData"
        :method="postMethod"
        :on-change="onChangeFile"
        :before-remove="onRemoveFile"
        :on-error="onError"
        :on-success="onSuccess"
    >
      <el-icon class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <!--    <div>-->
    <!--      <slot name="tip">提示信息：xxxx</slot>-->
    <!--    </div>-->
    <!--    <div><span>文件列表</span></div>-->
    <!--    <div v-for="(file , findex) in fileList"  :key="findex">-->
    <!--        <span>{{file.name}}</span>-->
    <!--      <el-icon class="margin-left text-button-hover"><Close /></el-icon>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {importItemUrl} from "@/api/url";
import {ElMessage, UploadFile, UploadFiles, UploadInstance} from "element-plus";
import {post} from "@/api/http";
import {upload, uploadByPieces} from "@/directive/uploadFilePace";
const emit=defineEmits(['uploadEnd'])
const postMethod = ref<string>('post')
const postUrl = ref<string | null>(null)
const postFileName = ref<string | null>(null)
const fileList = ref<any[]>([])
const uploadRef = ref<UploadInstance>()
const postData = ref<any>(null)
const onChangeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log("this is uploadFiles: ", uploadFiles)
}
const onRemoveFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log("this is onRemoveFile: ", uploadFiles)
}
//上传一个文件
const uploadFile = async ({url, file, fName, obj}: any) => {
  try {
    const res = await uploadByPieces(url, file, fName, obj);
    return res;
  } catch (e) {
    return e;
  }
}

/**
 * 分片上传(抛出方法)
 * 可上传多个文件
 */
const submitChunk = (url: string, fName: string, obj?: any) => {
  const objF:any={}
  if (obj){
    for (const objKey in obj) {
      objF[objKey]=obj[objKey]
    }
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const list = []
    for (let i = 0; i < fileList.value.length; i++) {
      const fileItem = fileList.value[i]
      objF['relFileName']=fileItem.name
      objF['uuid']=fileItem.uid
      objF['fileSize']=fileItem.size
      const res = await uploadFile({
        url: url,
        file: fileItem.raw,
        fName: fName,
        obj: objF
      })
      list.push(res)
    }
    resolve(list)
  })


}
/**
 * 提交上传(原生)
 * @param method 上传的方法
 * @param url 上传的地址
 * @param fName 上传的文件指定属性名称
 * @param obj 附加上传的对象
 */
const submit = (method: string, url: string, fName: string, obj?: any) => {
  postMethod.value = method
  postUrl.value = url
  postFileName.value = fName
  if (obj) {
    postData.value = obj
  }
  uploadRef.value?.submit()
}
//监听原生上传失败
const onError = (res:any) => {
  ElMessage.error(res.message)
  emit('uploadEnd')
}
//监听原生上传成功
const onSuccess = (res:any) => {
  if (res.code == 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
  emit('uploadEnd')
}
const clean = () => {
  postMethod.value = 'post'
  postUrl.value = null
  postFileName.value = null
  postData.value = null
  fileList.value = []
}
defineExpose({
  submit, clean, submitChunk
})
</script>

<style scoped>
.upload-form-box {
  width: 350px;
  height: 300px;
}

.upload-template {
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
</style>