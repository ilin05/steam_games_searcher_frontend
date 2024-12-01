<template>
  <el-container class="main-container">

    <el-container class="search-show-container">
      <el-card class="auto-complete-search-card">
        <input
            type="text"
            v-model="query"
            placeholder="请输入以查询"
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
              style="font-size: x-large"
          >
            {{ suggestion }}
          </li>
        </ul>
      </el-card>


      <el-card class="advanced-options-card">

        <el-container class="show-options-container">
          <el-button type="primary" @click="showOptions" style="width:10%;height: 50px   ">高级选项
          </el-button>
        </el-container>

        <el-container class="advanced-options-container">
          <div v-if="showOptions">
            <el-button> type</el-button>
          </div>

        </el-container>
      </el-card>


      <el-card class="detailed-information-card">


        <el-container style="display: flex;flex-direction: row;">
          <el-container class="head-picture-container">

            <img :src=ToShowPicture alt="Head Picture" class="head-picture">

            <div style="display: flex; flex-direction: row;  overflow-x: auto;overflow-y:hidden;white-space: nowrap;margin-top: 5px">
              <div v-for="(picture,index) in toShowGame.pictures" :key="index"
                   style="display:inline-block;margin-right: 5px">
                <img :src=picture class="single-picOrMovie-card" alt="Need pic" @click="changePicture(picture)">
              </div>
            </div>

          </el-container>

          <el-container class="detailed-information-container ">
            <img :src="toShowGame.MainPictureSrc" alt="Main Picture" class="main-picture">
            <div
                style="width:100%;margin-top:5px;color: gainsboro;font-size: large;word-wrap: break-word;word-break: break-all;overflow: hidden;">
              <p> {{ toShowGame.description }}</p></div>
            <div
                style="width: 100%;margin-top: 3px;margin-bottom:3px;text-align: center;color:deepskyblue;font-size:2em;font-weight: 300;">
              <p> {{ toShowGame.title }} </p></div>

            <div style="width:100%;">
              <p>
                <span style="font-size: math;color:darkgray;">Release date</span>
                <span
                    style="font-size: math;color:cornflowerblue; margin-left: 30%">{{
                    this.toShowGame.releaseDate
                  }}</span>
              </p>
            </div>
            <div style="width:100%;">
              <p>
                <span style="font-size: math;color:darkgray;">Good/bad review</span>
                <span style="font-size: math;color:cornflowerblue; margin-left: 23%">
               {{ Math.round(100 * this.toShowGame.positive / (this.toShowGame.negative + this.toShowGame.positive)) }}% positive  </span>
              </p>
            </div>

            <div style="display: flex; flex-direction: row;overflow: hidden;margin-top: 4%;">
              <div v-for="(count,tag) in this.toShowGame.tags" :key="tag">
                <el-tag style="margin-left: 2px;font-size: 13px;color: #2c3e50"> {{ tag }}</el-tag>
              </div>
            </div>

          </el-container>


        </el-container>
      </el-card>

      <el-card class="Action-field-card">
        <el-container class="Action-field-container">
          <div style="color: gainsboro;font-size: 150%;margin-top: 0.5%;margin-left: 1%">更多搜索相关</div>
          <el-button style="margin-top: 0.5%;margin-left: 68%;height: 3vh " @click="ShowMoreInfomation">查看更多信息
          </el-button>
          <el-button v-if="!isLoved" style="margin-top: 0.5%;margin-left:1%;height: 3vh" @click="toggleLove">收藏
          </el-button>
          <el-button v-if="isLoved" style="margin-top: 0.5%;margin-left:1%;height:3vh " @click="toggleLove">移出收藏
          </el-button>
        </el-container>

      </el-card>

      <el-card class="search-related-card">
        <el-container class="search-related-container">
          <div v-for="(game,index) in games" key="game.appId">
            <div style="width:auto;height: 22vh;margin-right: 4%">
              <preCard :imageUrl="game.MainPictureSrc" v-if="index>0" @update-showGame="updateShowGame(game)"></preCard>
            </div>
          </div>
        </el-container>

      </el-card>
    </el-container>


    <el-container class="user-love-command-container">

      <div v-show="this.expandedNum === 0" style="width: 100%;height: 100%;">

        <el-card class="user-information-card">
          <el-container class="user-information-head-container">
            <div style="color: gainsboro;font-size: 150%;width: 10vw">用户个人信息</div>
            <div style="margin-left: 63%;">
              <el-button style="background-color: lightblue;" @click="handleExpanded(1)">
                <el-icon style="font-size: 200%"><Download/></el-icon>
              </el-button>
            </div>
          </el-container>


          <el-container class="user-information-body-container">

          </el-container>

        </el-card>
        <el-card class="user-love-card">
          <el-container class="user-love-head-container">
            <div style="color:gainsboro;font-size:150%;width: 10vw">用户收藏</div>
            <div style="margin-left: 63%;">
              <el-button style="background-color:lightblue" @click="handleExpanded(1)">
                <el-icon style="font-size: 200%;"><FullScreen /></el-icon>
              </el-button>
            </div>


          </el-container>
          <el-container class="user-love-preCard-container">
            <div v-for="(game,index) in favoriteGames" key="game.appId" >
              <div style="width:18vw;height: 15vh;margin-left:0.5%;margin-top:1%;margin-bottom: 4%">
                <preCard :imageUrl="game.MainPictureSrc" @update-showGame="ShowFavoriteGame(game)"></preCard>
              </div>
            </div>
          </el-container>

        </el-card>


        <el-card class="user-command-card">
          <el-container class="user-command-head-container">


          </el-container>

          <el-container class="user-command-preCard-container">

          </el-container>


        </el-card>
      </div>

      <el-dialog
          v-model="dialog1"
          width="80%"
          height="200%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          style="background-color: #cccccc"
      >
        <div slot="title" style="font-weight: bold; font-size: 24px; text-align: center; color: #333; margin-bottom: 20px">
          游戏详细信息
        </div>
        <el-card class="detailed-information-card">
          <el-container style="display: flex;flex-direction: row; height: 600px">
            <el-container class="detailed-information-container ">
              <!--游戏主图-->
              <img :src="toShowGame.MainPictureSrc" alt="Main Picture" width="100%" height="80%">
              <!--描述-->
              <div
                  style="width:100%;margin-top:5px;color: gainsboro;font-size: large;word-wrap: break-word;word-break: break-all;overflow: hidden;">
                <p> {{ toShowGame.description }}</p></div>
              <!--标签-->
              <div style="display: flex; flex-direction: row;overflow: hidden;margin-top: 4%;">
                <div v-for="(count,tag) in this.toShowGame.tags" :key="tag">
                  <el-tag style="margin-left: 2px;font-size: 13px;color: #2c3e50"> {{ tag }}</el-tag>
                </div>
              </div>

            </el-container>
            <el-container class="detailed-information-container">
              <!--标题-->
              <div
                  style="width: 100%;margin-top: 3px;margin-bottom:3px;text-align: center;color:deepskyblue;font-size:2em;font-weight: 300;">
                <p> {{ toShowGame.title }} </p></div>
              <!--发行时间-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Release date</span>
                  <span style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">
                    {{ this.toShowGame.releaseDate }}
                  </span>
                </p>
              </div>
              <!--好评率-->
              <div style="width:100%; margin-top: 10px; ">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Good/bad review</span>
                  <span style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">
                    {{ Math.round(100 * this.toShowGame.positive / (this.toShowGame.negative + this.toShowGame.positive)) }}% positive
                  </span>
                </p>
              </div>
              <!--价格-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Price</span>
                  <span style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">
                    {{ this.toShowGame.price }}
                  </span>
                </p>
              </div>
              <!--支持系统-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Support_OS</span>
                  <span style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">
                  <span
                      v-if="this.toShowGame.winSupport === true & this.toShowGame.macSupport === false & this.toShowGame.linuxSupport === false" >
                    Windows
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === false & this.toShowGame.macSupport === true & this.toShowGame.linuxSupport === false">
                    Mac
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === false & this.toShowGame.macSupport === false & this.toShowGame.linuxSupport === true">
                    Linux
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === true & this.toShowGame.macSupport === true & this.toShowGame.linuxSupport === false">
                    Windows、Mac
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === false & this.toShowGame.macSupport === true & this.toShowGame.linuxSupport === true">
                    Mac、Linux
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === true & this.toShowGame.macSupport === false & this.toShowGame.linuxSupport === true" >
                    Windows、Linux
                  </span>
                  <span
                      v-if="this.toShowGame.winSupport === true & this.toShowGame.macSupport === true & this.toShowGame.linuxSupport === true" >
                    Windows、Mac、Linux
                  </span>
                  </span>
                </p>
              </div>
              <!--官方网站-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">WebSite</span>
                  <el-link :href="this.toShowGame.website" style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">
                    {{ this.toShowGame.website }}
                  </el-link>
                </p>
              </div>
              <!--游戏外平台-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Support_platform</span>
                  <el-link :href="this.toShowGame.support_url" style="font-size: 18px; color: cornflowerblue; margin-left: 20px;">{{this.toShowGame.support_url}}</el-link>
                </p>
              </div>
              <!--开发者-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Developer</span>
                  <span style="font-size: 18px; color: cornflowerblue;" v-for="(dev, index) in toShowGame.developers" :key="dev">
                    <!-- 在第一个开发者之前添加一段距离 -->
                    <span v-if="index === 0" style="margin-left: 20px;"></span>
                    &lt;{{ dev }}&gt;
                  </span>
                </p>
              </div>
              <!--发行者-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Publisher</span>
                  <span style="font-size: 18px; color: cornflowerblue;" v-for="(dev, index) in toShowGame.publishers" :key="dev">
                    <!-- 在第一个开发者之前添加一段距离 -->
                    <span v-if="index === 0" style="margin-left: 20px;"></span>
                    &lt;{{ dev }}&gt;
                  </span>
                </p>
              </div>
              <!--游戏类别-->
              <div style="width:100%; margin-top: 10px;">
                <p>
                  <span style="font-size: 18px; font-weight: bold; margin-left: 20px; color: darkgray;">Genres</span>
                  <span style="font-size: 18px; color: cornflowerblue;" v-for="(dev, index) in toShowGame.genres" :key="dev">
                    <!-- 在第一个开发者之前添加一段距离 -->
                    <span v-if="index === 0" style="margin-left: 20px;"></span>
                    <el-tag style="margin-left: 2px;font-size: 13px;color: #2c3e50"> {{ dev }}</el-tag>
                  </span>
                </p>
              </div>

            </el-container>


          </el-container>
        </el-card>
        <div style="display: flex; justify-content: flex-end; margin-top: 50px">
          <el-button @click="dialog1 = false" style="width: 100px">关闭</el-button>
        </div>
      </el-dialog>
    </el-container>


  </el-container>
