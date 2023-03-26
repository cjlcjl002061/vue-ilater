<template>
  <!--  上传文件  -->
  <Dialog ref="refDialog" @onConfirm="onConfirmUpload"
          @onCancel="onCancel"
          :showCancel="true"
          :DWidth="isDoubleUpload?'55%':'45%'"
          title="上传文件" confirmBtnTxt="开始上传">

    <template #content>
      <slot name="before" class="content_before"></slot>
      <div style="display: flex">

        <el-upload
            ref="uploadRef"
            v-loading="isloading"
            class="file_upload"
            :class="isDoubleUpload?'double_file_upload':''"
            drag
            :multiple="!isSingle"
            :file-list="fileList1"
            method="post"
            :action="'https://test.snibe.com/hgCy/api/uploadTest'"
            :on-error="onErrorUpload"
            :on-success="onSuccess"
            :auto-upload="false"
            :on-change="onChangeF1"

        >
          <div class="uploadTip">
            {{ uploadTip }}
          </div>

          <el-icon class="el-icon--upload upload_icon">
            <svg id="点击上传" xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48">
              <path id="路径_972" data-name="路径 972"
                    d="M478.7,1891.509h-2.883v-2.044a4.357,4.357,0,0,0-4.368-4.335H469.5a1.131,1.131,0,0,0-.172-.012h-11.12a1.863,1.863,0,0,1-1.872-1.858v-.644a1.207,1.207,0,0,0-.054-.358,1.15,1.15,0,0,0,.029-.261,4.357,4.357,0,0,0-4.368-4.335H431.438A4.357,4.357,0,0,0,427.07,1882v39.329a4.357,4.357,0,0,0,4.368,4.335H478.7a4.357,4.357,0,0,0,4.368-4.335v-25.48A4.357,4.357,0,0,0,478.7,1891.509Zm-41.273,21.142v8.673a1.863,1.863,0,0,1-1.872,1.858h-4.119a1.862,1.862,0,0,1-1.872-1.858V1882a1.863,1.863,0,0,1,1.872-1.858h20.506a1.863,1.863,0,0,1,1.872,1.858,1.207,1.207,0,0,0,.054.358,1.151,1.151,0,0,0-.029.261v.644a4.357,4.357,0,0,0,4.368,4.335h7.428a1.147,1.147,0,0,0,.172.012h5.641a1.863,1.863,0,0,1,1.872,1.858v2.044H441.785a4.357,4.357,0,0,0-4.368,4.335v16.636A1.124,1.124,0,0,0,437.429,1912.651Zm43.145,8.673a1.863,1.863,0,0,1-1.872,1.858H439.5a4.317,4.317,0,0,0,.427-1.858v-10.442a1.12,1.12,0,0,0-.013-.171v-14.867a1.863,1.863,0,0,1,1.872-1.858H478.7a1.863,1.863,0,0,1,1.872,1.858Z"
                    transform="translate(-427.07 -1877.66)" fill="var(--el-color-primary)"/>
              <path id="路径_973" data-name="路径 973" d="M1033.82,2088.54a1.454,1.454,0,0,0,.419,0Z"
                    transform="translate(-988.348 -2072.215)" fill="var(--el-color-primary)"/>
              <path id="路径_974" data-name="路径 974"
                    d="M869.09,2182.657l.028.027a1.421,1.421,0,0,1,.118.134l.022.021A1.3,1.3,0,0,0,869.09,2182.657Zm-.087-.077a1.186,1.186,0,0,0-.123-.09A1.489,1.489,0,0,1,869,2182.58Z"
                    transform="translate(-834.459 -2158.922)" fill="var(--el-color-primary)"/>
              <path id="路径_975" data-name="路径 975"
                    d="M791.091,2188.94a1.487,1.487,0,0,1-1.076.439,1.553,1.553,0,0,1-1.076-.439l-3.894-3.894v12.41a1.515,1.515,0,1,1-3.031,0v-12.44l-3.925,3.925a1.43,1.43,0,0,1-1.061.439,1.552,1.552,0,0,1-1.076-.439,1.509,1.509,0,0,1,0-2.137l6.5-6.5a1.507,1.507,0,0,1,1.593-.349l.006,0,.065.027c.021.008.041.018.061.027l.016.007.054.029a.4.4,0,0,1,.044.026.626.626,0,0,1,.06.037,1.489,1.489,0,0,1,.123.09l.059.05.028.027.027.027a1.446,1.446,0,0,1,.118.134l.022.021,6.36,6.346A1.509,1.509,0,0,1,791.091,2188.94Z"
                    transform="translate(-750.125 -2158.985)" fill="var(--el-color-primary)"/>
            </svg>
          </el-icon>
          <div>点击或拖拽上传</div>
          <template #tip>
            <div class="el-upload__tip">
              <slot name="tip">
                <span v-if="fileType">文件类型为：{{ fileType }}</span>
              </slot>
            </div>
          </template>
        </el-upload>
        <slot name="before2" class="content_before"></slot>
        <el-upload
            v-if="isDoubleUpload"
            ref="uploadRef2"
            v-loading="isloading"
            class="file_upload file_upload2"
            :class="isDoubleUpload?'double_file_upload':''"
            drag
            :multiple="!isSingle"
            :file-list="fileList2"
            method="post"
            :action="'https://test.snibe.com/hgCy/api/uploadTest'"
            :on-error="onErrorUpload"
            :on-success="onSuccess"
            :auto-upload="false"
            :on-change="onChangeF2"
        >
          <div class="uploadTip">
            {{ uploadTip2 }}
          </div>
          <el-icon class="el-icon--upload upload_icon">
            <svg id="点击上传" xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48">
              <path id="路径_972" data-name="路径 972"
                    d="M478.7,1891.509h-2.883v-2.044a4.357,4.357,0,0,0-4.368-4.335H469.5a1.131,1.131,0,0,0-.172-.012h-11.12a1.863,1.863,0,0,1-1.872-1.858v-.644a1.207,1.207,0,0,0-.054-.358,1.15,1.15,0,0,0,.029-.261,4.357,4.357,0,0,0-4.368-4.335H431.438A4.357,4.357,0,0,0,427.07,1882v39.329a4.357,4.357,0,0,0,4.368,4.335H478.7a4.357,4.357,0,0,0,4.368-4.335v-25.48A4.357,4.357,0,0,0,478.7,1891.509Zm-41.273,21.142v8.673a1.863,1.863,0,0,1-1.872,1.858h-4.119a1.862,1.862,0,0,1-1.872-1.858V1882a1.863,1.863,0,0,1,1.872-1.858h20.506a1.863,1.863,0,0,1,1.872,1.858,1.207,1.207,0,0,0,.054.358,1.151,1.151,0,0,0-.029.261v.644a4.357,4.357,0,0,0,4.368,4.335h7.428a1.147,1.147,0,0,0,.172.012h5.641a1.863,1.863,0,0,1,1.872,1.858v2.044H441.785a4.357,4.357,0,0,0-4.368,4.335v16.636A1.124,1.124,0,0,0,437.429,1912.651Zm43.145,8.673a1.863,1.863,0,0,1-1.872,1.858H439.5a4.317,4.317,0,0,0,.427-1.858v-10.442a1.12,1.12,0,0,0-.013-.171v-14.867a1.863,1.863,0,0,1,1.872-1.858H478.7a1.863,1.863,0,0,1,1.872,1.858Z"
                    transform="translate(-427.07 -1877.66)" fill="var(--el-color-primary)"/>
              <path id="路径_973" data-name="路径 973" d="M1033.82,2088.54a1.454,1.454,0,0,0,.419,0Z"
                    transform="translate(-988.348 -2072.215)" fill="var(--el-color-primary)"/>
              <path id="路径_974" data-name="路径 974"
                    d="M869.09,2182.657l.028.027a1.421,1.421,0,0,1,.118.134l.022.021A1.3,1.3,0,0,0,869.09,2182.657Zm-.087-.077a1.186,1.186,0,0,0-.123-.09A1.489,1.489,0,0,1,869,2182.58Z"
                    transform="translate(-834.459 -2158.922)" fill="var(--el-color-primary)"/>
              <path id="路径_975" data-name="路径 975"
                    d="M791.091,2188.94a1.487,1.487,0,0,1-1.076.439,1.553,1.553,0,0,1-1.076-.439l-3.894-3.894v12.41a1.515,1.515,0,1,1-3.031,0v-12.44l-3.925,3.925a1.43,1.43,0,0,1-1.061.439,1.552,1.552,0,0,1-1.076-.439,1.509,1.509,0,0,1,0-2.137l6.5-6.5a1.507,1.507,0,0,1,1.593-.349l.006,0,.065.027c.021.008.041.018.061.027l.016.007.054.029a.4.4,0,0,1,.044.026.626.626,0,0,1,.06.037,1.489,1.489,0,0,1,.123.09l.059.05.028.027.027.027a1.446,1.446,0,0,1,.118.134l.022.021,6.36,6.346A1.509,1.509,0,0,1,791.091,2188.94Z"
                    transform="translate(-750.125 -2158.985)" fill="var(--el-color-primary)"/>
            </svg>
          </el-icon>
          <div>点击或拖拽上传</div>
          <template #tip>
            <div class="el-upload__tip">
              <slot name="tip2">
                <span v-if="fileType">文件类型为：{{ fileType }}</span>
              </slot>
            </div>
          </template>
        </el-upload>
        <slot name="after"></slot>
      </div>
    </template>

  </Dialog>
