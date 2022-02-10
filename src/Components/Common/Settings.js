import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {settingsMenu} from '../../Data/MenuRoute'

const Settings = () => {
  const data = settingsMenu;
  return (
    <SettingsContainer>
      {data.map(e => (
          <div key={e.name}>
            {e.key !== "dashbord" ? 
            <NavLink to={e.path}>
              <div className='cButton'>
                
                  <span>{e.name}</span>
                  <span><i className={e.icon}></i> </span>
               
              </div> 
              </NavLink>
           
             
             : ''}
          </div>
        ))}
    </SettingsContainer>
  )
}

export default Settings

const SettingsContainer = styled.div`
   padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  width: 100%;
  
  
  @media(max-width: 500px){
    padding: 0px;
    justify-content: center;
    gap: 15px;
    margin-bottom: 50px;
  }
  
  .cButton{
    height: 120px;
    width: 230px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: var(--secondaryBackground);
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    span{
      font-size: 20px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i{
        font-size: 25px;
        color: var(--primary)
      }
    }
    
    @media(max-width: 768px){
      width: 200px;
      gap: 10px;  
      span{
      font-size: 16px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      margin-right: 10px;
      
      i{
        font-size: 25px;
      
      }
    }
    }
    @media(max-width: 500px){
      width: 310px;
      height: 80px;
    }
   
  }
`