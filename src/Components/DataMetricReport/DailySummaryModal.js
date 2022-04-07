import { useDispatch } from "react-redux";
import { Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getUserAndPayDetailsApi } from "../../services/datametricService";

const DailySummaryModal = (props) => {
    const { visible, handleCancel, fromToDate } = props;
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();

    const tableHead = [
        {
            title: 'Patient Info',
            dataIndex: 'FirstName',
            key: 'Name',
            render: (text, record) => {
                let fullName = `${text} ${record.MiddleName} ${record.LastName}`
                let ager = `(${record.Age})`
                return (
                    <>
                        <div>{fullName},</div>
                        <div>{ager}</div>
                        <div>{record.ContactNo}</div>
                    </>
                )
            }
        },
        {
            title: 'Bill No',
            dataIndex: 'BillNo',
            key: 'BillNo',
        },
        {
            title: 'Created On',
            dataIndex: 'CreatedOn',
            key: 'CreatedOn',
            render: (text, record) => (
                `${text.split('T')[0]} (${record.CreatedOnNepaliDate})`
            )
        },
        {
            title: 'Requestor',
            dataIndex: 'Requestor',
            key: 'Requestor',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Remaining Amount',
            dataIndex: 'RemainingAmount',
            key: 'RemainingAmount',
        },
        {
            title: 'Total Price',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
        },
    ]

    useEffect(() => {
        if (visible === true) {
            let newData = {
                ...fromToDate,
            }
            getDataForReport(newData)
        }
    }, [visible])

    const getDataForReport = (data) => {
        dispatch(getUserAndPayDetailsApi(data, (val) => {
            setTableData(val);
        }))
    }

    const handleCancelClick = () => {
        handleCancel(false)
    }

    return (
        <>
            <Modal
                title="Details"
                visible={visible}
                onCancel={handleCancelClick}
                width={1000}
                style={{ top: 20 }}
                // , width: '100vw'
                footer={null}
            >
                <div className="">
                    <Table className='tableWidth'
                        columns={tableHead}
                        dataSource={tableData}
                    />
                </div>
            </Modal>
        </>
    )
}
export default DailySummaryModal