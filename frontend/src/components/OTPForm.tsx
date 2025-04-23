'use client'

import { verifyEmail } from '@/utils/actions/user.actions'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';


const OTP_LENGTH = 5


const OTPForm = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')!

  if (!email) {
      router.push('/register');
  }

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)
    setIsLoading(true)

    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      setError('Please fill all fields.')
    }

    try {
      await verifyEmail(email, code)
      router.push('/login')
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='w-full space-y-5' onSubmit={handleSubmit}>
      <h2 className='title'>Verify Email</h2>

      <div className="flex flex-row items-center justify-between w-full gap-1">
        {otp.map((digit, idx) => (
          <div key={idx} className="w-12 h-12 md:w-16 md:h-16">
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => {
                if (el) inputRefs.current[idx] = el
              }}
              className="w-full h-full text-center text-lg rounded-xl border border-sky-300 focus:border-sky-600 focus:border-2 outline-none bg-white"
            />
          </div>
        ))}
      </div>

      {error && <p className="error-message text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="disabled:bg-sky-400 bg-sky-500 transition duration-300 hover:bg-sky-600 text-white py-2 w-full rounded-lg cursor-pointer flex justify-center"
        disabled={isLoading || otp.join('').length !== OTP_LENGTH}
      >
        {isLoading ? <LoaderCircle className='animate-spin' /> : 'Verify'}
      </button>

      <Link href='/forgot-password' className="link text-center flex justify-center">
        Didn&apos;t receive code? Resend
      </Link>
    </form>
  )
}

export default OTPForm