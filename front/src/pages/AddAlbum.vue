<template>
  <div class="container">
    <div class="header-blank">
      <router-link to="/home">HOME</router-link>
    </div>
    <form class="form" @submit.prevent="submit">
      <div class="header">
        PUSH +
      </div>
      <div class="form-controller">
        <input type="text" name="albumName" value="" autocomplete="off" v-model="albumName">
        <label class="on">Album</label>
        <div class="on line"></div>
      </div>
      <div class="form-controller">
        <input type="text" name="singerName" value="" autocomplete="off" v-model="singer">
        <label class="on">Singer</label>
        <div class="on line"></div>
      </div>
      <div class="form-controller">
        <select type="text" name="genre" v-model="genre">
          <option v-for="item in genreList" :value="item.name">{{item.name}}</option>
        </select>
        <label class="on">Genre</label>
      </div>
      <div class="form-controller">
        <input type="text" name="mainPic" value="" autocomplete="off" v-model="mainPic">
        <label class="on">Album Cover Link</label>
        <div class="on line"></div>
      </div>
      <div class="form-controller sign-in-btn">
        <button class="sign-btn">push</button>
        <span class="tips" v-show='tipsShow'>{{tips}}</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      albumName:"",
      singer:"",
      genre:"pop",
      mainPic:"",
      tips:"",
      genreList:[
        {code:"01",name:"Pop"},
        {code:"02",name:'Jazz'},
        {code:"03",name:'Hip-hop'},
        {code:"04",name:'Rock & Roll'}
      ],
      tipsShow:false
    }
  },
  methods:{
    submit(){
      let self = this;

      if(self.albumName == ''){
        self.tips = 'albumName is required';
        self.tipsShow = true;
        return
      }else if(self.singer == ''){
        self.tips = 'singer is required';
        self.tipsShow = true;
        return
      }else if(self.genre == ''){
        self.tips = 'genre is required';
        self.tipsShow = true;
        return
      }else if(self.mainPic == ''){
        self.tips = 'album cover is required';
        self.tipsShow = true;
        return
      }else{
        self.tipsShow = false;
      }

      let obj = {
        albumName:this.albumName,
        singer:this.singer,
        genre:this.genre,
        mainPic:this.mainPic
      };

      this.$http.post('/album/add',obj).then(response => {
          let data = response.body;
          if(data.success){
            this.$router.push({path:'/home'})
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
  text-align: right;
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
    }
    select{
      position: relative;
      margin-top: 5px;
      z-index: 2;
      width: 100%;
      height: 2rem;
      border: none;
      outline: none;
      font-size: 1rem;
      background-color: transparent;
      box-sizing: border-box;
      border: 2px #ec3f82 solid;
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
