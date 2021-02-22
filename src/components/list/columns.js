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

  if (row.u_image.length) {
    return <Avatar className='mr-50' img={`${baseUrl}${row.u_image.replace('\\', '/')}`} width='32' height='32' />
  } else {
    return <Avatar color={color} className='mr-50' content={row.u_firstname ? (`${row.u_firstname} ${row.u_firstname}`) : 'John Doe'} initials />
  }
}

// ** Table columns
export const columns = [
  {
    name: '#',
    minWidth: '107px',
    selector: 'id',
    cell: row => <Link to={`/apps/invoice/preview/${row.u_id}`}>{`#${row.u_id}`}</Link>
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: '102px',
    selector: 'invoiceStatus',
    sortable: true,
    cell: row => {
      const color = row.u_subscription === 0 ? invoiceStatusObj['Partial Payment'].color : invoiceStatusObj['Paid'].color,
        Icon = row.u_subscription === 0 ? invoiceStatusObj['Partial Payment'].icon : invoiceStatusObj['Paid'].icon
      return <Avatar color={color} icon={<Icon size={14} />} />
    }
  },
  {
    name: 'Client',
    minWidth: '350px',
    selector: 'client',
    sortable: true,
    cell: row => {
      const name = (`${row.u_firstname  } ${row.u_lastname}`),
        email = row.u_email ? row.u_email : 'johnDoe@email.com'
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
    name: 'State',
    selector: 'state',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.u_state || ""}</span>
  },
  {
    name: 'Studio',
    selector: 'studio',
    sortable: true,
    minWidth: '200px',
    cell: row => row.u_studio
  },
  {
    name: 'Subscription',
    selector: 'subscription',
    sortable: true,
    minWidth: '164px',
    cell: row => (row.u_subscription === 0 ? <span>Unsubscription</span> : <Badge color='light-success' pill>Subscription</Badge>)
  }
]
