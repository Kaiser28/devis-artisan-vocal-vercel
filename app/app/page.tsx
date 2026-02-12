import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dashboard
          </h1>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Session Info</h2>
              <p className="text-sm text-gray-600">Email: <span className="font-medium">{user.email}</span></p>
              <p className="text-sm text-gray-600">User ID: <span className="font-mono text-xs">{user.id}</span></p>
            </div>
            
            <div className="pt-4">
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Se déconnecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
