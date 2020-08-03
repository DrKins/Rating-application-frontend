import axios from "axios";
const url = 'http://praksans.dyndns.org/api/';
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
                           console.log(response);
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
                    console.log(data),
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
                           console.log(response);
                        })
                       .catch((err) => reject(err));
            });
          }
// Updating settings of company.
static updateSettings(token,message, duration, emoticonCount)
{
    axios.post(url+'settings/setsettings', {
        'message': message, 'duration' : duration, 'emoticonCount' : emoticonCount }, { headers: { Authorization: `Bearer ${token}`}})
        .then(() => {
          }, (error) => {
            console.log(error);
          });
} 
// Registration of new companies and users.
static register(token,username,password,level,company)
{
    axios.post(url+'users/register', {"username":username,"password":password,"level":level,"company":company}, { headers: { Authorization: `Bearer ${token}`}})
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
}

export default Services;
