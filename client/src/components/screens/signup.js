import {useState} from 'react'
import {useHistory,Link} from 'react-router-dom'
import M from 'materialize-css'
function SignUp()
{
    const history=useHistory();
    const [password,setPassword]=useState("")
    const [mail,setMail]=useState("")
    const [name,setName]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("")
    function Register(){
        if (mail === "" || password === "" || name === "" || phoneNumber === "" )
        M.toast({html:"Enter all the fields !",classes:"red"})
        else
        {
            fetch('/signup',{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    mail,
                    password,
                    phoneNumber
                })
            })
            .then(res=>res.json())
            .then(message=>{
                if(message.error)
                M.toast({html: message.error,classes:"red"})
                else
                {
                    M.toast({html:message.message,classes:"green"})
                    history.push('/')
                }
            })
        }
    }
    return (
        <>
            <h4 style={{textAlign:"center",marginTop:"8%"}} >Sign Up</h4>
            <div className="cn1 input-field signin">
                <div className="file-field input-field">
                    <div className="btn btn1 disabled">
                    <i className="fas fa-user"></i>
                    </div>
                    <div className="file-path-wrapper input-field">
                        <input className="input1" type="text" placeholder="User Name"
                        value={name}
                        onChange={(event)=>setName(event.target.value)} required/>
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn btn1 disabled">
                        <i className="fas fa-envelope new1" aria-hidden="true"></i>
                    </div>
                    <div className="file-path-wrapper input-field">
                        <input className="input1" type="email" placeholder="Mail Id"
                        value={mail}
                        onChange={(event)=>setMail(event.target.value)} required/>
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn btn1 disabled">
                        <i className="fa fa-key new1" aria-hidden="true"></i>
                    </div>
                    <div className="file-path-wrapper input-field">
                        <input className="input1" type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value)} required/>
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn btn1 disabled">
                    <i className="fas fa-phone-square-alt"></i>
                    </div>
                    <div className="file-path-wrapper input-field">
                        <input className="input1" type="text" placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(event)=>setPhoneNumber(event.target.value)} required/>
                    </div>
                </div>
                <button className="btlogin" id="btn" onClick={()=>Register()}>Register</button>
                <br />
                <h5><Link to="/">Already having an Account !</Link></h5>
            </div>
        </>
    )
}
export default SignUp;