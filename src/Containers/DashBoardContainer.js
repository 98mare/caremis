import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MenuRoute } from '../Data/MenuRoute'
import imgOne from '../assets/images/logobig.png'
import { Col, Row } from 'antd'
import { quotes } from '../Data/quotesData'


const DashBoardContainer = () => {
  const data = MenuRoute;
  const token = JSON.parse(sessionStorage.getItem('token'));
  const randomElement = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <DashbordContainer>
      <div className="maiTopContainer welcome">
      <div className="left">
          <img src={imgOne} alt="" />
        </div>
        <div className="right">
          <h3> Welcome back {token.username}</h3>

          <p><span><i className="icon-quote-left1"></i></span> {randomElement} <span><i className="icon-quote-right1"></i></span></p>
        </div>
        
      </div>
      {/* <div className="botContainer"> */}
      <Row gutter={[16, 16]}>
        {data.map(e => (
          <>
            {e.key !== "dashbord" ?
              <Col sm={24} md={8} xs={24} lg={6}>
                <NavLink to={e.path} key={e.name}>
                  <div className='cButton' >
                    <span>{e.name}</span>
                    <span><i className={e.icon}></i> </span>
                  </div>
                </NavLink>
              </Col>
              : ''}
          </>
        ))}

      </Row>
      {/* </div> */}
    </DashbordContainer>

  )
}

export default DashBoardContainer

const DashbordContainer = styled.div`
.welcome{
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 23px;
  h3{
    color: var(--primary);
    font-size: 28px;
    @media(max-width: 800px) {
      font-size: 22px;
    }
  }
  p{
    color: var(--secondary);
    font-size: 18px;
    
    @media(max-width: 800px) {
      font-size: 16px;
    }
    span{
      i{
        font-size: 20px;
      }
    }
  }
  .right{
    flex: 0.6;
    padding: 0 40px;
    @media(max-width: 800px) {
      flex: 0.5;
      padding: 0px;
    }
  }
  .left{
    flex: 0.4;
    text-align: center;
    img{
      width: 73%;
    }
    @media(max-width: 800px) {
      flex: 0.5;
    }
  }
  @media(max-width: 800px) {
    padding: 10px;
  }
  @media(max-width: 576px) {
    display: none;
  }
}

.botContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 25px;
  width: 100%;
  
  @media(max-width: 500px){
    padding: 0px;
    justify-content: center;
    gap: 15px;
    margin-bottom: 50px;
  }
}
  
  
  .cButton{
    height: 120px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    span{
      font-size: 20px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i{
        font-size: 25px;
        color: var(--primary);
      }
    }
    
    @media(max-width: 768px){
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
      height: 80px;
    }
   
  }
`