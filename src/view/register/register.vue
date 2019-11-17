<template>
  <div>

    <div class="el-main"  >
      <el-steps :active="active" finish-status="success" >
        <el-step title="输入用户信息"></el-step>
        <el-step title="注册成功"></el-step>
      </el-steps>

    <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">注册</h3>

      <el-form-item prop="username">
      输入用户名 ：
        <el-input type="text" v-model="account.username" auto-complete="off"
        placeholder="用户名">

      </el-input>
      </el-form-item>
           <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </el-form>

    </div>
    <div class="footer">
      <footer-copyright></footer-copyright>
    </div>
  </div>
</template>
<script>
    import API from '../../api/api_user'
    export default {
        data() {
            var validateAccount = (rules, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    if (this.account.username !== '') {
                        this.account.username = value;
                        this.validateCorrect();
                    }
                    callback();
                }
            };
            var validatePwd = (rules, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.account.pwd !== '') {
                        this.account.pwd = value;
                        this.validateCorrect();
                    }
                    callback();
                }
            };
            return {
                active: 0,
                loading: false,
                account: {
                    username: '',
                    pwd: ''
                },
                rules: {
                    username: [
                        { required: true, validator: validateAccount, trigger: 'change' }

                    ],
                    pwd: [
                        {required: true, validator: validatePwd, trigger: 'change'}
                    ]
                },
                pwdFocus: false,
                allowLogin: true,
                checked: true
            };
        },
        created() {
            let reg_user = JSON.parse(window.localStorage.getItem('register-user'));
            if (reg_user) {
                this.account.username = reg_user.username;
                this.account.pwd = '';
                this.pwdFocus = true;
            }
        },
        methods: {

                next() {
                    if (this.active++ > 2) this.active = 0;
                },
            handleLogin(){
                let that = this;
                let result = {
                    id: '1',
                    username: 'admin',
                    nickname: this.account.username,
                    name: 'administrator',
                    email: '888888@163.com'
                };
                this.loading = true;
                let status = API.login(result);
                if(status == 'success'){
                    localStorage.setItem('access-user', JSON.stringify(result));
                    window.localStorage.removeItem('register-user');
                    that.$router.push({path: '/'});
                } else {
                    this.loading = false;
                    this.$message.error("登录失败，账号或密码错误");
                }
            },
            validateCorrect(){
                if(this.account.pwd.trim().length > 0 && this.account.username.trim().length > 0){
                    this.allowLogin = false;
                } else {
                    this.allowLogin = true;
                }
            }
        }
    }
</script>
<style scoped>
  body {
    background: #DFE9FB;
  }
  .header-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 6px 0;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 2px #ddd;
  }
  .header-content .logo-part {
    margin-left: 10px;
    font-size: 18px;
    color: #999;
  }
  .header-content .logo-part img {
    vertical-align: middle;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;


    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

  }
  .login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }
  .extra-text {
    position: relative;
    margin-bottom: 0;
    padding-left: 2px;
  }
  .extra-text a {
    font-size: 12px;
    color: #aaa;
  }
  .extra-text a:hover {
    color: #29e;
  }
  .extra-text .reg-text {
    position: absolute;
    top: 4px;
    right: 2px;
  }
</style>
