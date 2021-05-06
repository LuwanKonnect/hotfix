// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Config File
import {baseUrl} from '@configs/urlConfig'
// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import {
  Eye,
  TrendingUp,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Paid: { color: 'light-success', icon: CheckCircle },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.profileImageUrl) {
    return <Avatar className='mr-50' img={`${row.profileImageUrl}`} width='32' height='32' />
  } else {
    return <Avatar color={color} className='mr-50' content={row.firstName ? (`${row.firstName} ${row.firstName}`) : 'John Doe'} initials />
  }
}

// ** Table columns
export const columns = [
  {
    name: 'ID',
    minWidth: '107px',
    selector: 'id',
    cell: row => row._id
  },
  {
    name: 'Client',
    minWidth: '350px',
    selector: 'client',
    sortable: true,
    cell: row => {
      const name = (`${row.firstName  } ${row.lastName}`),
        email = row.email ? row.email : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Mobile',
    selector: 'mobileNumber',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.mobileNumber || ""}</span>
  },
  {
    name: 'CreatedAt',
    selector: 'createdAt',
    sortable: true,
    minWidth: '200px',
    cell: row => row.createdAt
  }
]