</template>


<script>
import axios from 'axios';
import gamesData from '@/assets/newgames.json';
import {ElMessage, ElButton, ElIcon} from "element-plus";
import PreCard from "@/components/preCard.vue";
import {Download, FullScreen, Upload} from "@element-plus/icons-vue";

export default {
  components: {FullScreen, Upload, Download, PreCard},

  data() {
    return {
      dialog1:false,
      firstLoaded: true,
      favoriteGames: [
        {
          appId: 0,
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469',
        },
        {
          appId: 1,
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg?t=1654076112',
        }
      ],
      expandedNum:0,
      query: '',
      showOptions: false,
      suggestions: [{"name": "Game A", "estimated_owners": "20000"},],
      toSearchGames: gamesData,
      filteredSuggestions: [],
      showSuggestions: false,
      highlightedIndex: -1,
      toShowGame: {
        appId: 0,
        title: '',
        releaseDate: '',
        winSupport: false,
        macSupport: false,
        linuxSupport: false,
        price: 0.00,
        tags: {},
        supportedLanguages: [],
        MainPictureSrc: '',
        positive: 0,
        negative: 0,
        pictures: [],
        website: "http://www.pubg.com",
        support_url: "https://support.playbattlegrounds.com",
        supported_languages: [],
        developers: [],
        publishers: [],
        categories: [],
        genres: [],
        description: "",
      },

      ToShowPicture: '',
      games: [
        {
          appId: 0,
          title: 'PUBG:BATTLEGROUNDS',
          releaseDate: '2017 年 12 月 21 日',
          winSupport: true,
          macSupport: false,
          linuxSupport: false,
          price: 0.00,
          tags: {
            "Survival": 14039,
            "Shooter": 11849,
            "Multiplayer": 10176,
            "Battle Royale": 10065,
            "FPS": 7776,

          },
          supportedLanguages: [],
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469',
          positive: 1154655,
          negative: 895978,
          pictures: [
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e2cbfefdff39b9cb8e080da8f30cc07223b041b9.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_01d84950ddfb28ea611f1fa1a28c3cb08ccd7eee.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_606cee13e97530720c678513cb1138ef9854d7d5.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4454f310776c626a76baeca2d05fd82bd17c6ee0.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2db6a7b87ad61fbee74adcd2d7b03eee1a28743e.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_93e6e1fa807c3b3b09ce4e1e4800e7723dc308a1.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c49417566f70eec8bf0ddbb2956b235d91504a09.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_de28db240ee8646b1dd883a141b4832271a150e7.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_11e51d12d854712ed7c83e69f1b21d246ab018b3.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_abadb3bfc951cd05150901ff65386e3129c6011a.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_cec7ea5e83407dba51c80d24a2c8076e93752d4f.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_5fe3d8ce7e90442569fc676e2315fffdf81dd1a5.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2b1f73afd6efb1952ee267e94f8bcc24ec5e8fb3.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_52773275afe4c34a84fbf38e9960a598a420b3c2.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c98c609e2f07c80c8455624cc62696c9dde9ea73.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_07590e851053a453e09c7d6f272adf602c3f8ee8.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_56d29e4503ba1a74047feb55986c6bf4ca4297f9.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_f96bc802fb38617ce790c0950b87a7979f096025.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_108e2981889423b057b778cd07ae25ac18406cf1.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_a403a1f4071d36d42bea7a505089b56b570b2569.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e7e79847eff0933de92192bb62b8bc7068d611da.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8112cd376568d9470c2edde841908fcdf46f1529.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4bbcaeac1ef977d962c60c1a5e4675cdd81de564.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_88a8dff0756673179e190c2e16d090de63ecfb2e.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_29d0709711f3204e84b6f9d69f3be163ebe12486.1920x1080.jpg?t=1658287469",
            "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_6595641da498162aedc71136a93feb5bcb1785d8.1920x1080.jpg?t=1658287469"
          ],
          website: "http://www.pubg.com",
          support_url: "https://support.playbattlegrounds.com",
          supported_languages: [
            "English",
            "Korean",
            "Simplified Chinese",
            "French",
            "German",
            "Spanish - Spain",
            "Arabic",
            "Japanese",
            "Polish",
            "Portuguese",
            "Russian",
            "Turkish",
            "Thai",
            "Italian",
            "Portuguese - Brazil",
            "Traditional Chinese",
            "Ukrainian"
          ],
          developers: [
            "KRAFTON, Inc.",
              "dfwefwe"
          ],
          publishers: [
            "KRAFTON, Inc."
          ],
          categories: [
            "Multi-player",
            "PvP",
            "Online PvP",
            "Stats",
            "Remote Play on Phone",
            "Remote Play on Tablet"
          ],
          genres: [
            "Action",
            "Adventure",
            "Free to Play",
            "Massively Multiplayer"
          ],
          description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
        },
        {
          appId: 1,
          title: 'Cities: Skylines',
          releaseDate: 'Mar 10, 2015',
          winSupport: false,
          macSupport: false,
          linuxSupport: false,
          price: 0.00,
          tags: {
            "City Builder": 4632,
            "Simulation": 3375,
            "Building": 2766,
            "Management": 2242,
            "Strategy": 2160,
          },
          supportedLanguages: [],
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg?t=1654076112',
          positive: 187151,
          negative: 13180,
          pictures: [
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_0ff5efa28d8c6761ee2e9c57412ca3bd9e133fed.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_7d1f130bebd09e1f8457110d7ebae6eff9f25612.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_e90299bea1faee761c11c5242c4e6e89f3ef7fb9.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_7d54fe076aabfd4fbe465517a4f1a4426e9cb367.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_79130723c29cdd89f6169514bc4aad03aa58e823.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_013b26f27484941d4edbd406f8df5b5238f120df.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_b5a4b72062b8c4ad677b242963e88c2e624cb1f9.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_39f74526167020dfae4156945f24e7e49d5eedf8.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_a4ebf2b3ad46e620d99fa471708d68b28ea4d7d1.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_e0f842c9327df9defabf120b6c59e1ba42f54a75.1920x1080.jpg?t=1654076112",
            "https://cdn.akamai.steamstatic.com/steam/apps/255710/ss_13bf6dcdc9f4e383f885752fbe9114ddb4dfd729.1920x1080.jpg?t=1654076112"],
          description: "Cities: Skylines is a modern take on the classic city simulation. The game introduces new game play elements to realize the thrill and hardships of creating and maintaining a real city whilst expanding on some well-established tropes of the city building experience.",
        },
        {
          appId: 2,
          title: "ELDEN RING",
          releaseDate: 'Feb 24, 2022',
          winSupport: false,
          macSupport: false,
          linuxSupport: false,
          price: 0.00,
          tags: {
            "Souls-like": 4585,
            "Relaxing": 4247,
            "Dark Fantasy": 3466,
            "RPG": 3143,
            "Difficult": 2984,
          },
          supportedLanguages: [],

          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1654259241',


          positive: 460812,
          negative: 51238,

          pictures: [
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_25cd489871907387c1b915022a96b196661b6e17.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_c372274833ae6e5437b952fa1979430546a43ad9.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e87a3e84890ab19f8995566e62762d5f8ed39315.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_b87601dee58f4dbc36e40a8d803dc6a53ceefe07.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_8b58d96262fb0d62a482621b86c6ff85f4f57997.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_1011610a0e330c41a75ffd0b3a9a1bac3205c46a.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_41e2e8f3b0ad631e929e0c2ec3d1f21de883e98c.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_7dcd7e6c42024c2d5a5a31d758039ded13a47527.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_abd681cde3402155a35edb82919b7602cc7ec338.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_0b6e59057b02392b21dde62b4dde65d447e1fa3c.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_7523a8fc7775ae65cabd94d092ebecbd963258b6.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_a176eea67cd421307a6c627514129237d6202890.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ebb332e63dfab864c3bf3c3b1001b69f4da25f9f.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_24bd769aeffacd45fcd3a7ae9efde22b24b5fca9.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_75f25974c20b8704fe5ee246f74896b550088d3e.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_fb2957cce97f4633bc743b561f76865e6993c781.1920x1080.jpg?t=1654259241",
            "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_35ff7ed4b67e2bb73e54f6c10a4f8d9390c16203.1920x1080.jpg?t=1654259241"
          ],
          website: "http://www.pubg.com",
          support_url: "https://support.playbattlegrounds.com",
          supported_languages: [
            "English",
            "Korean",
            "Simplified Chinese",
            "French",
            "German",
            "Spanish - Spain",
            "Arabic",
            "Japanese",
            "Polish",
            "Portuguese",
            "Russian",
            "Turkish",
            "Thai",
            "Italian",
            "Portuguese - Brazil",
            "Traditional Chinese",
            "Ukrainian"
          ],
          developers: [
            "KRAFTON, Inc."
          ],
          publishers: [
            "KRAFTON, Inc."
          ],
          categories: [
            "Multi-player",
            "PvP",
            "Online PvP",
            "Stats",
            "Remote Play on Phone",
            "Remote Play on Tablet"
          ],
          genres: [
            "Action",
            "Adventure",
            "Free to Play",
            "Massively Multiplayer"
          ],
          description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        },
        {
          appId: 3,
          title: 'Black Myth: Wukong',
          releaseDate: 'Aug 19, 2024',
          winSupport: false,
          macSupport: false,
          linuxSupport: false,
          price: 0.00,
          tags: {
            "Mythology": 8718,
            "Action RPG": 7211,
            "Action": 6779,
            "RPG": 6111,
            "Souls-like": 5973,
          },
          supportedLanguages: [],

          MainPictureSrc: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1725007201',


          positive: 663109,
          negative: 28700,

          pictures: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_86c4b7462bba219a0d0b89931a35812b9f188976.1920x1080.jpg?t=1725007201",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_d9391ab31a4d15dddf7ba4949bfa44f5d9170580.1920x1080.jpg?t=1725007201",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_524a39da392ee83dde091033562bc719d46b5838.1920x1080.jpg?t=1725007201",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_968bbc9caceb7d798bd0c393e1e9b4c44ed6d835.1920x1080.jpg?t=1725007201",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_415397426d4c939ebb8a93ac66831f28ee7199be.1920x1080.jpg?t=1725007201",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/ss_63477e8ce2c0582b81c6ed576377d78e692b5642.1920x1080.jpg?t=1725007201"
          ],
          website: "http://www.pubg.com",
          support_url: "https://support.playbattlegrounds.com",
          supported_languages: [
            "English",
            "Korean",
            "Simplified Chinese",
            "French",
            "German",
            "Spanish - Spain",
            "Arabic",
            "Japanese",
            "Polish",
            "Portuguese",
            "Russian",
            "Turkish",
            "Thai",
            "Italian",
            "Portuguese - Brazil",
            "Traditional Chinese",
            "Ukrainian"
          ],
          developers: [
            "KRAFTON, Inc."
          ],
          publishers: [
            "KRAFTON, Inc."
          ],
          categories: [
            "Multi-player",
            "PvP",
            "Online PvP",
            "Stats",
            "Remote Play on Phone",
            "Remote Play on Tablet"
          ],
          genres: [
            "Action",
            "Adventure",
            "Free to Play",
            "Massively Multiplayer"
          ],

          description: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
        },


      ]
    }
  },
  computed: {

    isLoved() {
      return this.favoriteGames.find(item => item.appId === this.toShowGame.appId);
    },
  },

  methods: {
    ShowMoreInfomation(){
      this.dialog1 = true
    },
    handleExpanded(num)
    {
      this.expandedNum = num;
    },
    ShowFavoriteGame(appId) {
      axios.post("/user/GetFavoriteGame", {
        appId: appId,
        userId: sessionStorage.getItem("token"),
      })
          .then((response) => {
            if (respnse.data.code === 1) {

            } else {
              ElMessage.error("打开收藏失败")
            }
          })
    },
    updateShowGame(game) {
      this.toShowGame = game;
      this.ToShowPicture = this.toShowGame.pictures[0];

    },
    toggleLove() {
      if (this.isLoved) {
        this.deleteLove();
      } else {
        this.addLove()
      }
    },
    deleteLove() {

      let temp = [];
      temp = this.favoriteGames.filter(
          game => game.appId !== this.toShowGame.appId
      );
      this.favoriteGames = temp;


      axios.post("/user/deleteFavorites", {appId: this.toShowGame.appId, userId: sessionStorage.getItem("token")})
          .then(response => {
            if (response.data.code === 1) {
              ElMessage.success("更改成功");
            } else {
              ElMessage.error("更改失败")

            }
          })
    },
    addLove() {

      let temp = {
        appId: this.toShowGame.appId,
        MainPictureSrc: this.toShowGame.MainPictureSrc
      }
      this.favoriteGames.push(temp);


      axios.post("/user/addFavorites", {appId: this.toShowGame.appId, userId: sessionStorage.getItem("token")})
          .then(response => {
            if (response.data.code === 1) {
              ElMessage.success("更改成功");
            } else {
              ElMessage.error("更改失败");
            }
          })

    },
    changePicture(picture) {
      this.ToShowPicture = picture;
    },

    showOptions() {
      this.showSuggestions = !this.showSuggestions;
    },
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
        this.suggestions = this.toSearchGames.filter(
            game => game.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.suggestions = this.sortGameData(this.suggestions);
        this.suggestions = this.suggestions.slice(0, 10);
        this.filteredSuggestions = this.suggestions.map(suggestion => suggestion.name);
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
      if (this.query === "") {
        this.backNum = this.firstbg;
      } else {
        if (this.backNum < 2) this.backNum++
        else this.backNum = this.fpsbg;
        axios.post("/user/search", {
          query: this.query,
          userId: sessionStorage.getItem("token")
          //password:SHA256(this.adminLoginInfo.password).toString(),
        })
            .then(response => {
              if (response.data.code === 1) {
                ElMessage.success("搜索成功");
                this.games = response.data.payload;
                sessionStorage.setItem("games", response.data.payload);
              } else {
                ElMessage.error(response.data)
              }
            })
            .catch(error => {
              ElMessage.error("搜索失败");
            })
      }

    },
    DeleteToken() {
      sessionStorage.clear()
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("games", JSON.stringify(this.games));
  },
  mounted() {
    if (sessionStorage.getItem("games") != null) {
      this.games = JSON.parse(sessionStorage.getItem("games"));
    }
    if (this.firstLoaded) {
      this.toShowGame = this.games[0];
      this.firstLoaded = !this.firstLoaded;
    }

    this.ToShowPicture = this.toShowGame.pictures[0];
  }


}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  font-family: 'Times New Roman', Times, serif;
}

