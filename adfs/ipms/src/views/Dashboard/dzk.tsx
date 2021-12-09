import React from 'react'

export default function DzkComp(props:any)
{
    return(
    <>
    <div style={{ display:"block", textAlign:"center"}} >
        <img style={{maxHeight:1166, maxWidth:966}}src={process.env.PUBLIC_URL + "/img/dzk.png"}></img>
    </div>
    </>
    )
}