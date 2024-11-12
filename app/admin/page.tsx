import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'


const Admin = () => {
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
            count={5}
            label=" Scheduled appointments"
            icon="/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={10}
            label=" Pending appointments"
            icon="/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={1}
            label=" Cancelled appointments"
            icon="/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
}

export default Admin;