/*******************************************************
 *                    搜索和结果展示区                    *
 *******************************************************/
.search-show-container {

  width: 80%;
  height: 100%;
  padding: 1% 1% 0 1%;
  display: flex;
  background: #213547;
  flex-direction: column;

}

/**********                搜索卡片              *********/


.auto-complete-search-card {
  width: 100%;
  height: 8%;
  border-radius: 10px;
  border: none;
  margin-bottom: 0.5%;
  display: flex;
  background: #2c3e50;
  flex-direction: column;
}

.advanced-options-card {
  width: 100%;
  height: 10%;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  background: #2c3e50;
  flex-direction: column;
}


.show-options-container {
  width: 100%;
  height: 20%;
  background: #2c3e50;
}


.advanced-options-container {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
}


.auto-complete-search-card input {
  width: 100%;
  height: 50px;
  padding: 4px;
  background: #2c3e50;
  font-size: x-large;
  color: white;
}

.auto-complete-search-card ul {
  margin-top: auto;
  position: absolute;
  width: 30.65%;
  max-height: 40%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: dimgrey;
  color: white;
  z-index: 1000;
}

.auto-complete-search-card li {
  padding: 8px;
  cursor: pointer;
}

.auto-complete-search-card li.highlighted {
  background-color: whitesmoke;
  color: black;
}

