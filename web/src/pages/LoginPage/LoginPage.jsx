import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Metadata title="Login" />

      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
          {/* Logo Section */}
          <div className="mb-6 flex justify-center">
            <img
              src="/radilogo.png"
              alt="Logo"
              className="h-16 w-16" // Adjust size as needed
            />
          </div>

          <header className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
            <p className="text-gray-500">Access your account</p>
          </header>

          <Form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label
                name="username"
                className="block text-sm font-medium text-gray-600"
                errorClassName="text-red-500"
              >
                Username
              </Label>
              <TextField
                name="username"
                className="w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                errorClassName="border-red-500 focus:border-red-500"
                ref={usernameRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                }}
              />
              <FieldError name="username" className="text-sm text-red-500" />
            </div>

            <div>
              <Label
                name="password"
                className="block text-sm font-medium text-gray-600"
                errorClassName="text-red-500"
              >
                Password
              </Label>
              <PasswordField
                name="password"
                className="w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                errorClassName="border-red-500 focus:border-red-500"
                autoComplete="current-password"
                validation={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
              />
              <FieldError name="password" className="text-sm text-red-500" />
            </div>

            <div>
              <Submit className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                Login
              </Submit>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

export default LoginPage
