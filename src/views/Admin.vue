<template>
<div id="admin">
  <div id="container">
    <div class="nav">
       <ul>
        <li><a class="active" href="#today">Today</a></li>
        <li><a href="#">Reports</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </div>
    <div id="today"><chart/></div>
    <div id="reports" class="none"><chart/></div>
    <div id="settings" class="none"></div>
  </div>
</div>
</template>

<script>

// import Services from '../services';
import chart from './../components/chart-doughnut'
export default {
  name: 'Admin',
  components: {
    chart,
  },
    data: function()
    {
        return {
             message: 
            {
            text: "",
            duzina: 3
            },
            selected: 3,
            settings : []
        }
    },
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
}
</script>

<style scoped>
#admin{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    line-height: 50px;
    font-size: 1.4em;
  }
 
  /* Option 1 - Display Inline */
  .nav li {
    display: inline-block;
    margin-right: 0px;
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