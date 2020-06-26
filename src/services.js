import axios from "axios";

const url = 'http://localhost:3000/api/';
class Services
{
    //uzmi postove
    static getPosts() {
        return new Promise ((resolve,reject) => {
            axios.get(url+'reactions/getreactions').then((res) => {
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
            axios.get(url+'settings/getsettings').then((res) => {
                const data = res.data;
              
                resolve(
                   data.map( (adminMessage,adminMessageduration,emoticonNumber)=> ({
                        ...adminMessage,
                        ...adminMessageduration,
                        ...emoticonNumber
                    }))
           //    JSON.stringify(data[0].brojEmotikona)
                
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    // Inserting reactions.
    static insertReaction(emoticon)
    {
        axios.post(url+'reactions/insertreaction', {"id": emoticon});
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

    static updatePost(poruka,trajanjePoruke,brojEmotikona)
    {
           axios.put('http://localhost:3000/getsettings/'+poruka+'/'+trajanjePoruke+'/'+brojEmotikona,{    
            poruka,
            trajanjePoruke,
            brojEmotikona
        }
        );
    }

    //obrisi post
    static deletePost(id)
    {
        return axios.delete(`${url}${id}`);
    }

    //Counting reactions
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

export default Services;
