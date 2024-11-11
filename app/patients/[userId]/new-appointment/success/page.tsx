import Image from 'next/image';
import Link from 'next/link';
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc)=>doc.name === appointment.primaryPhysician)

  return (
      <div className="fex h-screen max-h-screen px-[5%]">
          <div className="success-img">
              <Link href="/">
                  <Image
                      src="/logo.png"
                      alt="logo"
                      width={1000}
                      height={1000}
                      className="mb-12 h-10 w-fit "
                  />
              </Link>
              <section className="flex flex-col items-center justify-center">
                    <Image
                        src="/images/success.gif"
                        alt="success"
                        width={300}
                        height={300}
                  />  
                    <h2 className='header mb-6 max-w-[600px] text-center'>
                      Your <span className="font-bold text-green-500">appointment request</span>  has been scheduled successfully</h2>
                  <p className="text-center mb-6 max-w-[600px]">You will receive a confirmation email shortly. You can also view your appointment details in your dashboard.</p>
              </section>
              <section className='request-details'>
                  <h3 className='text-center  max-w-[600px]'>Appointment Details</h3>
                  <div className="flex  gap-3 items-center">
                      <Image
                          src={doctor?.image!}
                          alt="doctor"
                          width={100}
                          height={100}
                          className=" size-7" />
                        <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                      
                  </div>
                  <div className='flex gap-2'>
                      <Image
                            src='/images/calendar.svg'
                            alt='calendar'
                            width={24}
                            height={24}
                      />
                      <p>{formatDateTime(appointment.schedule).dateTime}</p>
                  </div>   
              </section>
              <Button variant="outline" className='shad-primary-btn'>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
              </Button>
              <p className="copyright py-12 mt-8">
                  Care Health © All rights reserved.
              </p>
            
              
          </div>
          
    </div>
  )
}

export default Success;