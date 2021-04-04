<template>
  <div id="project">
    <el-table ref="articleTable" :data="data" style="width: 100%">
      <el-table-column
        :prop="tableInfo.coverImageId.name"
        :label="tableInfo.coverImageId.label"
        :width="tableInfo.coverImageId.width"
      >
        <template slot-scope="scope">
          <div class="cover">
            <el-image
              :alt="scope.row.coverImageId.name"
              :src="scope.row.coverImageId.url"
              fit="contain"
              :lazy="true"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.name.name"
        :label="tableInfo.name.label"
        :width="tableInfo.name.width"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.linkUrl.name"
        :label="tableInfo.linkUrl.label"
        :width="tableInfo.linkUrl.width"
      >
        <template slot-scope="scope">
          <nuxt-link :to="scope.row.linkUrl">
            {{ scope.row.linkUrl }}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.description.name"
        :label="tableInfo.description.label"
        :width="tableInfo.description.width"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.status.name"
        :label="tableInfo.status.label"
        :width="tableInfo.status.width"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="scope.row.status"
            :label="scope.row.status"
            border
          >
            {{ getStatus(scope.row.status) }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column :label="tableInfo.operation.label" :width="tableInfo.operation.width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row._id)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button
              size="small"
              type="danger"
              icon="el-icon-remove"
              @click="remove(scope.row._id,scope.row.title)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getUserProject } from '../../api/project'
@Component({
  layout: 'user',
  async asyncData ({ $axios, store }) {
    const res = await getUserProject({ $axios, param: { id: store.state.auth.user._id } })
    return {
      data: res.data
    }
  }
})
export default class project extends Vue {
  // 项目表结构
  tableInfo: object = {
    coverImageId: { name: 'coverImageId', label: '项目图片', width: 150 },
    linkUrl: { name: 'linkUrl', label: '仓库地址', width: 200 },
    name: { name: 'name', label: '文章名', width: 190 },
    description: { name: 'description', label: '项目简介', width: 180 },
    status: { name: 'status', label: '状态', width: 180 },
    operation: { label: '操作', width: 180 }
  }

  // 处理 项目状态
  getStatus (val: string) {
    let str = ''
    switch (val) {
      case '1': str = '已完成'
        break
      case '2': str = '进行中'
        break
      case '3': str = '已废弃'
        break
    }
    return str
  }
}
</script>

<style scoped>
</style>
