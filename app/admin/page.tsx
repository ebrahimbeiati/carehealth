import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { getRecentAppointments } from '@/lib/actions/appointment.actions'
import {DataTable} from '@/components/table/DataTable'
import { columns } from '@/components/table/columns'



const Admin = async () => {

const appointments = await getRecentAppointments();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-2xl font-bold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header"> Welcome to the Admin Dashboard 👋 </h1>
          <p className="text-dark-700">
            Here you can view and manage all the patient data.
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label=" Scheduled appointments"
            icon="/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label=" Pending appointments"
            icon="/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label=" Cancelled appointments"
            icon="/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
}

export default Admin;