/*****************     结果信息卡片     **************/
.detailed-information-card {
  width: 100%;
  height: auto;
  display: flex;
  background: #2c3e50;
  border: none;
  flex-direction: row;
}

.detailed-information-card-for-dialog {
  width: 60%;
  height: 100%;
  display: flex;
  background: #2c3e50;
  border: none;
  flex-direction: row;
}


.head-picture-container {
  width: 30vw;
  height: auto;
  display: flex;
  flex-direction: column;
}

.head-picture {
  width: 100%;
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  object-fit: fill;
}

.main-picture {
  width: 100%;
  height: auto;
  object-fit: fill;
}

.single-picOrMovie-card {
  width: 7vw;
  object-fit: fill;
}


.detailed-information-container {
  width: 30%;
  height: auto;
  padding-top: 0;
  padding-right: 0;
  padding-left: 1%;
  display: flex;
  flex-direction: column;
}

.Action-field-card {
  width: 100%;
  height: 4%;
  background: darkslategray;
  margin-top: 5px;
  margin-bottom: 3px;
  border: none;
}

.Action-field-card:deep(.el-card__body) {
  padding: 0;
}

.Action-field-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.search-related-card {
  width: 100%;
  height: 26%;
  margin-top: 0.5%;
  background: #2c3e50;
  border: none;
  border-radius: 10px;
}

