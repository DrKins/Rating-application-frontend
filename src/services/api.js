import axios from "axios";
const url = 'https://praksans.dyndns.org/api/';
//const url = 'http://192.168.1.112/api/';
axios.defaults.withCredentials = false;
class Services
{

// Picking up settings for updateGUI.
    static getSettings(token) {
        return new Promise ((resolve,reject) => {
            axios({
                method: 'GET',
                url: url+'settings/getsettings',
                headers: {
                    Authorization: `Bearer ${token}`
                },
              })
            .then((res) => {
                const data = res.data;
                resolve(
                    resolve(data),
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
// Inserting reactions to database.
     static insertReaction(id,token)
         {
             axios.post(url+'reactions/insertreaction', {
                 'emoticon': id}, { headers: { Authorization: `Bearer ${token}`}})
                 .then(() => {
                   }, (error) => {
                     console.log(error);
                   });
         }
// Login system that sends username and password while gets as response session token.
    static login(username, password) 
    {
            return new Promise((resolve, reject) => {
              axios.post(url+'users/login', {
                'username': username,
                'password': password
              })
                       .then((response) => {
                           resolve(response.data)
                        })
                       .catch((err) => reject(err));
            });
          }
// Getting reactions for charts.
    static countReactions(token) {
        return new Promise ((resolve,reject) => {
                axios({
                    method: 'GET',
                    url: url+'reactions/countreaction',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                  })
                .then((res) => {
                    const data = res.data;
                    resolve(data);
                })
                .catch((err)=> {
                    reject(err);
                })
            });
        } 
// Getting statistics from server 
    static getReport(token,date) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: url+'reactions/countreactions/:'+date,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                  })
                       .then((response) => {
                           resolve(response.data)
                        })
                       .catch((err) => reject(err));
            });
          }
// Updating settings of company.
static updateSettings(token,message, duration, emoticonCount,emoticonPack)
{
    axios.post(url+'settings/setsettings', {
        'message': message, 'messageDuration' : duration, 'emoticonCount' : emoticonCount,'emoticonPack':emoticonPack }, { headers: { Authorization: `Bearer ${token}`}})
        .then(() => {
          }, (error) => {
            console.log(error);
          });
} 
// Registration of new companies and users.
static register(token,username,password,level,company)
{
    axios.post(url+'users/register', {"name":username,"password":password,"lvl":level,"company":company}, { headers: { Authorization: `Bearer ${token}`}})
        .then(() => {
          }, (error) => {
            console.log(error);
          });
}
// Getting list of all users.
static getallUsers(token) {
    return new Promise ((resolve,reject) => {
            axios({
                method: 'GET',
                url: url+'users/getallusers',
                headers: {
                    Authorization: `Bearer ${token}`
                },
              })
            .then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
// Getting reactions bydate.
static Bydate(token,date) {
    return new Promise ((resolve,reject) => {
            axios({
                method: 'GET',
                url: url+'reactions/bydate/:'+date,
                headers: {
                    Authorization: `Bearer ${token}`
                },
              })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
//Sending settings for slack.
static Setslack(token,SlackToken,SlackBot,SlackChannel)
{
    axios.post(url+'settings/setslack', {"SlackToken":SlackToken,"SlackBot":SlackBot,"SlackChannel":SlackChannel}, { headers: { Authorization: `Bearer ${token}`}})
        .then(() => {
          }, (error) => {
            console.log(error);
          });
}
}

export default Services;
