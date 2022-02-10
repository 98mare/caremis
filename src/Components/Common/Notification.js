// import { notification } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd';
import NotificationContent from './NotificationContent';
import { useDispatch } from 'react-redux'
import { getItemNearApi } from '../../services/itemNewItemService';

const Notification = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const getData = () => {
    const pushedArr = []
    dispatch(getItemNearApi(value => {
      value.forEach(ele => {
        pushedArr.push(ele);
      })
      setTableData(pushedArr)
    }))
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <NotificationContainer>
      <Popover
        placement="bottom"
        content={tableData.length > 0?
          <NotificationContent data={tableData} /> : 'no new notification'
        }
        trigger="click">
        <i className='icon-line-bell'></i> {tableData.length > 0 ? <span className='notiCount'>{tableData.length}</span> : ''}
      </Popover>
    </NotificationContainer>
  )
}

export default Notification

const NotificationContainer = styled.div`
  i{
    color: var(--primary);
    width: 32px;
    height: 32px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .notiCount{
    position: absolute;
    color: #ffffff;
    background: var(--primary);
    width: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;
    top: 2%;
    height: 1rem;
    left: 12%;
    font-size: 12px;
  }
`