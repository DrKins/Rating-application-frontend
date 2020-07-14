import axios from "axios";

const url = 'https://praksans.dyndns.org/api/';
axios.defaults.withCredentials = false;
class Services
{

// Picking up settings for updateGUI on Home.vue
    static getSettings(token) {
        return new Promise ((resolve,reject) => {
            console.log(token);
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
                    console.log(data)
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
                 'id': id}, { headers: { Authorization: `Bearer ${token}`}})
                 .then(() => {
                   }, (error) => {
                     console.log(error);
                   });
         }
// Login system.
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
                console.log(token);
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
    // static ec(x) //COUNT(emoticon)
    // {
    //     return new Promise ((resolve,reject) => {
    //         axios.get('http://localhost:3000/ec/'+x).then((res) => {
    //             const data = res.data;
    //             resolve(
    //                 data.filter( (id,date,emoticon)=> ({
    //                     ...id,
    //                     ...date,
    //                     ...emoticon
    //                 }
    //                 )
    //                 )
    //             );
    //         })
    //         .catch((err)=> {
    //             reject(err);
    //         })
            
    //     });
    // }
}

export default Services;
