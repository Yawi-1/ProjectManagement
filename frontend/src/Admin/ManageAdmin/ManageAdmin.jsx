import React, { useState } from 'react'
import AllAdmins from './AllAdmins'
import AddAdmin from './AddAdmin'

const ManageAdmin = () => {
  const [addAdmin,setAddAdmin] = useState(false);
  return (
    <div className='manageadmin-container'>
        <h1>Manage Admin Panel</h1>
        {
          addAdmin===true ? <AddAdmin setAddAdmin={setAddAdmin} />   :  <AllAdmins setAddAdmin={setAddAdmin} />
        }
    </div>
  )
}

export default ManageAdmin