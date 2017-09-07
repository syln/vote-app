<template lang="html">
  <div class="header">
    <div class="header-bar">
      <span class="push">
        <router-link to="/add">Push <i>+</i></router-link>
      </span>
      <span v-if="userName">
        {{userName}}
      </span>
      <span v-if="!userName">
        <router-link to="/login" class="link-tag">Sign in</router-link>
      </span>
      <span>
        <router-link to="/signout" class="link-tag">Sign out</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:''
    }
  },
  created(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      let self = this;
      self.$http.post('/account/userInfo')
       .then(res => {
         let data = res.body;
         if(data.success){
           this.userName = data.name
         }else{

         }
       })
    },
  }
}
</script>

<style lang="less">
.header-bar{
  padding: 1rem 2rem;
  border-bottom: 1px #d4d4d4 solid;
  text-align: right;
  .push{
    a{
      color: #ec3f82;
    }
  }
  span{
    padding: 0 1rem;
    display: inline-block;
    border-right: 1px #d4d4de solid;
    &:last-child{
      border:none;
    }
    .link-tag{
      color:#777777;
      transition: color .2s ease;
      &:hover{
        color: #000000;
      }
    }
  }
}
</style>
