// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card } from 'reactstrap'
import axiosInstance from "../../utility/axiosInstance"


// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
  const [keyword, setKeyword] = useState(value)
  let timeoutId = 0
  const keywordhandler = (e) => {
      setKeyword(e.target.value)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      handleFilter(e.target.value)
    }, 800)
  }
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
          {/*<Button.Ripple tag={Link} to='/apps/invoice/add' color='primary'>*/}
          {/*  Add Record*/}
          {/*</Button.Ripple>*/}
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'>Search</Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-120'
              type='text'
              value={keyword}
              onChange={e => keywordhandler(e)}
              placeholder='Search Space'
            />
          </div>
          <Input className='w-auto pr-4' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>Select Status</option>
            <option value='pending'>Pending</option>
            <option value='listed'>Listed</option>
            <option value='hidden'>hidden</option>
          </Input>
        </Col>
      </Row>
    </div>
  )
}

const SpaceList = () => {
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalAmount, setTotalAmount] = useState(1)
    const [data, setData] = useState([])

  useEffect(() => {

    axiosInstance.get(`/space/GetAllSpaces?status=${statusValue}&keyword=${value}&page=${currentPage}&amount=${rowsPerPage}`)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data)
            setData(res.data.spaces)
          }
        })
    axiosInstance.get(`/space/CountAllSpaces?status=${statusValue}&keyword=${value}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.number)
            setTotalAmount(Number(res.data.number))
          }
        })
  }, [value, currentPage, statusValue, rowsPerPage])

  const handleFilter = val => {
    setValue(val)
  }

  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const [count, setCount] = useState(1)
    useEffect(() => {
      setCount(Number((totalAmount / rowsPerPage).toFixed(0)) + 1)
    }, [totalAmount])


    return (
      <ReactPaginate
        pageCount={count || 1}
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        activeClassName='active'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }


  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={data}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default SpaceList
