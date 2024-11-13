import { Button } from "./ui/button"
import Image from 'next/image'

interface ButtonProps {
    children: React.ReactNode,
    className?: string,
    isLoading: boolean,
}
const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
  return (
      <Button type="submit" className={className ?? 'shad-primary-btn w-full'} disabled={isLoading}>
          {isLoading ? (
                  <div className="flex items-center justify-center gap-4">
                      <Image
                          src='icons/loader.svg'
                          alt='loader'
                          width={24}
                          height={24}
                          className="animate-spin"
                      />
                      Loading ...
                  </div>
              ) : children}
          </Button>
   
  )
}

export default SubmitButton