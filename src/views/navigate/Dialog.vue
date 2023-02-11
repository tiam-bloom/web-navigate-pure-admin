<template>
  <el-dialog v-model="dialogVisible" :title="title" append-to-body>
    <el-form :model="siteInfo">
      <el-form-item label="网站标题">
        <el-input
          v-model="siteInfo.title"
          autocomplete="on"
          maxlength="15"
          autofocus
          clearable
        />
      </el-form-item>
      <el-form-item label="网站地址">
        <el-input
          type="url"
          v-model="siteInfo.url"
          autocomplete="url"
          clearable
        />
      </el-form-item>
      <el-form-item label="网站类别">
        <el-select
          filterable
          allow-create
          default-first-option
          v-model="siteInfo.category"
          placeholder="Please select a category"
        >
          <el-option
            v-for="item in categories"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input
          v-model="siteInfo.description"
          type="textarea"
          placeholder="Please input description"
          autosize
          :show-word-limit="true"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button @click="$emit('handleConfirm', siteInfo)" type="primary"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from "@/utils/http/axios";
const dialogVisible = ref(false);
const siteInfo = reactive({
  title: "",
  url: "",
  category: "",
  description: ""
});

interface Props {
  title: string;
  //   categories: Array<{ label: string; value: string }>;
}
// 只读属性
defineProps<Props>();

// 获取分类列表
const categories = ref();
axios.get("/listCategories").then(res => {
  categories.value = res.data.data.map(
    (item: { id: number; category: string }) => {
      return {
        value: item.id,
        label: item.category
      };
    }
  );
});

// 暴露出去父组件可以拿到 dialogVisible的数据
defineExpose({
  dialogVisible,
  siteInfo
});
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 800px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
