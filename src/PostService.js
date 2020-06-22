import axios from "axios";
import store from "store";

const url = 'http://localhost:3000/getreaction/';
const urlsettings = 'http://localhost:3000/getsettings';
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
            axios.get(urlsettings).then((res) => {
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
        axios.get('http://localhost:3000/insertreaction/'+emoticon,{
        emoticon
        });
    }
    static ec(x) //COUNT(emoticon)
    {
        return new Promise ((resolve,reject) => {
            axios.get('http://localhost:3000/ec/'+x).then((res) => {
                const data = res.data;
                resolve(
                    data.filter( (id,date,emoticon)=> ({
                        ...id,
                        ...date,
                        ...emoticon
                    }
                    )
                    )
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    static updatePost(poruka,trajanjePoruke,brojEmotikona)
    {
           axios.put('http://localhost:3000/getsettings/'+poruka+'/'+trajanjePoruke+'/'+brojEmotikona,{    
            poruka,
            trajanjePoruke,
            brojEmotikona
        }
        );
        store.commit("updatebrojEmotikona",brojEmotikona);
    }
    //obrisi post

    static deletePost(id)
    {
        return axios.delete(`${url}${id}`);
    }
    static getEmoticons() 
    {
   
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