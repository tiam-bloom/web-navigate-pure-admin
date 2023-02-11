<template>
  <div>
    <Header @setTitle="setTitle" @setCat="setCat" />

    <el-table
      :data="tableData"
      style="width: 97%"
      stripe
      table-layout="fixed"
      border
    >
      <el-table-column type="index" width="50" :index="1" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="icon" label="图标" width="120" />
      <el-table-column prop="url" label="地址" width="120" />
      <el-table-column prop="description" label="描述" width="460" />
      <el-table-column
        prop="category"
        label="分类"
        width="100"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="openDialog(scope.$index, scope.row)"
            :icon="Edit"
            >Edit</el-button
          >
          <el-popconfirm title="Are you sure to delete this?">
            <template #reference>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :icon="Delete"
                >Delete</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Dialog
      ref="dialog"
      title="Update web bookmarks"
      @handleConfirm="handleEdit"
    />
  </div>
</template>

<script lang="ts" setup>
import axios from "@/utils/http/axios";
import { Edit, Delete } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import Dialog from "./Dialog.vue";
import Header from "./Header.vue";

const tableData_ = ref();
axios.get("/listCompleteSiteInfos").then(res => {
  tableData_.value = res.data.data;
});

const title = ref("");
function setTitle(val: string) {
  title.value = val;
}
const category = ref("");
function setCat(val: string) {
  category.value = val;
}
// 搜索逻辑
const tableData = computed(() => {
  // 当都为空时返回全部数据
  if (!title.value && !category.value) return tableData_.value;

  return tableData_.value.filter(item => {
    return (
      (isTest(item.description, title.value) ||
        isTest(item.title, title.value)) &&
      isTest(item.categoryId + "", category.value)
    );
  });
  /**
   * 判断item中是否包含goal
   * @param item
   * @param goal
   */
  function isTest(item, goal: number | string): boolean {
    if (typeof goal == "string") goal = goal.toLocaleLowerCase().trim();
    if (!goal) return true;
    return item?.toLocaleLowerCase().includes(goal);
  }
});

const dialog = ref();
interface SiteInfo {
  title: string;
  url: string;
  description: string;
  category: string;
  categoryId: number;
}
// 打开对话框
const openDialog = (index: number, row: SiteInfo) => {
  console.log(index, { ...row });

  dialog.value.siteInfo.title = row.title;
  dialog.value.siteInfo.url = row.url;
  dialog.value.siteInfo.description = row.description;
  dialog.value.siteInfo.category = row.categoryId;
  dialog.value.dialogVisible = true;
};

function handleEdit() {
  console.log(dialog.value.siteInfo);
  dialog.value.dialogVisible = false;
}

function handleDelete(index: number, row: object) {
  console.log(index, row);
}
</script>

<style>
.el-table .cell {
  white-space: nowrap;
}
</style>
