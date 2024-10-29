import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(routes.home())
  //   }
  // }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({
      username: data.username,
      password: data.password,
      roles: data.roles,
    })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Metadata title="Signup" />

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
            <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
            <p className="text-gray-500">Create your account</p>
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
              <Label
                name="roles"
                className="block text-sm font-medium text-gray-600"
                errorClassName="text-red-500"
              >
                Select Role
              </Label>
              <SelectField
                name="roles"
                className="w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                // onChange={(e) => setRole(e.target.value)}
                validation={{
                  required: true,
                  validate: {
                    matchesInitialValue: (value) => {
                      return (
                        value !== 'Please select an option' ||
                        'Select an Option'
                      )
                    },
                  },
                }}
              >
                <option>Please select an option</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="Receptionist">Receptionist</option>
              </SelectField>
              <FieldError name="roles" className="text-sm text-red-500" />
            </div>

            <div>
              <Submit className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                Add Users
              </Submit>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

export default SignupPage
