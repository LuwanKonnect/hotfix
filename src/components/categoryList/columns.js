// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Config File
import {baseUrl} from '@configs/urlConfig'
// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import {
  MoreVertical,
  CheckCircle,
  PieChart, FileText, Trash2, Archive
} from 'react-feather'
import axiosInstance from "../../utility/axiosInstance"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.thumbnail_url) {
    return <Avatar className='mr-50' img={row.thumbnail_url} width='32' height='32' />
  } else {
    return <Avatar color={color} className='mr-50' content={row.category_name ? (`${row.category_name} ${row.category_name}`) : 'Space Category'} initials />
  }
}

// ** Table columns
export const columns = [
  // {
  //   name: 'User Name',
  //   minWidth: '107px',
  //   selector: 'id',
  //   cell: row => <span>{`${row.basicInfo.user_id.firstName} ${row.basicInfo.user_id.lastName}`}</span>
  // },
  // {
  //   name: <TrendingUp size={14} />,
  //   minWidth: '102px',
  //   selector: 'invoiceStatus',
  //   sortable: true,
  //   cell: row => {
  //     const color = (row.status === 'pending' || row.status === 'hidden') ? invoiceStatusObj['Partial Payment'].color : invoiceStatusObj['Paid'].color,
  //       Icon = (row.status === 'pending' || row.status === 'hidden') ? invoiceStatusObj['Partial Payment'].icon : invoiceStatusObj['Paid'].icon
  //     return <Avatar color={color} icon={<Icon size={14} />} />
  //   }
  // },
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row._id || ""}</span>
  },
  {
    name: 'Thumbnail',
    minWidth: '350px',
    selector: 'thumbnail',
    sortable: true,
    cell: row => {
      return (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row)}
          </div>
      )
    }
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.category_name || ""}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            {/*<DropdownItem*/}
            {/*    tag={Link}*/}
            {/*    to={{*/}
            {/*      pathname:`/SpaceDetails/${row._id}`,*/}
            {/*      state: {*/}
            {/*        space: row*/}
            {/*      }*/}
            {/*    }}*/}
            {/*    className='w-100'*/}
            {/*    // onClick={() => store.dispatch(getUser(row.id))}*/}
            {/*>*/}
            {/*  <FileText size={14} className='mr-50' />*/}
            {/*  <span className='align-middle'>Details</span>*/}
            {/*</DropdownItem>*/}
            {/*<DropdownItem*/}
            {/*    tag={Link}*/}
            {/*    to={`/apps/user/edit/${row.id}`}*/}
            {/*    className='w-100'*/}
            {/*    onClick={() => store.dispatch(getUser(row.id))}*/}
            {/*>*/}
            {/*  <Archive size={14} className='mr-50' />*/}
            {/*  <span className='align-middle'>Edit</span>*/}
            {/*</DropdownItem>*/}
            <DropdownItem className='w-100' onClick={() => {
              return MySwal.fire({
                title: 'Alert!',
                text: 'This operation will delete the space!',
                customClass: {
                  confirmButton: 'btn btn-primary',
                  cancelButton: 'btn btn-danger ml-1'
                },
                buttonsStyling: false,
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonText: 'Delete'
              }).then((result) => {
                if (result.isConfirmed) {
                  axiosInstance.delete(`/category/delete?_id=${row._id}`)
                      .then((res) => {
                        if (res.status === 200) {
                          Swal.fire('Deleted!', '', 'success').then((res) => {
                            if (res.isConfirmed) {
                              location.reload()
                            }
                          })
                        }
                      })
                }
              })
            }}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
    )
  }
]
