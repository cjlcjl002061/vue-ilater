<template>
  <div class="pc_myInspect" id="mp">
    <!-- 搜索条件区   -->
    <div class="isp_box" :class="[isMore?'isMore':'']">
      <div class="__sub_box_div">
        <div class="left_box_i">
          <!--  默认显示的条件        -->
          <div class="con_one">
            <div class="btn-fok_more">
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="btn-fok_more" v-if="isMore">
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="btn-fok_more" v-if="isMore">
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="con_item">
                <label class="con_label">自查批次</label>
                <el-select v-model="value" clearable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

          </div>
          <div class="con_btn_box">
            <el-button
                type="success"
                size="small"
                icon="Upload">搜索
            </el-button>
            <el-button
                type="warning"
                size="small"
                icon="Upload">重置
            </el-button>

          </div>
        </div>
        <div class="right-box-more">
          <p style="margin: 0px" @click="onChangeH">
            更多条件
            <el-icon>
              <arrow-down-bold/>
            </el-icon>
          </p>
        </div>
      </div>
    </div>
    <!-- 内容区-表格   -->
    <div class="content_box_sections" :class="[isMore?'isMore':'']">
      <div class="data-table-box">
        <!-- top-tips       -->
        <div class="data-top_box">
          <p class="data-top_box_p lfl_tips">自查任务列表</p>
          <p class="data-top_box_p rfl-Btn">
            <el-icon>
              <refresh-right/>
            </el-icon>
            刷新列表
          </p>
        </div>

        <div class="test-svg">
          <p>测试svg</p>
          <n-icon size="800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

              <g id="minder_node3" class="zx-node" transform="matrix( 1 0 0 1 258 46 )">
                <g id="node_text3" class="x-text-g">
                  <g id="node_outline3">
                    <path id="kity_path_110" fill="#FFA024" stroke="none"
                          d="M0,-98L500,-98A98,98,0, 0,1,500,98L0,98A98,98,0, 0,1,0,-98"></path>
                    <path id="kity_path_109" fill="none" stroke="#333333"
                          d="M0,-98L500,-98A98,98,0, 0,1,500,98L0,98A98,98,0, 0,1,0,-98" stroke-width="3"></path>
                  </g>
                  <foreignObject id="kity_foreignObject_107" xmlns="http://www.w3.org/2000/svg" width="500" height="168"
                                 style="pointer-events: none; position: fixed; contain: layout; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(0, 0, 0); font-size: 18px; font-weight: normal;"
                                 x="0" y="-84" class="">
                    <div
                        style="width: 100%; height: 100%; overflow: visible; cursor: text; background-color: rgb(255, 160, 36);"
                        class="km-text-editor text-autowrap"></div>
                    <div xmlns="http://www.w3.org/1999/xhtml" class="fo-text text-autowrap"
                         style="pointer-events: none; overflow: visible;"><p>
                      部分2嘎是根据公司电话根号三撒个谎结构化sad规划局按施工队哈撒给的哈说过话的撒黄金国际化是的噶或三个大奖是广东省多个哈撒给多哈水果的哈说过的话建安施工队阿萨德噶是极好的感受大是的噶十多个俺是个大红色高大上给大家送蛋糕按设计稿大好时光大会是的噶就是更大的阿萨德噶就是大哥按实际的感受大街上高大上的感觉阿萨德噶时间的好感度十多个驾驶</p>
                    </div>
                  </foreignObject>
                </g>
              </g>
            </svg>
          </n-icon>

        </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MyInspect"
}
</script>
<script lang="ts" setup>
import {ref} from "vue"
import {onMounted, nextTick} from "@vue/runtime-core";
import $ from 'jquery'

let isMore = ref(false);
const onChangeH = () => {
  isMore.value ? isMore.value = false : isMore.value = true;
}
let options = ref([
  {
    value: '选项1',
    label: '黄金糕',
  },
  {
    value: '选项2',
    label: '双皮奶',
  },
  {
    value: '选项3',
    label: '蚵仔煎',
  },
  {
    value: '选项4',
    label: '龙须面',
  },
  {
    value: '选项5',
    label: '北京烤鸭',
  },
]);
let value = ref()

onMounted(() => {
})

</script>

<style scoped lang="scss">
.pc_myInspect {
  height: 100%;
}

.isp_box {
  height: 92px;
  background: transparent;
  padding: 16px;

  .__sub_box_div {
    background: #FFFFFF;
    height: 100%;
    border-radius: 8px 8px 8px 8px;
    display: flex;
    flex-direction: row;

    .left_box_i {
      //width: calc(100% - 150px);
      display: flex;
      flex-direction: row;
      padding-left: 10px;
      padding-top: 10px;

      .con_one {
        width: auto;
        height: 100%;
      }

      .con_btn_box {
        width: 150px;
        height: 100%;
        padding-top: 14px;
      }

    }

    .right-box-more {
      width: 150px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      padding-top: 16px;

      p {
        background: #F5F9FF;
        border-radius: 10px;
        height: 30px;
        line-height: 30px;
        padding: 0px 15px;

        &:hover {
          cursor: pointer;
        }

        &:active {
          opacity: 0.6;
        }

        i {
          transform: rotate(0deg);
        }
      }
    }
  }
}

.isp_box.isMore {
  height: 196px;

  .__sub_box_div {
    .right-box-more {
      i {
        transform: rotate(180deg);
        top: 2px;
      }
    }
  }
}

.content_box_sections.isMore {
  height: calc(100% - 196px);
}

.content_box_sections {
  height: calc(100% - 92px);
  padding: 0px 16px 16px;
  background: transparent;

  .data-table-box {
    height: 100%;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;

    .data-top_box {
      height: 60px;
      width: 100%;
      background: #FFFFFF;
      position: relative;

      &:before {
        content: "";
        width: 4px;
        height: 24px;
        background: #01B786;
        border-radius: 0px 4px 4px 0px;
        position: absolute;
        top: 20px;
        left: 0px;
        z-index: auto;
      }

      .data-top_box_p {
        margin: 0px;
      }

      .lfl_tips {
        width: 150px;
        position: absolute;
        top: 23px;
        left: 12px;
        font-size: 18px;
        font-weight: 500;
        color: #172B34;
        line-height: 18px;
      }

      .rfl-Btn {
        position: absolute;
        right: 20px;
        top: 20px;

      }
    }

    .test-svg {
      position: relative;

      #canvas {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 230px;
      }
    }
  }

}

.btn-fok_more {
  padding: 8px 10px;

  .con_item {
    display: inline-block;
    margin-right: 18px;

    .con_label {
      margin-right: 5px;
      width: 68px;
      text-align: right;
    }
  }
}
</style>