</template>
<!--<script lang="ts">-->
<!--import {defineComponent} from "vue";-->
<!--export default defineComponent({-->
<!--  name: "Dialog"-->
<!--})-->
<!--</script>-->
<script lang="ts">
import {ElMessage, UploadFile, UploadFiles, UploadInstance, UploadUserFile} from "element-plus";
import {defineComponent, reactive, ref} from "vue";
import {post} from "@/api/http";
import {DialogType} from "@/components/types";
import {onMounted} from "@vue/runtime-core";

export default defineComponent({
  name: 'uploadDialog',
  emits: ["onConfirmUpload", "onCancelUpload"],
  props: {
    isDoubleUpload: {type: Boolean},
    postUrl: {type: String, required: true},
    others: {type: Object},
    fileType: {type: Array},
    fileSize: {type: Number},
    fileNum: {type: Number},
    uploadTip: {type: String},
    uploadTip2: {type: String}
  },
  setup(props, {expose, emit}) {
    const durationTime = ref<number>(3000)
    const uploadRef = ref<UploadInstance>()
    const uploadRef2 = ref<UploadInstance>()
    const isloading = ref<boolean>(false)
    const fileList1 = ref<UploadUserFile[]>([])
    const fileList2 = ref<UploadUserFile[]>([])
    const refDialog = ref<DialogType>()
    const isSingle = ref<boolean>(false)
    let dialogForm =
        reactive({
          id: null,
          cname: null,
          ename: null,
          goodsKind: null,
          element: null,
          useFor: null,
        })
    let allFileList: any[];
    allFileList = [];

    function getFileType(name: string) {
      return name.slice(name.lastIndexOf('.') + 1, name.length)
    }

    function onSuccess(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
      console.log("this is onSuccess: ", onSuccess)
    }

    function onChangeF1(uploadFile: any, Files: any) {
      onChange(uploadFile, Files, uploadRef, fileList1)
    }

    function onChangeF2(uploadFile: any, Files: any) {
      onChange(uploadFile, Files, uploadRef2, fileList2)
    }

    function onChange(uploadFile: any, Files: any, thisUploadRef: any, fileList: any) {
      // console.log("this is uploadFile: ",uploadFile)
      if (props.fileNum) {
        const num = props.fileNum
        if (Files.length >= num + 1) {
          ElMessage({
            message: "可上传文件数量：" + props.fileNum,
            grouping: true,
            type: "warning",
            duration: durationTime.value
          })
          Files.pop()
          // setTimeout(() => {
          //   thisUploadRef.value?.clearFiles()
          // }, 500)
          return
        }
      }
      if (props.fileType) {
        let isFalseType: boolean = false
        for (let i: number = 0; i < props.fileType.length; i++) {
          let fileTypeItem: any = props.fileType[i]
          if (getFileType(uploadFile.name).toLocaleLowerCase().replace('.', '')
              == fileTypeItem.toLocaleLowerCase().replace('.', '')) {
            isFalseType = false
            break
          } else {
            isFalseType = true
          }
        }
        if (isFalseType) {
          // console.log("this is Files: ",Files)
          // console.log("this is fileList.value: ",fileList.value)
          Files.pop()
          // fileList.value?.pop()
          setTimeout(()=>{
            ElMessage({
              showClose: true,
              message: "文件格式错误："+uploadFile.name,
              grouping: true,
              type: "warning",
              duration: durationTime.value
            })
          },30)
        }
      }
      allFileList = Files
    }

    //isDouble==false
    function postFileForEach() {
      return new Promise(async (resolve, reject) => {
        let okList: any = []
        let errorList: any = []
        for (const uploadFile of allFileList) {
          const index = allFileList.indexOf(uploadFile);
          await uploadFileList(uploadFile, index).then((res: any) => {
            if (res.success) {
              okList.push(res)
            } else {
              errorList.push(res)
            }
          })
        }
        resolve({
          okList: okList,
          errorList: errorList
        })
      })
    }

    function onConfirmUpload() {
      if (isloading.value==true){
        ElMessage({
          message: "文件正在上传，请勿重复点击!",
          grouping: true,
          type: "warning",
          duration: durationTime.value
        })
        return;
      }
      if (props.isDoubleUpload) {
        if (fileList1.value?.length > 0 && fileList2.value?.length > 0) {
          // console.log("this is fileList1.value: ",fileList1.value)
          // console.log("this is fileList2.value: ",fileList2.value)
          let param = new FormData()
          const ciFile: any = fileList1.value
          const fFile: any = fileList2.value
          console.log("this is ciFile: ", ciFile)
          console.log("this is fFile: ", fFile)
          param.append('ciFile', ciFile[0].raw)
          param.append('invoiceFile', fFile[0].raw)
          post({
            url: props.postUrl,
            data: param,
          }).then((res: any) => {
            emit('onConfirmUpload', res)
            if (res.success == true) {

              ElMessage({
                message: "文件上传成功",
                grouping: true,
                type: "success",
                duration: durationTime.value
              })
            } else {
              ElMessage({
                message: "文件上传失败!" + res.message,
                grouping: true,
                type: "error",
                duration: durationTime.value
              })
            }
          }).catch(console.log)
          return
        } else {
          allFileList = []
        }
      }
      if (allFileList.length > 0) {
        isloading.value = true
        postFileForEach().then((res: any) => {
          // console.log("this is res: ",res)
          isloading.value = false
          if (res.errorList && res.errorList.length > 0) {
            getErrorUpload(res.errorList)
          }
          if (res.okList && res.okList.length > 0) {
            getSuccessUpload(res.okList)
          }
          close()
          emit('onConfirmUpload', res)

        })
      } else {
        ElMessage({
          message: "请先上传文件",
          grouping: true,
          type: "warning",
          duration: durationTime.value
        })
      }
    }

    function getSuccessUpload(list: any) {
      let addCount = 0
      let updateCount = 0
      if (list[0].result.length == 2) {
        for (let i = 0; i < list.length; i++) {
          addCount += list[i].result[0]
          updateCount += list[i].result[1]
        }
        ElMessage({
          message: "文件新增：" + addCount + "条；更新" + updateCount + "条！",
          grouping: true,
          type: "success",
          duration: durationTime.value
        })
      } else {
        ElMessage({
          message: "文件上传成功数量：" + list.length,
          grouping: true,
          type: "success",
          duration: durationTime.value
        })
      }

    }

    function getErrorUpload(list: any) {
      console.log("this is error: ", list)
      for (let i = 0; i < list.length; i++) {

        if (list[i].code==500){
          console.log("this is fileList1  : ",fileList1.value)
          let errorFileName=''
          if (fileList1.value[list[i].result]){
            errorFileName=fileList1.value[list[i].result].name
          }
          setTimeout(()=>{
            ElMessage({
              message: "文件上传失败!" + errorFileName,
              grouping: true,
              type: "error",
              duration: durationTime.value
            })
          },0)
        }else {
          setTimeout(()=>{
            ElMessage({
              message: "文件上传失败,请联系管理员" ,
              grouping: true,
              type: "error",
              duration: durationTime.value
            })
          },0)
        }


      }
    }

    function onErrorUpload(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) {
      console.log("this is error: ", error)
      console.log("this is uploadFile: ", uploadFile)
      console.log("this is uploadFiles: ", uploadFiles)
    }

    function onCancel() {
      if (isloading.value==true){
        ElMessage({
          message: "转为后台上传文件，请耐心等待",
          grouping: true,
          type: "warning",
          duration: durationTime.value
        })
      }
      allFileList = [];
      fileList1.value = []
      fileList2.value = []
      emit('onCancelUpload')
      isloading.value = false
    }

    function open() {
      refDialog.value?.show(() => {
      })
    }

    function close() {
      refDialog.value?.close()
    }

    function uploadFileList(uploadFile: any, index: any) {
      return new Promise((resolve, reject) => {
        let param = new FormData()
        if (props.others) {
          let ob = props.others
          for (let i in props.others) {
            param.append(i, ob[i])
          }
        }
        param.append('files', uploadFile.raw)
        param.append('index', index)
        post({
          url: props.postUrl,
          data: param,
        }).then((res: any) => {
          resolve(res)
          // if (res.success == true) {
          //   console.log("this is res.success: ",res)
          //   ElMessage({
          //     message: "文件上传成功!"+res.message,
          //     grouping: true,
          //     type: "success",
          //     duration: 200durationTime.value0
          //   })
          // } else {
          //   ElMessage({
          //     message: "文件上传失败"+res.message,
          //     grouping: true,
          //     type: "error",
          //     duration: durationTime.value
          //   })
          // }

        }).catch(console.log)
      })
    }

    onMounted(() => {
      if (props.fileNum) {
        const num = props.fileNum
        if (num == 1) {
          isSingle.value = true
        }
      }
    })
    expose({
      open,
      close,

    })
    return {
      uploadRef,
      uploadRef2,
      isloading,
      fileList1,
      fileList2,
      refDialog,
      isSingle,
      dialogForm,
      allFileList,
      getFileType,
      onSuccess,
      onChangeF1,
      onChangeF2,
      onChange,
      postFileForEach,
      onConfirmUpload,
      onErrorUpload,
      onCancel,
      open,
      close,
      uploadFileList,
      getSuccessUpload
    }
  }
})


</script>

<style scoped>

:deep(.dialog__content-wrapper) {
  display: flex;
}

.file_upload {
  width: 360px;
  margin: 0 auto;

}

.double_file_upload {
  display: inline-block;
  /*margin: 0 20px;*/
  /*margin-bottom: 30px;*/
  float: left;
  /*margin-right: 3%;*/
}

.uploadTip {
  position: absolute;
  left: 40%;
  top: 5px;
}

.file_upload2 {
  float: left;
  margin-left: 3%;
}
</style>