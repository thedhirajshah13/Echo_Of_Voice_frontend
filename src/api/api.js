import axios from 'axios'

function userpost(datas){
const url='https://localhost:8000/register'
    axios.post(url,datas).then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })
}

export default userpost;