<template>
  <el-dialog
    ref="dialogRef"
    :title="innerTitle"
    v-model="dialogVisible"
    :close-on-click-modal="closeOnClickModal"
    :width="dialogWidth"
    draggable
    :before-close="cancel"

  >
    <template #title>
      <div class="dialog_title">{{innerTitle}}</div>
    </template>
    <div class="dialog__content-wrapper">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer-button"> </slot>
        <el-button
          type="primary"
          @click="onConfirm"
          v-if="confirmBtnTxt!=''"

        >{{ confirmBtnTxt }}</el-button>
         <el-button
             v-if="showCancel"
             @click="cancel"
             class="margin-right"
         >取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useLayoutStore } from "@/layouts/hooks";
import { nextTick, ref } from "vue";
export default defineComponent({
  name: "Dialog",
  emits:['onConfirm','onCancel'],
  props: {
    title: {
      type: String,
      default: "提示",
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    confirmBtnTxt:{
      type:String,
      default:'确定?'
    },
    DWidth:{
      type:String
    }
  },
  setup(props, { expose ,emit}) {
    const innerTitle = computed(() => props.title || "提示");
    const dialogRef = ref();
    const dialogVisible = ref(false);
    const loading = ref(false);
    const store = useLayoutStore();
    const _callback = ref();
    const isMobileScreen = computed(() => {
      return store.state.device === "mobile";
    });
    const dialogWidth=computed(()=>{

      if (props.DWidth){
        return props.DWidth
      }
      else {
        return  store.state.device === "mobile" ? '85%' : '45%'
      }
    });
    function show(callback: () => void) {
      dialogVisible.value = true;
      loading.value = false;
      nextTick(() => {
        const contentElement = document.querySelector(
          ".dialog__content-wrapper"
        );
        contentElement?.scrollTo({ top: 0 });
      });
      _callback.value = callback;
    }
    function cancel() {
      dialogVisible.value = false
      emit('onCancel')
    }
    function close() {
      cancel()
      loading.value = false;
    }
    function onConfirm() {
      // _callback.value = callback;
      emit('onConfirm',)
      if (_callback.value) {
        _callback.value(dialogRef.value);
      } else {
        close();
      }
    }

    function showLoading() {
      loading.value = true;
    }
    function closeLoading() {
      loading.value = false;
    }
    expose({
      show,
      close,
      showLoading,
      closeLoading,
    });
    return {
      dialogRef,
      dialogVisible,
      loading,
      isMobileScreen,
      dialogWidth,
      innerTitle,
      cancel,
      onConfirm,
      close,
      show,
      showLoading,
      closeLoading,
    };
  },
});
</script>

<style lang="scss">
.dialog__content-wrapper {
  max-height: 50vh;
  padding: 10px 5px;
  margin: -10px;
  overflow: auto;
  .base-form-container {
    padding: 5px 20px;
  }
}
.dialog_title{
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 5px 15px;
}
</style>
