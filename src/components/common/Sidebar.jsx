import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <Link className='block border py-1' href="/admin"> <i className="bx bx-home"></i> Dashboard</Link>
      <Link className='block border py-1' href="/admin/blogs"><i className="bx bx-file"></i> Blogs</Link>
      <Link className='block border py-1' href="/admin/authors"><i className="bx bx-group"></i> Authors</Link>
    </div>
  )
}

export default Sidebar