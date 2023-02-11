<template>
  <div>
    <el-input
      v-model="keywords"
      size="large"
      style="width: 400px"
      placeholder="Please Input ID or Category Name"
      :prefix-icon="Search"
    />

    <el-button
      type="success"
      size="large"
      class="m-2"
      :icon="CirclePlus"
      @click="handleInsert"
      >添加分类</el-button
    >
    <el-table :data="tableData" style="width: 97%" stripe border>
      <el-table-column prop="id" label="ID" width="180" align="center" />
      <el-table-column prop="category" label="分类名" align="center" />
      <el-table-column label="操作" align="center" width="300">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            :icon="Edit"
            >Edit</el-button
          >
          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete"
                >Delete</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import axios from "@/utils/http/axios";
import { ref, computed } from "vue";
import { Search, Edit, Delete, CirclePlus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const tableData_ = ref();

axios.get("/listCategories").then(res => {
  console.log(res.data);
  tableData_.value = res.data.data;
});
const keywords = ref("");
const tableData = computed(() => {
  if (!keywords.value) return tableData_.value;
  return tableData_.value.filter((item: any) => {
    return item.category.includes(keywords.value) || item.id == keywords.value;
  });
});

/**
 * 编辑
 * @param index
 * @param row
 */
function handleEdit(index: number, row) {
  open(({ value }) => {
    ElMessage.success(`修改成功: ${value}`);
  }, row.category);
}
function handleDelete(index: number, row) {
  axios.delete(`/deleteCategoryById/${row.id}`).then(res => {
    console.log(res.data);
  });
}
function handleInsert() {
  open(({ value }) => {
    ElMessage.success(`添加成功: ${value}`);
    // 接口有问题
    // axios.post("/insertCategory", { category: "test" }).then(res => {
    //   console.log(res.data);
    // });
  });
}
const open = (callback, initVal = "") => {
  ElMessageBox.prompt("Please input category name", "Tip", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    inputValue: initVal
  })
    .then(callback)
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled"
      });
    });
};
</script>

<style></style>
