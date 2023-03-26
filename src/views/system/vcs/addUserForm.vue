<template>
   <div class="vcs_box vcs_addUser">
     <!--      提示区  -->
     <div style="padding: 0px 0px">
       <n-alert title="操作提示：">
         <template #icon>
           <n-icon :size="18">
             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
               <path
                   d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"
                   fill="currentColor"></path>
             </svg>
           </n-icon>
         </template>
         1、请按照用户信息真实填写<br>

       </n-alert>
     </div>
     <div class="user_info_box">
       <el-form
           ref="ruleFormRef"
           :model="ruleForm"
           :rules="rules"
           label-width="120px"
           class="demo-ruleForm"
           :size="formSize"
           status-icon
       >
         <el-form-item label="姓名" prop="name">
           <el-input v-model="ruleForm.name" placeholder="请输入姓名"/>
         </el-form-item>
         <el-form-item label="账号" prop="account">
           <el-input v-model="ruleForm.account"  placeholder="请输入账号"/>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input v-model="ruleForm.password"  placeholder="请输入密码"/>
         </el-form-item>
         <el-form-item label="性别" prop="region">
           <el-select v-model="ruleForm.region" placeholder="请选择性别">
             <el-option label="男" value="1" />
             <el-option label="女" value="2" />
           </el-select>
         </el-form-item>
         <el-form-item label="其他备注" prop="desc">
           <el-input v-model="ruleForm.desc" type="textarea" />
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm(ruleFormRef)">
             提交
           </el-button>
           <el-button @click="resetForm(ruleFormRef)">重置</el-button>
         </el-form-item>
       </el-form>
     </div>

   </div>
</template>

<script lang="ts">
export default {
  name: "AddUserForm"
}
</script>

<script lang="ts" setup>
import {defineComponent} from "@vue/runtime-core";
import $ from "jquery";
import {computed, h, onMounted, reactive, ref, shallowReactive, unref} from "vue";
import {ElLoading, FormInstance} from "element-plus";
import {addUserInfo, getAllUserUrl} from "@/api/url";
import {post} from "@/api/http";
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const props=defineProps({
})
const emit=defineEmits(['doRefreshTable','closeAddUserModal'])
const ruleForm = reactive({
  name: 'Hello',
  account: '',
  password: '',
  region: '',
  desc: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户姓名！', trigger: 'blur' },
    { min: 3, max: 5, message: '姓名长度允许为3-5个字符', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请选择用户性别！',
      trigger: 'change',
    },
  ],
  account:[
    { required: true, message: '请输入账号！', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码！', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      addUserReq();
    } else {
      console.log('error submit!', fields)
    }
  })
}

/*发送请求-新增用户*/
const addUserReq=()=>{
  console.log(ruleForm);
  post({
    url: addUserInfo,
    data: ruleForm
  }).then((res: any) => {
    if(res.success){
      emit("doRefreshTable", "");
      emit("closeUserModal", "");
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

</script>

<style scoped lang="scss">

.vcs_addUser{
  .user_info_box{
    padding-top: 30px;
  }
}
</style>