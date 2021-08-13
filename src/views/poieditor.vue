<template>
  <div id="editor">
    <!-- 组编辑 -->
    <el-card v-show="sets" class="box-card">
      <div slot="header" class="clearfix">
        <span>分组编辑</span>
        <el-button style="float: right" type="warning" @click="dialogFormVisible = true">创建新组</el-button>
      </div>
      <!-- <button class="el-button" @click="dialogFormVisible = true">创建新组</button> -->
      <el-table :data="markerSets" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="label" label="组名" width="350" />
        <el-table-column prop="toggleable" label="是否可关" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.toggleable"
            />
          </template>
        </el-table-column>
        <el-table-column prop="defaultHide" label="是否隐藏" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.defaultHide"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="EditSet(scope.row)"
            >编辑</el-button>

            <el-button
              type="danger"
              @click="delProject(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Form -->

      <el-dialog title="创建新的组别" :visible.sync="dialogFormVisible">
        <el-form :model="PayloadSets">
          <el-form-item label="组名" :label-width="formLabelWidth">
            <el-input v-model="PayloadSets.label" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否可关" :label-width="formLabelWidth">
            <el-switch
              v-model="PayloadSets.toggleable"
            />
          </el-form-item>
          <el-form-item label="是否隐藏" :label-width="formLabelWidth">
            <el-switch
              v-model="PayloadSets.defaultHide"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateMarkerSets()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!-- 点编辑 -->
    <el-card v-show="markers" class="box-card">
      <div slot="header" class="clearfix">
        <span>兴趣点编辑</span>
        <el-button style="margin-left: 10px; float: right" type="warning" @click="CreatePOI = true">新建点元素</el-button>
        <el-button style="margin-left: 10px; float: right" type="warning" @click="CreateHTML = true">新建HTML兴趣点</el-button>
        <el-button style="margin-left: 10px; float: right" type="warning" @click="CreateSHAPE = true">新建面元素</el-button>
        <!-- <el-input v-model="value" placeholder="请输入内容" /> -->
        <el-button style="float: right" type="danger" @click="sets=true,markers=false">返回</el-button>
        <!-- <el-button style="float: right" type="danger" @click="checkTable()">查</el-button> -->
      </div>
      <!-- <button class="el-button" @click="dialogFormVisible = true">创建新组</button> -->
      <template>
        <el-select v-model="value" placeholder="请选择展示类型" @change="checkTable()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @onchange="checkTable()"
          />
        </el-select>
      </template>
      <el-table :data="markerList" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="map" label="世界" />
        <el-table-column prop="position" label="坐标" />
        <!-- <template slot-scope="scope">
          {{ scope.row.coord.x+','+scope.row.coord.y+','+scope.row.coord.z }}
        </template> -->
        <el-table-column prop="label" label="描述" />
        <el-table-column prop="maxDistance" label="最大显示距离" />
        <el-table-column prop="minDistance" label="最小显示距离" />
        <el-table-column v-if="icons" prop="icon" label="图标" />
        <el-table-column v-if="htmls" prop="html" label="html代码" />
        <el-table-column v-if="details" prop="detail" label="详细描述" />
        <el-table-column v-if="shapes" prop="shape" label="图形" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="EditSet(scope.row)"
            >图形编辑器</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="shapesY" prop="shape" label="图形高度" />
        <el-table-column v-if="lineWidths" prop="lineWidth" label="线宽" />
        <el-table-column v-if="lineColors" prop="lineColor" label="描边颜色" />
        <el-table-column v-if="fillColors" prop="fillColor" label="填充颜色" />
        <el-table-column label="操作" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="EditSet(scope.row)"
            >编辑</el-button>

            <el-button
              type="danger"
              @click="delPOI(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Form -->

      <el-dialog title="创建新的点" :visible.sync="CreatePOI">
        <el-form :model="PayloadElements">
          <el-form-item label="点名" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.label" autocomplete="off" />
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.label" autocomplete="off" />
            <b>x,y,z</b>
          </el-form-item>
          <el-form-item label="最大显示距离" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.maxDistance" autocomplete="off" />
          </el-form-item>
          <el-form-item label="最小显示距离" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.minDistance" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateMarkers()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="创建新的HTML点" :visible.sync="CreateHTML">
        <el-form :model="PayloadElements">
          <el-form-item label="点名" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.label" autocomplete="off" />
          </el-form-item>
          <el-form-item label="坐标" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.label" autocomplete="off" />
            <b>x,y,z</b>
          </el-form-item>
          <el-form-item label="HTML代码" :label-width="formLabelWidth">
            <el-input
              v-model="textarea2"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入HTML代码"
            />
          </el-form-item>
          <el-form-item label="最大显示距离" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.maxDistance" autocomplete="off" />
          </el-form-item>
          <el-form-item label="最小显示距离" :label-width="formLabelWidth">
            <el-input v-model="PayloadElements.minDistance" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateMarkerSets()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="创建新的面" :visible.sync="CreateSHAPE">
        <el-form :model="PayloadSets">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="PayloadSets.label" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否可关" :label-width="formLabelWidth">
            <el-switch
              v-model="PayloadSets.toggleable"
            />
          </el-form-item>
          <el-form-item label="是否隐藏" :label-width="formLabelWidth">
            <el-switch
              v-model="PayloadSets.defaultHide"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="CreateMarkerSets()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CreatePOI: false,
      CreateHTML: false,
      CreateSHAPE: false,
      sets: true,
      markers: false,
      icons: false,
      htmls: false,
      details: false,
      shapes: false,
      shapesY: false,
      lineWidths: false,
      fillColors: false,
      SelectedSetId: '',
      dialogFormVisible: false,
      isshow: false,
      // 项目相关
      options: [{
        value: 'poi',
        label: '兴趣点（POI）'
      }, {
        value: 'html',
        label: 'HTML'
      }, {
        value: 'extrude',
        label: '立体'
      }, {
        value: 'line',
        label: '线'
      }, {
        value: 'shape',
        label: '面'
      }],
      value: '',
      markerSets: [
        {
          id: '1',
          label: '勇者村',
          toggleable: true,
          defaultHide: false
        },
        {
          id: '2',
          label: 'DC村',
          toggleable: false,
          defaultHide: false
        }
      ],
      markerList: [{ id: 0, label: '勇者村主村' }],
      PayloadSets: {
        label: '',
        toggleable: false,
        defaultHide: false
      },
      PayloadElements: {
        label: '',
        minDistance: 100,
        maxDistance: 100000
      },
      formLabelWidth: '120px'
    }
  },

  created() {},
  mounted() {
    // this.InitData()
  },

  methods: {
    checkTable() {
      if (this.value === 'poi') {
        this.icons = true
        this.htmls = false
        this.details = false
        this.shapes = false
        this.shapesY = false
        this.lineWidths = false
        this.fillColors = false
      } else if (this.value === 'html') {
        this.icons = false
        this.htmls = true
        this.details = false
        this.shapes = false
        this.shapesY = false
        this.lineWidths = false
        this.fillColors = false
      } else if (this.value === 'shape') {
        this.icons = false
        this.htmls = false
        this.details = true
        this.shapes = true
        this.shapesY = true
        this.lineWidths = true
        this.fillColors = true
      } else { this.$message('暂不支持自助添加，请联系管理手动添加') }
    },
    InitData() {
      this.$axios
        .get('http://api.ubb.asia/v1/bluemap/marker_sets')
        .then(res => {
          console.log(res)
          console.log('success')
          this.markerSets = res.data.results
        })
        .catch((err) => {
          console.log('error get data', err)
        })
    },
    InitSet() {
      this.$axios
        .get(`http://api.ubb.asia/v1/bluemap/marker_sets?id=${this.SelectedSetId}`)
        .then(res => {
          console.log(res)
          console.log('success')
          this.markerSets = res.data.results
        })
        .catch((err) => {
          console.log('error get data', err)
        })
    },
    delProject(e) {
      this.$confirm(
        `此操作将永久删除<b style="color:#FF4500">"${e.label}"</b>大类!（真的很久！）`,
        '警告',
        {
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        this.$axios
          .delete(
            'http://api.ubb.asia/v1/bluemap/marker_sets' +
              e.id,
            {
              id: e.id
            }
          )
          .then(() => {
            // this.list.splice(this.scope, 1)
            this.getPJlist()
            this.success()
          })
      })
    },
    delPOI(e) {
      this.$confirm(
        `此操作将永久删除<b style="color:#FF4500">"${e.label}"</b>元素!（真的很久！）`,
        '警告',
        {
          confirmButtonText: '确定',
          cancleButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        this.$axios
          .delete(
            'http://api.ubb.asia/v1/bluemap/marker_sets' +
              e.id,
            {
              id: e.id
            }
          )
          .then(() => {
            // this.list.splice(this.scope, 1)
            this.InitSet()
            this.success()
          })
      })
    },
    EditSet(e) {
      this.$message({
        message: `开始编辑<b style="color:#FF4500"> "${e.label}"</b> 大类! ID为${e.id}`, dangerouslyUseHTMLString: true })
      this.SelectedSetId = e.id
      this.sets = false
      this.markers = true
      this.InitSet()
    },
    CreateMarkerSets() {
      // const payload = this.$qs.stringify({
      //   label: this.PayloadSets.label,
      //   toggleable: this.PayloadSets.toggleable,
      //   defaultHide: this.PayloadSets.defaultHide
      // })
      this.$axios.post('http://api.ubb.asia/v1/bluemap/marker_sets', this.PayloadSets)
        .then(res => {
          console.log(res)
          this.InitData()
          this.dialogSensorVisible = false
        })
    },
    CreateElements() {
      // const payload = this.$qs.stringify({
      //   label: this.PayloadSets.label,
      //   toggleable: this.PayloadSets.toggleable,
      //   defaultHide: this.PayloadSets.defaultHide
      // })
      this.$axios.post('http://api.ubb.asia/v1/bluemap/markers', this.PayloadMarkers)
        .then(res => {
          console.log(res)
          this.InitSet()
          this.dialogSensorVisible = false
          this.$notify({
            title: '成功',
            message: '成功创建新元素',
            type: 'success'
          })
        })
    },
    success() {
      this.$notify({
        title: '成功',
        message: '成功删除项目',
        type: 'success'
      })
    }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /* .box-card {
    width: 480px;
  } */
</style>
