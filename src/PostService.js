import axios from "axios";

const url = 'http://localhost:3000/getreaction/';
const urlreakcije = 'http://localhost:3000/getsettings';
class PostService
{
    //uzmi postove
    static getPosts() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(emoticon => ({
                        ...emoticon,
                        createdAt: new Date(emoticon.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    static getSettings() {
        return new Promise ((resolve,reject) => {
            axios.get(urlreakcije).then((res) => {
                const data = res.data;
              
                resolve(
                   data.map( (poruka,trajanjePoruke,brojEmotikona)=> ({
                        ...poruka,
                        ...trajanjePoruke,
                        ...brojEmotikona
                    }))
           //    JSON.stringify(data[0].brojEmotikona)
                
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    //napravi post
    static insertPost(emoticon)
    {
        return axios.get('http://localhost:3000/insertreaction/'+emoticon,{
        emoticon
        });
    }
    static updatePost(poruka,trajanjePoruke,brojEmotikona)
    {
           return axios.put('http://localhost:3000/getsettings/'+poruka+'/'+trajanjePoruke+'/'+brojEmotikona,{    
            poruka,
            trajanjePoruke,
            brojEmotikona
        });
    }
    //obrisi post

    static deletePost(id)
    {
        return axios.delete(`${url}${id}`);
    }

    //brojanje reakcija 
    static countReaction()
    {
        return new Promise ((resolve,reject) => {
            axios.get('http://localhost:3000/countreaction')
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

export default PostService;