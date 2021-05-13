import MaterialTable from 'material-table'
import { useEffect, useState } from 'react';
function Home()
{
    const [content,setContent]=useState([])
    useEffect(()=>{
        fetch('/details',{
            method:"get",
            headers:{
            "Content-Type":"application/json",
                }
            })
        .then(res=>res.json())
        .then(result=>{
            setContent(result);
        })
    // eslint-disable-next-line
    },[])
    return (
        <div>
            <MaterialTable title="User DataBase" 
                columns={[{title:"S.NO",field:"id"},{title:"Name",field:"name"},{title:"Mail",field:"mail"},{title:"PhoneNumber",field:"phoneNumber"}]}   data={content} style={{alignContent:"center",marginLeft:"20%",maxWidth:"60%",marginTop:"5%"}} options={{
                         search: false
                         }} />
        </div>
    )
}
export default Home;