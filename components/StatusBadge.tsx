import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const StatusBadge = ({ status }: { status: Status }) => {
    
  return (
      <div className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-yellow-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
      })}>
          <Image src={StatusIcons[status]} alt={status} width={16} height={16} className="h-fit w-4" />
    </div>
  )
}

export default StatusBadge