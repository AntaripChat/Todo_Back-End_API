
const userRegistration = (user)=>{

    return {
        subject:"Registered to TODO app",
        html:`
        <div>
        <h3> Hello ${user.name} , </h3>
        <br/>
        <br/>
        <h4>You have registered successfully  with email ${user.email}</h4>
        <br/>
        Your userId required at the time of login will be ${user.userId}
        <br/>
        <br/>
        <h5>Thanks & Regards 
        TODO app dev team</h5>
        <br/>
        <br/>
        <br/>
        <img height="100" width="100" src="https://images.ctfassets.net/lzny33ho1g45/6HrRibvXMoNeGMPq3CIg8S/3febce9eae1d8e03f100178a5ffecec2/best-crm-app-00-hero.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760"/>
        </div>
        `
    }

}


module.exports={
    userRegistration
}