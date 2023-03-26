<template>
  <vue-final-modal v-model="showFDialog"
                   class="dkl"
                   classes="modal-container"
                   content-class="modal-content"
                   :z-index-auto="true"
                   :z-index-base="2000"
                   :drag="true"
                   :esc-to-close="false"
                   :click-to-close="false"
                   :resize="true"
                   :attach="attachDemo"
                   :max-width="Infinity"
                   :max-height="Infinity"
                   :min-width="mw"
                   :min-height="mh"
                   drag-selector=".modal__title"
  >
    <a class="modal__close" @click="closeFDialog">
      <n-icon size="28">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
          <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              fill="currentColor"></path>
        </svg>
      </n-icon>
    </a>
    <span class="modal__title">{{ modelTitle }}</span>
    <div class="modal__content" v-loading="cLoading">
      <slot name="content"></slot>
    </div>
    <div class="modal__action">
      <slot name="action">
        <el-button type="primary" @click="onConfirm">确认</el-button>
        <el-button @click="closeFDialog">取消</el-button>
      </slot>
    </div>
  </vue-final-modal>

</template>

<script lang="ts">
import {computed, h, onMounted, PropType, reactive, ref, shallowReactive, toRefs} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {$vfm, VueFinalModal, ModalsContainer} from '@/utils/vueFinalModal/VueFinalModal.esm.js'
import {defineComponent} from "@vue/runtime-core";
import $ from "jquery";

export default defineComponent({
  name: 'FDialog',
  inheritAttrs: false,
  components: {
    VueFinalModal,
    // eslint-disable-next-line vue/no-unused-components
    ModalsContainer
  },
  emits: ['closeModal','confirm'],
  props: {
    attachDemo: {
      type: String,
    },
    mw: {
      type: Number,
      default: 400
    },
    mh: {
      type: Number,
      default: 400
    },
    modelTitle: {
      type: String,
      default:"FDialog"
    },
    width:{
      type:String,
      default:"45%"
    },
    height:{
      type:String,
      default:"66%"
    },
    cLoading:{
      type:Boolean,
      default:false
    }
  },
  setup(props, {emit,expose}) {
    const closeModalP = () => {
      emit("closeModal");
    }
    const showFDialog=ref<boolean>(false)
    function openFDialog(){
      // console.log("this is openFDialog: ",)
      $(".dkl").find(".vfm__content.modal-content").css({
        "width": props.width,
        "height": props.height
      })
      showFDialog.value=true
    }
    function closeFDialog(){
      emit("closeModal");
      showFDialog.value=false
    }

    const onConfirm = () => {
      emit("confirm");
      // showFDialog.value=false
    }
    expose({
      openFDialog,
      closeFDialog,
    })
    return {
      closeModalP,
      showFDialog,
      closeFDialog,
      openFDialog,
      onConfirm
    }

  }
})
</script>

<style lang="scss" scoped>
::v-deep .main-section {
  position: relative !important;
}

.main-section .kll {
  width: 100% !important;
  height: 100% !important;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 99%;
  margin: 0 1rem;
  padding: 1rem 0rem 1rem 0rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.26rem;
  font-weight: 700;
  padding: 0px 1rem 0.35rem;
  user-select:none;
}

.modal__title:hover {
  cursor: move;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  padding: 1.25rem 1.35rem 1.25px;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 1rem 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.modal__close:hover {
  cursor: pointer;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>