import { message, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import { CSVLink } from 'react-csv';
import { useDispatch } from "react-redux"
import { getListofcompany } from '../../services/datametricService';
import { newTableStyles } from './TableStyles';
import { Link } from 'react-router-dom';
import { image } from '../../assets/images/logo1.png'

const PageHeader = ({ pageTitle, buttonTitle, buttonOnClick, csvLinkTitle, csvDataName, csvData, forGroup, forGroupButtonClick, forCon, forConButtonClick, printFileName, reportName, tableHead, fromToDate, removetwo, selctorr }) => {
  const dispatch = useDispatch();
  const [companyDetail, setcompanyDetail] = useState([]);

  useEffect(() => {
    dispatch(getListofcompany(data => {
      setcompanyDetail(data[0])
    }))
  }, [])

  //print handler
  //needs csvData, tableHead, fromTodate
  const printHandle = () => {
    if (csvData.length !== 0) {
      // if(1 === 1){
      let newWindow = window.open()
      console.log('new window')
      var adbs = require("ad-bs-converter");
      var nepaliFromDate = fromToDate.fromdate;
      var nepaliToDate = fromToDate.todate;
      var neaplaiFromToDateString = [];
      if (nepaliFromDate !== undefined) {
        var nNepaliFromDate = nepaliFromDate.replaceAll("-", "/");
        var nNepaliToDate = nepaliToDate.replaceAll("-", "/");
        var converterNepaliFromDate = adbs.ad2bs(nNepaliFromDate);
        var converterNepalitoDate = adbs.ad2bs(nNepaliToDate);
        var converteNpFromDate = `${converterNepaliFromDate.en.year}-${converterNepaliFromDate.en.month}-${converterNepaliFromDate.en.day} `
        var converteNpToDate = `${converterNepalitoDate.en.year}-${converterNepalitoDate.en.month}-${converterNepalitoDate.en.day} `
        neaplaiFromToDateString.push(converteNpFromDate, converteNpToDate);
      }
      console.log(neaplaiFromToDateString);


      let newStyle = ``
      if (removetwo)
        newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`

      let refName = `
      <div class="gocenter">
      <div class="printConatiner">
        <div class="logo">
          <img src="../../assets/images/logobig.png" alt="company logo" width="100" height="100">
        </div>
      <div class="topright">
        <h2> Caompany name </h2>
        <p>Address: Company address </p>
        <p>Contact no: 90-9809809809 </p>
        <p>E-mail: 90-9809809809 </p>
        <p>Pan-no: 90-9809809809 </p>
      </div>
    </div>
    <h2>${reportName} Report</h2>
    </div>
    <div class="gocenter">
    <div class="printConatiner">
      <div class="border printleft">
        <div class="">
          <h2> requestor Caompany name </h2>
          <p>Address: Requestor Company address </p>
        </div>  
        <div>
          <strong>From</strong> ${neaplaiFromToDateString[0]} - <strong>To</strong> ${neaplaiFromToDateString[1]}
        </div>
      </div>
      <div class="printright">
        <div class="border smallBox topright">
          <p> Client Code</p>
          <p>908080980 </p>
        </div>
        <div class="border smallBox topright">
          <p>Total O/S including</p>
          <p>908080980 </p>
        </div>
        <div class="border smallBox topright">
          <p>Invoice No.</p>
          <p>908080980 </p>
        </div>
        <div class="border smallBox topright">
          <p>Invoice Date</p>
          <p>908080980 </p>
        </div>
        <div class="border smallBox topright">
        <p>Invoice Amount</p>
        <p>908080980 </p>
      </div>
      <div class="border smallBox topright">
        <p>Page No.</p>
        <p>908080980 </p>
      </div>
        
      </div>
    </div>
    </div>
    </div>
      <div class="headingContent">
      <div>
      ${selctorr !== undefined ? `${reportName} Name: ${csvData[0][selctorr]}` : ``}
      </div>
      
      </div>
      `;

      let tableBody = '';
      let tableHeadHtml = '<thead>';
      let columns = [];

      tableHead.forEach(ele => {
        tableHeadHtml += `<th>${ele?.dataIndex}</th>`;
        columns.push(ele.dataIndex);
      })
      tableHeadHtml += '</thead>';

      csvData.forEach(ele => {
        tableBody = tableBody + '<tr>'
        columns.forEach(cell => {
          tableBody = tableBody + '<td>' + ele[cell] + '</td>'
        })
        tableBody = tableBody + '</tr>'
      })

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`

      let footer = `
        <div class="border" style="display: flex; padding: 10px 30px 10px 10px; justify-content: end;">
          <div class="topright">
            <div class="amount">
              <h5>Total Amount</h5>
              <p>Rs. 1000</p>
            </div>
            <div class="amount">
              <h5>Discount</h5>
              <p>Rs. 1000</p>
            </div>
            <div class="amount">
              <h5>Net Amount</h5>
              <p>Rs. 1000</p>
            </div>
            
          </div>
        </div>
        <div class="border gocenter">
          <p>Demand Draft/Cheque to be drawn in favour of, 'SRL Diagonostics (Nepal) Pvt.Ltc.'</p>
          <div class="amount" style="padding: 20px; ">
            <p class="" style="">Enter By:</p>
            <p class="" style="border-top: 1px dotted">Enter By:</p>
          </div>
          <p >Copntent of hte Invoice will be considered if no errors are reported within 15 days of receipt of invoice. To assure proper credit your account please mention Client code & Invoice no. on your Remitetance.</p>
        </div>
        

      `
{/* <div class="border">
        <p>In words</p>
        </div> */}
      newWindow.document.body.innerHTML = newTableStyles + newStyle + refName + allTable + footer

      setTimeout(function () {
        // newWindow.print();
        // newWindow.close();
      }, 300);

    } else {
      message.info('select some data');
    }
  }


  return (
    <PageHeaderContainer>
      {/* for msi only */}
      <div className="mis">
        <Link className='coButton' to='/datametric'>
          <span>
            <i className='icon-line2-home'></i> MIS
          </span>
        </Link>
        <Link className='coButton' to='/datametric'>
          <span>
            Crystal Diagnostic Lab
          </span>

        </Link>
      </div>


      {/* for msi only end */}
      <Row justify='space-between align-center'>

        <span className='pageTtitle'>{pageTitle}</span>
        <Row style={{ gap: '10px' }}>
          {forCon && <AppButton buttonTitle={forCon} buttonOnClick={forConButtonClick} primaryBtn ></AppButton>}

          {buttonTitle && <AppButton buttonTitle={buttonTitle} buttonOnClick={buttonOnClick} primaryBtn ></AppButton>}

          {forGroup && <AppButton buttonTitle={forGroup} buttonOnClick={forGroupButtonClick} primaryBtn ></AppButton>}

          {
            csvDataName &&
            <div className='link'>
              <CSVLink filename={csvDataName} className="btn ant-btn btn-primary btn-primary--outline" data={csvData}>Export CSV</CSVLink>
            </div>
          }

          {
            printFileName &&
            <button
              onClick={() => printHandle()}
              className="btn ant-btn btn-primary btn-primary--outline"
            >
              Print
            </button>
          }

        </Row>
      </Row>
    </PageHeaderContainer>
  )
}

export default PageHeader

const PageHeaderContainer = styled.div`
  /* background-color: #fefefe; */
  padding: 10px 10px;
  width: 100%;
  align-items: center;
  .mis{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .coButton{
    background-color: var(--primary);
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 5px;
   
    span{
      display: flex;
      gap: 10px;
      color: #fefefe;
      justify-content: center;
      align-items: center;
      i{

      }
    }

  }
`