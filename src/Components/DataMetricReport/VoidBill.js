import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getReturnedBillDetailsByDateRange } from "../../services/datametricService";
import { Table, Tag } from "antd";
import DataIsLoading from "../Common/IsLoading";

const VoidBill = () => {
  const dispatch = useDispatch();
  const [tableData, settableData] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [fromToDate, setfromToDate] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [tableHead, setTableHead] = useState([]);

  // const tableHead = [
  //   {
  //     title: 'PatientName',
  //     dataIndex: 'PatientName',
  //     key: 'PatientName',
  //   }
  // ]

  const getDataForReport = (data) => {
    setIsLoading(true);
    dispatch(getReturnedBillDetailsByDateRange(data, (val) => {
      settableData(val)
      setNewTableData(val)
    }))
    setIsLoading(false);
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

  useEffect(() => {
    createTableHead()
    return;
  }, [tableData]);
  
  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = []
      tableKeys.forEach(ele => {
        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        })
      })

      setTableHead(data);
    }
  }

  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setNewTableData(tableData)
    } else {
      setNewTableData(val)
    }
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle='Void Bill Report'
          csvLinkTitle='Export CSV'
          csvData={newTableData}
          csvDataName='voidBill.csv'
          printFileName
          reportName='Void Bill'
          tableHead={tableHead}
          fromToDate={fromToDate}
        />
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
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
    </>
  )
}

export default VoidBill