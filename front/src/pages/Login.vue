<template lang="html">
  <div class="container">
    <div class="con-left con-box">
      <form class="form" @submit.prevent="submit">
        <div class="header">
          SIGN IN
        </div>
        <div class="form-controller">
          <input type="text" name="username" value="" autocomplete="off" v-model="username">
          <label :class="[username?'on':'']">USER</label>
          <div :class="[username?'on':'','line']"></div>
        </div>
        <div class="form-controller">
          <input type="password" name="password" value="" autocomplete="off" v-model="password">
          <label :class="[password?'on':'']">PASSWORD</label>
          <div :class="[password?'on':'','line']"></div>
        </div>
        <div class="form-controller sign-in-btn">
          <button class="sign-btn">play</button>
          <span class="tips" v-show='tipsShow'>{{tips}}</span>
        </div>
        <div class="form-controller">
          <div class="sign-up">
            <router-link to="/signup">SIGN UP</router-link>
          </div>
        </div>
      </form>
    </div>
    <div class="con-right con-box" :style="{backgroundImage:'url(../static/images/pic1.jpg)'}">
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      password:'',
      tips:'',
      tipsShow:false
    }
  },
  methods:{
    submit(){
      let self = this;

      if(self.username == ''){
        self.tips = 'your username is required';
        self.tipsShow = true;
        return
      }else if(self.password == ''){
        self.tips = 'your password is required';
        self.tipsShow = true;
        return
      }else{
        self.tipsShow = false;
      }

      let obj = {
        username:this.username,
        password:this.password
      };

      this.$http.post('/account/login',obj).then(response => {
          let data = response.body;
          if(data.success){
            this.$router.push({path:"/"})
          }else{
            this.tips = data.message;
            this.tipsShow = true;
          }
      },response => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/variable.less";
.container{
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  .con-left{
    position: relative;
    height: 100%;
  }
  .con-right{
    height: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0,.4);
    }
  }
  .con-box{
    flex: 1 1 auto;
    height: 100%;
  }
}
.header{
  padding-bottom: 1rem;
  font-size: 2.5rem;
  border-bottom: 5px solid #ec3f82;
  text-align: left;
  margin-bottom: 1.5rem;
}
.form{
  position: absolute;
  left: 50%;
  top:25%;
  margin-left: -200px;
  width: 400px;
  .form-controller{
    position: relative;
    width: 100%;
    margin: 2.5rem 0;
    label{
      font-size: 2rem;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      transition: all .2s ease-in-out;
      transform-origin: left top;
    }
    label.on{
      transform: translateY(-20px) scale(.6);
    }
    input{
      position: relative;
      z-index: 2;
      width: 100%;
      height: 2rem;
      border: none;
      outline: none;
      font-size: 1rem;
      background-color: transparent;
      box-sizing: border-box;
      &:focus{
        & + label{
          transform: translateY(-20px) scale(.6);
        }
        & ~ div.line{
          width: 100%;
        }
      }
    }
    .line{
      width: 0;
      height: 2px;
      background-color: #ec3f82;
      transition: all .5s ease;
      &.on{
        width: 100%;
      }
    }
  }
  .sign-in-btn{
    .sign-btn{
      display: inline-block;
      padding:.3rem 1rem;
      font-size: 2rem;
      border: 2px solid #777777;
      transition: all .2s ease;
      background-color: #ffffff;
      cursor: pointer;
      outline: none;
      &:hover{
        background-color: #ec3f82;
        color: #fff;
        border-color: #ec3f82;
      }
    }
  }
  .sign-up{
    font-size: 1.5rem;
    a{
      color: #777777;
      &:hover{
        color:#ec3f82;
      }
    }
  }
  .tips{
    display: inline-block;
    height: 1rem;
    overflow: hidden;
    color:@pink;
  }
}
</style>