.search-related-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

}

.user-love-command-container {
  width: 55%;
  height: 100%;
  padding-right: 1%;
  padding-top: 1%;
  padding-bottom: 0.5%;
  border: none;
  display: flex;
  flex-direction: column;
  background: #213547;
}
.user-information-card {
   width: 100%;
   height: 30%;
   border: none;
   border-radius: 10px;
   display: flex;
  flex-direction: column;
  background: #2c3e50;
 }
.user-information-head-container {
  width: 100%;
  height:30%;
  display:flex;
  flex-direction: row;
}
.user-information-body-container{
  width: 100%;
  height: 70%;
  margin-top:0;
}
.user-love-card {
  width: 100%;
  height: 25%;
  margin-top:1% ;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: #2c3e50;
}

.user-love-head-container {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  margin-right: 0;

}

.user-love-preCard-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x:auto ;
  overflow-y: hidden;
  gap: 2.6%;
}
.user-command-card {
  width: 100%;
  height: 43%;
  margin-top:1% ;
  background: #2c3e50;
  border-radius: 10px;
  border: none;
}
.user-command-head-container {

}
.user-command-preCard-container{

}

.videoContainer {
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}

.fullscreenVideo {
  width: 100%;
  height: 100%;
  object-fit: fill
}

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
}

.title2 {
  background: url("../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.product_table {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.add_cashier_button {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.left-image {
  width: 150px; /* 设置图片宽度 */
  height: auto; /* 自适应高度 */
  margin-right: 10px; /* 图片与文本之间的间距 */
}

.transparent-button {
  background-color: transparent; /* 设置背景为透明 */
  border: none; /* 去掉边框 */
  color: #000; /* 设置字体颜色，可以根据需要调整 */
  cursor: pointer; /* 鼠标悬停时显示手形光标 */
  padding: 10px 20px; /* 设置内边距 */
  font-size: 16px; /* 设置字体大小 */
}

::-webkit-scrollbar {
  width: 6px; /* 对垂直滚动条有效 */
  height: 10px; /* 对水平滚动条有效 */
}

/* 定义滚动条的轨道颜色、内阴影及圆角 */
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #1a1a1a;
}

/* 定义滑块颜色、内阴影及圆角 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #555;
}

/* 定义滑块悬停变化颜色、内阴影及圆角 */
::-webkit-scrollbar-thumb:hover {
  background-color: #646cff;
}

</style>