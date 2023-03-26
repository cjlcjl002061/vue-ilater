<template>
  <div class="pc_main_box" id="mp">
    <div class="top_cjl_box">
      <!-- 批量文件上传   -->
      <div class="top-title">批量素材管理</div>

      <!-- 素材新增按钮   -->
      <div class="m_box_btn">
        <el-upload
            :show-file-list="false"
            class="upload-demo zdy_btn_main"
            name="file"
            :multiple="true"
            action="/material/uploads"
            :before-upload="previewP"
            :on-change="handleChange"
            :on-success="handleSuccess"
        >
          <el-button type="primary">
            <el-icon style="margin-right: 5px">
              <FolderChecked/>
            </el-icon>
            请选择素材文件
          </el-button>
        </el-upload>
      </div>

      <!--   素材回显区域 -->
      <div class="materials_box">
        <div class="file_sub_img" v-for="(item,index) in fileListInfos" :key="index">
          <div class="img_box_one" :style="{'background':item.bcolor}">
            <el-image
                style="width: 200px; height:200px"
                :src="materialsBaseUrl+'/fileILater/'+item.url"
                :zoom-rate="1.2"
                :preview-src-list="fileList"
                :initial-index="0"
                fit="cover"
                @click="imageClicked(materialsBaseUrl+'/fileILater/'+item.url)"
            />
          </div>
          <div class="title_and_opr">
            <p class="type_box">
              {{item.type.substring(1,item.type.length)}}
            </p>
            <div class="bottom_icon">
              <div class="title_name">
                {{item.fileOldName}}
              </div>
              <div class="opr_btn">
                <el-icon style="color:#c8c9cc" size="20"><Tools /></el-icon>
                <el-icon style="color:#e6a23c;margin-left: 5px" size="20"><Delete /></el-icon>
              </div>

            </div>

          </div>

        </div>
      </div>


      <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
        <div>
          <h1>图片上传中</h1>
          <p>成上传<span>{{ fileN }}</span> / 总共（{{ Allfiles }}）</p>
        </div>
        <template #footer>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Material"
}
</script>

<script lang="ts" setup>
import {ref} from 'vue'
import {onMounted} from "@vue/runtime-core";
import {post} from "@/api/http";
import {getAllMaterialsUrl} from "@/api/url";
const {materialsBaseUrl} = require('@/api/url')
let fileN = ref();
let Allfiles = ref();
let n = 0;
const centerDialogVisible = ref(false);
const previewP = (uploadFile: any) => {
  console.log(uploadFile);
  n = n + 1;
}

let sn = 0;
const handleSuccess = (rep: any, uploadFile: any, uploadFiles: any) => {
  Allfiles.value = n;
  sn = sn + 1;
  fileN.value = sn;
  if (sn == n) {
    console.log("n----");
    n = 0;
    sn = 0;
    setTimeout(function () {
      centerDialogVisible.value = false;
      Allfiles.value = 0;
      fileN.value = 0;
      getAllMaterials();
      /*执行查询接口*/
    }, 10)

  }
  console.log(n);
  /* console.log(rep);
   console.log(uploadFile);
   console.log(uploadFiles);*/

}
const handleChange = (uploadFile: any, uploadFiles: any) => {
  centerDialogVisible.value = true;
}
let inputSearch = ref("");
let fileList=ref<any>([]);
let fileListInfos=ref<any>([]);
/*加载所有的素材文件*/
const getAllMaterials = () => {
  let params: any = {};
  params.fileOldName = inputSearch.value;
  post({
    url: getAllMaterialsUrl,
    data: params
  }).then((res: any) => {
    if (res.code == 200) {
      fileList.value=[];
      console.log(res.result);
      res.result.forEach((item:any)=>{
        fileList.value.push(materialsBaseUrl+"/fileILater/"+item.url);
      });
      fileListInfos.value=res.result;
    } else {
    }
  })
}

const  imageClicked=(imageUrl)=>{
  console.log(imageUrl);
  console.log(fileList.value);
  let index = fileList.value.indexOf(imageUrl);// 通过点击的图片, 确定当前图片在预览图片列表中的位置, 最好做下 >= 0的校验
  console.log(index);
  let afterPicArr = fileList.value.slice(index);        // arr.slice 分割数组,不改变原数组,slice(index)返回index到数组结果的子数组 这里的目的是获取当前点击元素之后所有元素
  let beforePicArr = fileList.value.slice(0,index);     // 这里是获取当前元素之前所有元素, 刚好读不到index位置的数据
  let newImageList = afterPicArr.concat(beforePicArr);// 把这俩玩意拼在一起

  fileList.value = newImageList;             // 更新预览图片列表(preview-src-url)
}
onMounted(() => {
  getAllMaterials();
})

</script>

<style lang="scss" scoped>
.pc_main_box {
  background: #EDF2F2;
  height: 100%;
  padding: 10px 11px 5px;
  .top_cjl_box{
    background: #FFFFFF;
    border-radius: 8px;
  }
  .top-title {
    height: 60px;
    padding: 20px 20px;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
  }

  .m_box_btn {
    height: 50px;
    background: transparent;
    padding-left: 20px;
  }
  .materials_box{
    padding:20px 20px;
    background: transparent;
    /*display: flex;
    flex-direction: row;*/
    .file_sub_img{
      margin-right: 26px;
      box-shadow: 0px 3px 6px 6px #E1E9F0;
      border-radius: 4px;
      width: 200px;
      display: inline-block;
      margin-bottom: 20px;
      .img_box_one{
        background:#eeeeee;

        :deep {
          .el-image{
            display:flex;
            align-items:center;
            justify-content: center;
          }
          .el-image__inner{
            border-radius: 4px;
            width: 80px;
            height: 80px;
          }
        }

      }
      .title_and_opr {
        padding: 10px;
        .type_box{
          line-height: 1.4;
          font-size: 16px;
          font-weight: 400;
          color: #303133;
          direction: ltr;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
        }
        .bottom_icon {
          margin-top: 13px;
          line-height: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title_name{
            font-size: 12px;
            color: #999;
            line-height: 12px;
            word-break: break-all;
          }
          .opr_btn{
            width: 50%;
            padding-left: 10px;
            text-align: right;

            .el-icon:hover{
              cursor: pointer;
            }
            .el-icon:active{
              cursor: pointer;
              opacity: 0.8;
            }
          }

        }


      }
    }
  }
}
</style>