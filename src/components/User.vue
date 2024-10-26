

<template>
  <div class="auto-complete-search" >
    <input 
      type="text" 
      v-model="query" 
      @input="onInput"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />

    <ul v-if="showSuggestions">
      <li 
        v-for="(suggestion, index) in filteredSuggestions" 
        :key="index"
        @click="selectSuggestion(suggestion)"
        :class="{ highlighted: index === highlightedIndex }"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
  <div class="videoContainer">
    <video class="fullscreenVideo" v-show="backNum===firstbg"  id="bg0" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/firstbg.mp4" type="video/mp4">
    </video>
  <video class="fullscreenVideo" v-show="backNum===fpsbg"  id="bg1" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/fpsvideo.mp4" type="video/mp4">
    </video> 
     <video class="fullscreenVideo" v-show="backNum===speedbg"  id="bg2" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/speedvideo.mp4" type="video/mp4">
    </video>
  </div>
</template>

<style scoped>
.auto-complete-search {
  position: relative;
  width: 40%;
  margin: 50px auto;
  z-index: 50;
}
.auto-complete-search input {
  width: 100%;

  padding: 8px;
  box-sizing: border-box;
  font-size: x-large;
}
.auto-complete-search ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
}
.auto-complete-search li {
  padding: 8px;
  cursor: pointer;
}

.auto-complete-search li.highlighted {
  background-color: #ff002b;
  color: #fff;
}


.videoContainer{
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}
.fullscreenVideo{
  width: 100%;
  height: 100%;
  object-fit: fill
}

</style>




<script>

import axios from 'axios';
import gamesdata from '@/assets/newgames.json';

export default {
  name: 'AutoCompleteSearch',
  data() {
    return {
      query: '',
      suggestions: [{"name":"Game A","estimated_owners":"20000"},],
      games:gamesdata,
      filteredSuggestions: [],
      showSuggestions: false,
      backNum:0,
      firstbg:0,
      speedbg:2,
      fpsbg:1,
      soulbg:3,
      highlightedIndex: -1,
    }
  },
  methods: {
    sortGameData(games) {
      // 按照estimated_owners降序排序
      return games.sort((a, b) => {
        const ownersA = parseInt(a.estimated_owners, 10);
        const ownersB = parseInt(b.estimated_owners, 10);
        return ownersB - ownersA; // 降序排序
      });
    },
    onInput() {
      if (this.query.length > 0) {
        this.suggestions = [];
        this.suggestions = this.games.filter(
            game => game.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.suggestions = this.sortGameData(this.suggestions);
        this.suggestions = this.suggestions.slice(0,10);

        this.filteredSuggestions =  this.suggestions.map(suggestion=>suggestion.name);
        this.showSuggestions = this.filteredSuggestions.length > 0;
      } else {
        this.showSuggestions = false;
      }
    },
    selectSuggestion(suggestion) {
      this.query = suggestion;
      this.showSuggestions = false;
    },
    onArrowDown() {
      if (this.highlightedIndex < this.filteredSuggestions.length - 1) {
        this.highlightedIndex++;
      }
    },
    onArrowUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    onEnter() {
      if (this.highlightedIndex >= 0) {
        this.selectSuggestion(this.filteredSuggestions[this.highlightedIndex]);
      }
      if(this.query==="")
      {
        this.backNum = this.firstbg;
      }
      else
      {
        if(this.backNum<2 )this.backNum++
        else this.backNum = this.fpsbg;
         axios.post("/user/search",{
            query:this.query,
          //password:SHA256(this.adminLoginInfo.password).toString(),
          })
          .then(response=>{
            /*if(response.data.code === 1){
              ElMessage.success("注册成功");
              sessionStorage.setItem("token", response.data.payload);
              router.push('/login');
            }else{
              ElMessage.error(response.data)
            }*/
          })
          .catch(error =>{
            ElMessage.error("搜索失败");
          })
      }
   
    },
  }
}
</script>