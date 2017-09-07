<template lang="html">
  <div class="container">
    <div class="header-blank">
      <router-link to="/login">SIGN IN</router-link>
    </div>
    <form class="form" @submit.prevent="submit">
      <div class="header">
        SIGN UP
      </div>
      <div class="form-controller">
        <input type="text" name="email" value="" autocomplete="off" v-model="email">
        <label :class="[email?'on':'']">EMAIL</label>
        <div :class="[email?'on':'','line']"></div>
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
        <button class="sign-btn">sign up</button>
        <span class="tips" v-show='tipsShow'>{{tips}}</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      password:'',
      email:'',
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
      }else if(self.email == ''){
        self.tips = 'your email is required';
        self.tipsShow = true;
        return
      }else{
        self.tipsShow = false;
      }

      let obj = {
        username:this.username,
        password:this.password,
        email:this.email
      };

      this.$http.post('/account/add',obj).then(response => {
          let data = response.body;
          if(data.success){
            this.$router.push({path:'/login'})
          }else{
            this.tips = data.message;
            this.tipsShow = true;
          }
      },response => {
        alert('error')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/variable.less";
.container{
  width: 100%;
  height: 100%;
  position: absolute;
}
.header{
  padding-bottom: 1rem;
  font-size: 2.5rem;
  border-bottom: 5px solid #ec3f82;
  text-align: left;
  margin-bottom: 1.5rem;
}
.header-blank{
  text-align: right;
  padding: 1rem 2rem;
  a{
    display: inline-block;
    padding: .4rem 1rem;
    border: 1px @gray solid;
    color: @gray;
    &:hover{
      color: @pink;
      border-color: @pink;
    }
  }
}
.form{
  position: absolute;
  left: 50%;
  top:15%;
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
    text-align: center;
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
    display: block;
    height: 1rem;
    overflow: hidden;
    color:@pink;
    text-align: center;
    margin:1rem 0;
  }
}
</style>
