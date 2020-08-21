<template>
<div id="admin">
      <div class="nav">
        <logotype/>
        <span class="spacer"></span>
       <ul>
        <li @click="controller.today = true; controller.reports = false; controller.settings = false; controller.users =false;" :class="{active: controller.today}"><span class="gg-media-live"></span><a>Today</a></li>
        <li @click="controller.reports = true; controller.today = false; controller.settings = false; controller.users =false;" :class="{active: controller.reports}"><span class="gg-insights"></span><a>Reports</a></li>
        <li @click="controller.settings = true; controller.today = false; controller.reports = false; controller.users =false;" :class="{active: controller.settings}"><span class="gg-terminal"></span><a>Settings</a></li>
        <li v-if="getLevel.level != 1" @click="controller.users = true; controller.today = false; controller.reports = false; controller.settings = false;" :class="{active: controller.users}"><span class="gg-profile"></span><a>Users</a></li>
        <li @click="reloading" class="logout"><span class="gg-close"></span><a>Logout</a></li>
      </ul>
    </div>
  <div id="container">
    <div id="message">
      <div id="greet">Welcome <b>{{getLevel.user}}</b> - You are logged in panel of <b>{{getLevel.company}}</b>.</div>
      <div id="date"><div class="date-0">{{this.date.date}}</div><div class="date-1">{{this.date.hours}}</div></div>
      </div>
    <div id="today" v-if="controller.today">
      <today/>
    </div>
    <div id="reports" v-if="controller.reports">
      <reports/>
    </div>
    <div id="settings" v-if="controller.settings">
      <settings/>
    </div>
    <div id="users" v-if="controller.users">
      <users/>
    </div>
</div>
</div>
</template>

<script>

// import Services from '../services/api';
import { mapGetters} from 'vuex';
import today from '../components/today';
import reports from '../components/reports';
import settings from '../components/settings';
import users from '../components/users';
import logotype from '../components/logotype'
export default {
  name: 'Admin',
  components: {
    today,
    reports,
    settings,
    users,
    logotype
  },
    data: function()
    {
        return {
          // Controller object that has control variables for displaying purposes only.
          controller: {
            today: true,
            reports: false,
            settings: false,
            users: false
          },
          // Date object used to show time on top right corner.
          date: {
            hours: '',
            date: new Date().toJSON().slice(0,10).replace(/-/g,'/')
          }
        }
    },
    methods: {
      // Method that redirects from current page to login.
    reloading() {
       this.$router.push('/');
       location.reload();
     },
     // Clock in real time.
    startTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = this.checkTime(m);
      s = this.checkTime(s);
      this.date.hours = h + ":" + m + ":" + s;
      setTimeout(this.startTime, 500);
    },
    // Function that adds zero in front of numbers that are less than 10
    checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i;
    }
    },
    computed: {
      ...mapGetters({
        getToken : 'get_token',
        getLevel : 'get_level'
      }),
    },
    created(){
      // Calling clock function to start.
      this.startTime();
    }
}
</script>

<style scoped>
#admin{
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: auto 10%;
  margin-top:10vh;
}
#container {
  display: flex;
  height: 75vh;
  width: 75vw;
  flex-direction: column;
  padding: 1vw 1vh;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(32, 32, 32, 0.241),
    0 12px 12px rgba(32, 32, 32, 0.35);
}
#message{
  margin-top: 1vh;
  padding:1vh auto;
  display: flex;
  height: 4vh;
  width: 73vw;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(32, 32, 32, 0.241),
    0 12px 12px rgba(32, 32, 32, 0.35);
}
#greet{
  margin: auto 1vw;
}
#date{
  display: flex;
  background-color:rgba(43, 128, 226, 0.45);
  margin-top:5px;
  width:30vw;
  align-items: center;
  justify-content: space-around;
  border: 1px solid rgba(235, 235, 235,0.5);
  border-radius: 0px 0px 10px 0px;
}
.nav {
  display: flex;
  margin-right: 1vw;
  height: 75vh;
  width: 10vw;
  flex-direction: column;
  align-items: center;
  padding: 1vw 1vh;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(32, 32, 32, 0.241),
    0 12px 12px rgba(32, 32, 32, 0.35);
}
li {
  align-items: center;
  justify-content: center;
  margin: 2.2vh auto;
  padding: 1vh 1vw;
  border-radius: 5%;
  background-color: rgba(28, 110, 164, 0.1);
}
 
.nav a {
  text-decoration: none;
  color: #fff;
  margin: -1vh auto;
  width:inherit;
}
 
