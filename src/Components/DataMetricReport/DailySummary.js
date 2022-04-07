import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getDailySummaryReport } from "../../services/datametricService";
import { Button, Table, Tag } from "antd";
import DataIsLoading from "../Common/IsLoading";
import DailySummaryModal from "./DailySummaryModal";

const DailySummary = () => {
  const dispatch = useDispatch();
  const [tableData, settableData] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [fromToDate, setfromToDate] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newData, setNewData] = useState({});

  const tableHead = [
    {
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Total Sales',
      dataIndex: 'TotalSales',
      key: 'TotalSales',
    },
    {
      title: 'Collection',
      dataIndex: 'Collection',
      key: 'Collection',
    },
    {
      title: 'Remaining',
      dataIndex: 'Remaining',
      key: 'Remaining',
    },
    {
      title: 'Payment Type',
      dataIndex: 'PaymentType',
      key: 'PaymentType',
      render: (text) => {
        let retColor = ''
        if (text !== null) {
          if (text.toLowerCase() == 'cash')
            retColor = 'green'
          else if (text.toLowerCase() == 'card')
            retColor = 'blue'
          else if (text.toLowerCase() == 'due' || text.toLowerCase() == 'duecollection')
            retColor = 'yellow'
          else if (text.toLowerCase() == 'credit' || text.toLowerCase() == 'creditcollection')
            retColor = 'red'
        }
        return <Tag color={retColor}>{text}</Tag>
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (text, record) => {
        return <Button onClick={() => handleModalClick(record)}>View Details</Button>
      }
    },
  ]

  const getDataForReport = (data) => {
    setIsLoading(true);
    dispatch(getDailySummaryReport(data, (val) => {
      settableData(val)
      setNewTableData(val)
      setIsLoading(false);
    }))
  }

  const dataRet = (val) => {
    let data = {
      ...val,
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getDataForReport(data)
    setfromToDate(data);
  }

  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setNewTableData(tableData)
    } else {
      setNewTableData(val)
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleModalClick = (recordData) => {
    let newData = {
      ...fromToDate,
      CreatedBy: recordData?.CreatedBy,
      PaymentType: recordData?.PaymentType
    }
    setNewData(newData);
    setVisible(true)
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle='Daily Summary Report'
          csvLinkTitle='Export CSV'
          csvData={newTableData}
          csvDataName='dailySummeryReport.csv'
          printFileName
          reportName='Daily Summary'
          tableHead={tableHead}
          fromToDate={fromToDate}
        />
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
          getuserslist
          toCompareData={tableData}
          onSearch
          dataReturn={handleSearch}
          forDailyReport
        />
      </div>
      {
        IsLoading ? <DataIsLoading /> :
          newTableData.length !== 0 ?
            <div className="tableisRes">
              <Table className='tableWidth'
                columns={tableHead}
                dataSource={newTableData}
              />
            </div> : ''
      }
      <DailySummaryModal visible={visible} handleCancel={handleCancel} fromToDate={newData} />
    </>
  )
}

export default DailySummary