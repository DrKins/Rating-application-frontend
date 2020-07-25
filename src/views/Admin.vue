<template>
<div id="admin">
  <div id="container">
    <div class="nav">
       <ul>
        <li><a @click="controller.today = true; controller.reports = false; controller.settings = false; controller.users =false;" :class="{active: controller.today}">Today</a></li>
        <li><a @click="controller.reports = true; controller.today = false; controller.settings = false; controller.users =false;" :class="{active: controller.reports}">Reports</a></li>
        <li><a @click="controller.settings = true; controller.today = false; controller.reports = false; controller.users =false;" :class="{active: controller.settings}">Settings</a></li>
        <li v-if="getLevel === 3"><a @click="controller.users = true; controller.today = false; controller.reports = false; controller.settings = false;" :class="{active: controller.users}">Users</a></li>
      </ul>
    </div>
    <div id="today" v-if="controller.today">
      <span> Ovo je today tab</span>
      <today/>
    </div>
    <div id="reports" v-if="controller.reports">
      <span> Ovo je reports tab</span>
      <reports/>
    </div>
    <div id="settings" v-if="controller.settings">
      <span> Ovo je settings tab</span>
      <settings/>
    </div>
    <div id="users" v-if="controller.users">
      <span> Ovo je users tab</span>
      <users/>
    </div>
</div>
</div>
</template>

<script>

// import Services from '../services/api';
import { mapGetters, mapActions } from 'vuex';
import today from '../components/today';
import reports from '../components/reports';
import settings from '../components/settings';
import users from '../components/users';
export default {
  name: 'Admin',
  components: {
    today,
    reports,
    settings,
    users
  },
    data: function()
    {
        return {
          controller: {
            today: true,
            reports: false,
            settings: false,
            users: false
          }
        }
    },
      // async send(){
      //   this.getStatisticsAction(await Services.getReport(this.getToken,this.parseDate()))
      //   console.log(this.parseDate());
      //     },
    computed: {
      ...mapGetters({
        getToken : 'get_token',
        getLevel : 'get_level'
      }),
    },
    methods: {
      ...mapActions([ // calling mutation that will update token in vuex.
        'getStatisticsAction'
      ]),
    }
}
  //   async created()
  // {
  //   try{
  //     this.settings = await Services.getSettings();
  //   }
  //   catch(err) {
  //     this.error = err.message;
  //   }
  // },
  //   methods:
  //   {
  //      async send()
  //   {
  //     await Services.updatePost(this.message.text,this.message.duzina,this.selected);
  //      this.settings = await Services.getSettings();
  //   }
  //   }
</script>

<style scoped>
#admin{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: auto 10%;
}
#container {
  display: flex;
  height: 75%;
  width: 90%;
  flex-direction: column;
  align-items: center;
  padding: 5px 1px;
  color: white;
  background-color:rgba(30,41,59,0.5);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(32, 32, 32, 0.109),
    0 1px 1px rgba(32, 32, 32, 0.155),
    0 2.1px 2.1px rgba(32, 32, 32, 0.195),
    0 4.4px 4.4px rgba(32, 32, 32, 0.241),
    0 12px 12px rgba(32, 32, 32, 0.35);
}
#settings {
}
body {
  margin: 0;
  padding: 0;
  background: #ccc;
}
 
.nav ul {
  list-style: none;
  background-color: rgba(28, 110, 164, 0.15);
  text-align: center;
  padding: 0;
  margin: 0;
}
.nav li {
  font-family: 'Noto Sans','Oswald', sans-serif;
  font-size: 1.2em;
  line-height: 40px;
  height: 40px;
}
 
.nav a {
  text-decoration: none;
  color: #fff;
  transition: .3s ease-in;
  display: block;
  margin: 5px 5px;
  border-radius: 2%;
}
 
.nav a:hover {
  background-color: rgba(28, 110, 164, 0.7);
}
 
.nav a.active {
  background-color: rgba(28, 110, 164, 0.5);
  color:#fff;
  cursor: default;
}
 
@media screen and (min-width: 600px) {
  .nav li {
    width: 120px;
    border-bottom: none;
    height: 50px;
    line-height: 40px;
    font-size: 1.4em;
  }
 
  /* Option 1 - Display Inline */
  .nav li {
    display: inline-flex;
    flex-direction: column;
  }
 
  /* Options 2 - Float
  .nav li {
    float: left;
  }
  .nav ul {
    overflow: auto;
    width: 600px;
    margin: 0 auto;
  }
  .nav {
    background-color: #444;
  }
  */
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
.none {
  display:none;
}
</style>