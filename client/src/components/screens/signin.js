import {useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
function SignIn()
{
    const history=useHistory()
    const [password,setPassword]=useState("")
    const [mail,setMail]=useState("")
    function Login()
    {
        if (password !== "" && mail !== ""){
            fetch('/signin',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    mail,
                    password
                })
            })
            .then(res=>res.json())
            .then(message=>{
                if (message.error)
                M.toast({html:message.error,classes:"red"})
                else
                {
                    M.toast({html:message.message,classes:"green"})
                    history.push('/home')
                }
            })
        }
        else
        M.toast({html:"Enter all the fields !",classes:"red"})
    }
    return (
        <div>
            <h4 style={{textAlign:"center",marginTop:"8%"}}>Log In</h4>
            <div className="cn1 input-field signin" >
                    <div className="file-field input-field">
                        <div className="btn btn1 disabled">
                            <i className="fas fa-envelope new1" aria-hidden="true"></i>
                        </div>
                        <div className="file-path-wrapper input-field">
                            <input className="input1" type="email" placeholder="Mail Id"
                            value={mail}
                            onChange={(event)=>setMail(event.target.value)} required/></div>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn btn1 disabled">
                            <i className="fa fa-key new1" aria-hidden="true"></i>
                        </div>
                        <div className="file-path-wrapper input-field">
                            <input className="input1" type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)} required/>
                        </div>
                    </div>
                    <button className="btlogin" onClick={()=>Login()}>Login</button>
                    <br />
                    <h5><Link to="/signup">Create Account !</Link></h5>
            </div>
        </div>
    )
}
export default SignIn;