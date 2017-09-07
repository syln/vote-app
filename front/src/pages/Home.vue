<template lang="html">
  <div class="">
    <Xheader></Xheader>
    <h2 class="main-tips">
      A Voting App for your favorite #ALBUM#
    </h2>
    <div class="album-list">
      <ul>
        <li v-for="item in listData">
          <div class="flex-item album-pic">
            <span class="album-tag">{{item.genre}}</span>
            <div :style="{backgroundImage:'url('+item.mainImage+')'}"></div>
          </div>
          <div class="flex-item info">
            <p>
              <label>专辑名：</label>
              <span>{{item.albumName}}</span>
            </p>
            <p>
              <label>歌手：</label>
              <span>
                {{item.singer}}
              </span>
            </p>
          </div>
          <div class="vote-num flex-item">
            <span>{{item.likeNum}}</span>
          </div>
          <div class="vote-btn flex-item">
            <a href="javascript:;">
              <i class="iconfont icon-heart like"></i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Xheader from 'components/header'
export default {
  components:{
    Xheader
  },
  data(){
    return{
      listData:[]
    }
  },
  created(){
    this.getAlbumList();
  },
  methods:{
    getAlbumList(){
      this.$http.post("/album/queryList")
        .then(res => {
          if(res.body.success){
            this.listData = res.body.result;
          }
      })
    }
  }
}
</script>

<style lang="less">
.main-tips{
  margin: 3rem 0;
  font-size: 2rem;
  text-align: center;
}
.album-list{
  margin:2rem auto;
  width: 800px;
  li{
    display: flex;
    padding: 1rem 0;
    align-items:center;
    border-top: 1px #d4d4d4 solid;
    .flex-item{
      flex: 1 1 auto;
    }
    .flex-item.album-pic{
      position: relative;
      flex-basis: 100px;
      text-align: center;
      flex: 3 1 auto;
      div{
        display: inline-block;
        width: 60%;
        padding-top: 60%;
        background-size: cover;
      }
      .album-tag{
        position: absolute;
        top: 0;
        left: 0;
        padding: .2rem;
        background-color: #fc6820;
        color: #fff;
      }
    }
    .info{
      flex:2 1 100px;
      p{
        vertical-align: top;
        label{
          display: inline-block;
          width: 80px;
          text-align: right;
          vertical-align: top;
        }
        span{
          display: inline-block;
          width: 160px;
          vertical-align: top;
        }
        margin-bottom: 1rem;
        line-height: 1rem;
      }
    }
    .vote-btn{
      flex: 1 1 auto;
      i{
        font-size: 2.5rem;
        color:#777777;
        &.like{
          color: #ec3f82;
        }
      }
    }
    .vote-num{
      flex: 1 1 auto;
      span{
        font-size: 2rem;
      }
    }
  }
}
</style>