.nav li:hover {
  background-color: rgba(30,41,59,0.5);
}
.FormDate {
  display: inline-flex;
  position: relative;
  justify-content: space-evenly;
  background-color: transparent;
  border-radius: 0.25em;
  outline: none;
  border-style: hidden;
  padding: 2%;
  outline: none;
}
 .button
{
  transition: ease-in 250ms;
  padding: 10px;
  width: 100px;
  height: 50px;
  border: 2px inset rgb(28, 110, 164);
  border-radius: 50px;
  background-color: transparent;
  color: white;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
  0 1px 1px rgba(32, 32, 32, 0.155),
  0 2.1px 2.1px rgba(32, 32, 32, 0.195),
  0 4.4px 4.4px rgba(32, 32, 32, 0.241),
  0 12px 12px rgba(32, 32, 32, 0.35);
  outline:none;
} 
.button:hover {
  background-color: rgba(28, 110, 164, 0.7);
}
.active{
  align-items: center;
  justify-content: center;
  margin: 2.2vh auto;
  padding: 1vh 1vw;
  background-color: rgba(28, 110, 164, 0.4);
  border-radius: 5%;
}
.none {
  display:none;
}
.gg-close {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 40px;
    margin:auto auto;
}
.gg-close::after,
.gg-close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px
}
.gg-close::after {
    transform: rotate(-45deg)
}
 .gg-media-live {
 transform: scale(var(--ggs,1))
}

.gg-media-live,
.gg-media-live::after {
 border-top-color: transparent;
 border-bottom-color: transparent
}

.gg-media-live,
.gg-media-live::after,
.gg-media-live::before {
 box-sizing: border-box;
 position: relative;
 display: block;
 border: 2px solid;
 border-radius: 50%;
 width: 14px;
 height: 14px
}

.gg-media-live::after,
.gg-media-live::before {
 content: "";
 position: absolute;
 width: 6px;
 height: 6px;
 top: 2px;
 left: 2px
}

.gg-media-live::after {
 width: 22px;
 height: 22px;
 top: -6px;
 left: -6px
} 
  .gg-insights {
 box-sizing: border-box;
 position: relative;
 display: block;
 width: 25px;
 height: 25px;
 transform: scale(var(--ggs,1));
 border-left: 8px solid transparent;
 border-top: 4px solid transparent;
 box-shadow: inset 0 0 0 2px
}

.gg-insights::after,
.gg-insights::before {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute;
 width: 6px;
 height: 16px;
 border: 2px solid;
 right: 4px;
 bottom: 0
}
.gg-insights::before {
 height: 8px;
 right: 8px
} 
 .gg-terminal {
 box-sizing: border-box;
 position: relative;
 display: block;
 transform: scale(var(--ggs,1));
 width: 24px;
 height: 20px;
 border: 2px solid;
 border-radius: 2px
}

.gg-terminal::after,
.gg-terminal::before {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute
}

.gg-terminal::before {
 border-right: 2px solid;
 border-bottom: 2px solid;
 transform: rotate(-45deg);
 width: 6px;
 height: 6px;
 top: 5px;
 left: 3px
}

.gg-terminal::after {
 width: 4px;
 height: 2px;
 background: currentColor;
 top: 10px;
 left: 11px
} 
 .gg-profile,
.gg-profile::after,
.gg-profile::before {
 display: block;
 box-sizing: border-box;
 border: 2px solid;
 border-radius: 100px
}

.gg-profile {
 overflow: hidden;
 transform: scale(var(--ggs,1));
 width: 22px;
 height: 22px;
 position: relative
}

.gg-profile::after,
.gg-profile::before {
 content: "";
 position: absolute;
 top: 2px;
 left: 5px;
 width: 8px;
 height: 8px
}

.gg-profile::after {
 border-radius: 200px;
 top: 11px;
 left: 0px;
 width: 18px;
 height: 18px
} 
.spacer {
  margin:1vh auto;
  height:0.3vh;
  width: 7vw;
  background-color:rgb(203, 206, 36);
}

@media screen and (min-width: 600px) and (min-height: 450px){
  .nav li {
    display: inline-flex;
    flex-direction: column;
    width: 120px;
    border-bottom: none;
    height: 50px;
    line-height: 40px;
    font-size: 1.4em;
  }
}

@media screen and (max-width: 600px) {
    #message{
      font-size: 0.5rem;
    }
    li span{
      max-height: 3vh;
      max-width: 10vw;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 7vh;
      font-size: 0.7rem;
    }
    .active{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 7vh;
      font-size: 0.7rem;
    }
}
@media screen and (max-height: 411px) and (orientation: portrait) {
    li span{
      max-height: 3vh;
      max-width: 10vw;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 7vh;
      font-size: 0.7rem;
    }
    .active{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 7vh;
      font-size: 0.7rem;
    }
}
@media screen and (max-height: 450px) and (orientation: landscape) {
    div{
      font-size: 0.5rem;
    }
    li span{
      opacity: 0;
      max-height: 0vh;
      max-width: 0vw;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 7vh;
      font-size: 0.7rem;
    }
    .active{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 7vh;
      font-size: 0.7rem;
    }
}
</style>