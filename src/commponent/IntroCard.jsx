import React from 'react'
import {useAuthContext} from "../Context/authContext"
import ProfileImage from "../asset/profileImage.avif"
import './introCard.css'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

 const IntroCard=()=>{
   const {auth} =useAuthContext()
  
   const {name}=auth
    return (
        <>
          <div className='introCard' >
          <span>
            <Link to='/profile'>{<InfoIcon style={{color:'rgb(62, 59, 59)'}} />}</Link>
          </span>
          <img src={ProfileImage} alt="profileImage"/>
          <h3>Wellcome!</h3>
          <p>{name}</p>
          </div>
        </>
    )
    
 }

export default IntroCard