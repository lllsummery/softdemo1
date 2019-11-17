<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>


    <el-table :data="userInfoList"  v-loading="loading"
              element-loading-text="拼命加载中...."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              style="width: 100%">
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="userName" label="名字" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <!--第二步  开始进行修改和查询操作-->
      <el-table-column label="操作" align="center" min-width="100">

        <template slot-scope="scope">

          <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>

          <el-button type="info" @click="modify(scope.row)">修改</el-button>

          <el-button type="info" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--编辑与增加的页面-->


    </el-table>
    <!--新增界面-->
    <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
      <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="0px" class="demo-ruleForm login-container">
        <el-form-item prop="userName">
          <el-input type="text" v-model="addFormData.userName" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="addFormData.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-input type="text" v-model="addFormData.sex" auto-complete="off" placeholder="性别"></el-input>
        </el-form-item>
        <el-form-item prop="school">
          <el-input type="text" v-model="addFormData.school" auto-complete="off" placeholder="学校"></el-input>
        </el-form-item>
        <el-form-item prop="question">
          <el-input type="text" v-model="addFormData.question" auto-complete="off" placeholder="密保问题"></el-input>
        </el-form-item>
        <el-form-item prop="answer">
          <el-input type="text" v-model="addFormData.answer" auto-complete="off" placeholder="答案"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-input type="text" v-model="addFormData.type" auto-complete="off" placeholder="用户类别"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false,addFormData={id:'',userName:'',password:'',sex: '',school:'',question: '',answer: '',type: ''}">取 消</el-button>
                <el-button v-if="isView" type="primary" @click.native="modifyUser">确 定</el-button>
            </span>
    </el-dialog>

  </div>

</template>

<script>
    import {
        userList
    } from '../../api/api';
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name: 'get',
        data() {
            return {
                userInfoList: [],
                addFormReadOnly: true,
                dialogVisible: false,
                isView: true,
                addFormData: {
                    id: '',
                    userName: '',
                    password: '',
                    sex:'',
                    school:'',
                    question:'',
                    answer:'',
                    type:'',
                },
                modifyFormData:{
                    id: '',
                    userName: '',
                    password: '',
                    sex:'',
                    school:'',
                    question:'',
                    answer:'',
                    type:'',
                },
                rules2: {
                    userName: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                },
                filters: {
                    name: ''
                }
            }
        },
        mounted: function () {
            this.loadData();
        },

        methods: {
            loadData(){
                let param = {filter:this.filters.name};
                axios.post('/Admin/getUsers',qs.stringify(param)).then((result) => {
                    console.log(result);
                    var _data = result.data;
                    this.userInfoList = _data;
                });


            },
            getUsers() {
                this.loadData();
            },
            addUser() {
                this.addFormData = {
                    userName: '',
                    password: '',
                    sex: '',
                    school:'',
                    question:'',
                    answer:'',
                    type:'',
                };
                this.isView = true;
                this.dialogVisible = true;
                //    this.addFormReadOnly = false;
            },
            checkDetail(rowData) {
                this.addFormData = Object.assign({}, rowData);
                this.isView = true;
                this.dialogVisible = true;
                //    this.addFormReadOnly = true;
            },
            modifyUser(rowData) {
                let  username=Object.assign({},rowData.username);
                let param = Object.assign({}, this.addFormData);
                axios.post("/Admin/updateUser", qs.stringify(param)).then((result) => {
                    console.log(param,username,result);
                    if (result.data.success) {
                        this.$message({
                            type: 'info',
                            message: '修改成功',
                        });
                    } else {
                        this.$message({
                            type: 'info',
                            message: '修改失败',
                        });
                    }
                    this.dialogVisible = false;
                });
                this.loadData();
                //    this.addFormReadOnly = false;

            },
            modify(rowData){
                this.addFormData = Object.assign({}, rowData);
                this.isView = true;
                this.dialogVisible = true;
            },
            deleteUser(rowData) {
                this.$alert('是否删除这条记录', '信息删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        var params = {
                            userName: rowData.userName
                        };
                        axios.post("/Admin/deleteUser", qs.stringify(params)).then((result) => {
                            console.log(params);
                            console.info(result);
                            if (result.data.success) {
                                this.$message({
                                    type: 'info',
                                    message: `已删除`
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: `删除失败`
                                });

                            }
                            this.loadData();
                        });

                    }
                });

            },
            //增加一条记录
            addSubmit() {
                //先判断表单是否通过了判断
                this.$refs.addFormData.validate((valid) => {
                    //代表通过验证 ,将参数传回后台
                    if (valid) {
                        let param = Object.assign({}, this.addFormData);
                        axios.post("/Admin/addUser", qs.stringify(param)).then((result) => {
                            if (result.data.success) {
                                this.$message({
                                    type: 'info',
                                    message: '添加成功',
                                });
                                this.loadData();
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '添加失败',
                                });
                            }
                            this.dialogVisible = false;
                        });
                    }

                });
            }

        }

    }
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
