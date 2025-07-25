import Link from 'next/link'

const AdminHome = () => (
  <section className="section">
    <div className="container space-y-4">
      <h1 className="text-3xl font-bold">Admin</h1>
      <ul className="list-disc ml-5">
        <li>
          <Link href="/admin/messages" className="text-primary underline">
            View Messages
          </Link>
        </li>
        <li>
          <Link href="/admin/jobs" className="text-primary underline">
            Manage Jobs
          </Link>
        </li>
      </ul>
    </div>
  </section>
)

export default AdminHome
