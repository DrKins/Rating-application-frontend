import axios from "axios";

const url = 'https://praksans.dyndns.org/api/';
axios.defaults.withCredentials = false;
class Services
{

// Picking up from database all posts that are made by clinets already.
    // static getReactions() {
    //     return new Promise ((resolve,reject) => {
    //         axios.get(url+'reactions/getreactions').then((res) => {
    //             const data = res.data;
    //             resolve(
    //                 data.map(emoticon => ({
    //                     ...emoticon,
    //                     createdAt: new Date(emoticon.createdAt)
    //                 }))
    //             );
    //         })
    //         .catch((err)=> {
    //             reject(err);
    //         })
            
    //     });
    // }

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
                console.log(data);
                resolve(
                    resolve(res.data),
                    console.log(res.data)
                );
            })
            .catch((err)=> {
                console.log(`Bearer ${token}`);
                reject(err);
            })
        });
    }
    // Login.
    // static login(username, password)
    //     {
    //         axios.post(url+'users/login', {
    //             'username': username,
    //             'password': password })
    //             .then((response) => {
    //                 var token = response.token;
    //                 console.log(`ovo je token ${token}`);
    //               }, (error) => {
    //                 console.log(error);
    //               });
    //     }

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
