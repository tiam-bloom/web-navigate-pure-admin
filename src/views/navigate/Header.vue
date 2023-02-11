<template>
  <div>
    <el-input
      v-model="title"
      size="large"
      style="width: 400px"
      placeholder="Search by title or desc"
      :prefix-icon="Search"
    />
    <el-select
      v-model="category"
      class="m-2"
      placeholder="Category"
      size="large"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button
      type="success"
      size="large"
      :icon="CirclePlus"
      @click="openDialog"
      >添加网站</el-button
    >
    <Dialog
      ref="dialog"
      title="add webmark"
      @handleConfirm="handleInsert"
      :categories="options"
    />
  </div>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from "@element-plus/icons-vue";
import Dialog from "./Dialog.vue";
import { ref, watch } from "vue";
import axios from "@/utils/http/axios";

const emit = defineEmits(["setTitle", "setCat"]);

const title = ref("");
watch(title, val => { 
  emit("setTitle", val);
});

const category = ref("");
watch(category, val => {
  emit("setCat", val);
});

// 获取分类列表
const options = ref();
axios.get("/listCategories").then(res => {
  options.value = res.data.data.map(
    (item: { id: number; category: string }) => {
      return {
        value: item.id,
        label: item.category
      };
    }
  );
});

const dialog = ref();
// 打开对话框
const openDialog = () => {
  dialog.value.dialogVisible = true;
};
interface SiteInfo {
  title: string;
  url: string;
  description: string;
  category: string;
}
function handleInsert(siteInfo: SiteInfo) {
  // 表单输入的数据
  console.log(siteInfo);

  dialog.value.dialogVisible = false;
}
</script>

<style lang="less" scoped></style>
