'use client'

import { useState } from 'react'
import { Search, Filter, User, Mail, Calendar, MoreVertical, Shield, ShieldOff, Eye, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'

// Mock data
const allUsers = [
  {
    id: '1',
    full_name: 'Ahmed Al-Sabah',
    email: 'ahmed@example.com',
    phone: '+965 9876 5432',
    role: 'user',
    created_at: '2024-01-01',
    properties_count: 5,
    status: 'active',
  },
  {
    id: '2',
    full_name: 'Sara Al-Mutairi',
    email: 'sara@example.com',
    phone: '+965 9123 4567',
    role: 'user',
    created_at: '2024-01-05',
    properties_count: 3,
    status: 'active',
  },
  {
    id: '3',
    full_name: 'Mohammed Al-Rashid',
    email: 'mohammed@example.com',
    phone: '+965 9555 1234',
    role: 'admin',
    created_at: '2023-12-15',
    properties_count: 0,
    status: 'active',
  },
  {
    id: '4',
    full_name: 'Fatima Al-Abdullah',
    email: 'fatima@example.com',
    phone: '+965 9444 5678',
    role: 'user',
    created_at: '2024-01-10',
    properties_count: 2,
    status: 'suspended',
  },
  {
    id: '5',
    full_name: 'Khaled Al-Fahad',
    email: 'khaled@example.com',
    phone: '+965 9777 8899',
    role: 'user',
    created_at: '2024-01-12',
    properties_count: 1,
    status: 'active',
  },
]

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<typeof allUsers[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const filteredUsers = allUsers.filter(user => {
    if (roleFilter !== 'all' && user.role !== roleFilter) return false
    if (statusFilter !== 'all' && user.status !== statusFilter) return false
    return true
  })

  const handleToggleAdmin = async (userId: string, currentRole: string) => {
    setIsProcessing(true)
    // TODO: Call Supabase to update role
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    toast.success(`User role updated to ${newRole}`)
    setIsProcessing(false)
  }

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setIsProcessing(true)
    // TODO: Call Supabase to update status
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active'
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'}`)
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Users</h1>
        <p className="text-neutral-600">Manage user accounts and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {allUsers.filter(u => u.role === 'user').length}
              </p>
              <p className="text-sm text-neutral-500">Regular Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {allUsers.filter(u => u.role === 'admin').length}
              </p>
              <p className="text-sm text-neutral-500">Administrators</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100">
              <ShieldOff className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {allUsers.filter(u => u.status === 'suspended').length}
              </p>
              <p className="text-sm text-neutral-500">Suspended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-4 px-6 font-medium text-neutral-600">User</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Role</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Status</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Properties</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Joined</th>
                <th className="text-right py-4 px-6 font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-semibold">
                          {user.full_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">{user.full_name}</h3>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      )}
                    >
                      {user.role === 'admin' ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      )}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 text-neutral-600">
                      <Home className="h-4 w-4" />
                      {user.properties_count}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-neutral-600 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleToggleAdmin(user.id, user.role)}
                        >
                          {user.role === 'admin' ? (
                            <>
                              <ShieldOff className="h-4 w-4" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4" />
                              Make Admin
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={cn(
                            "flex items-center gap-2",
                            user.status === 'active' ? 'text-red-600 focus:text-red-600' : 'text-green-600 focus:text-green-600'
                          )}
                          onClick={() => handleToggleStatus(user.id, user.status)}
                        >
                          {user.status === 'active' ? (
                            <>
                              <ShieldOff className="h-4 w-4" />
                              Suspend User
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4" />
                              Activate User
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  View user information and activity
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">
                      {selectedUser.full_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {selectedUser.full_name}
                    </h3>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                        selectedUser.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      )}
                    >
                      {selectedUser.role === 'admin' ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Mail className="h-4 w-4" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(selectedUser.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{selectedUser.properties_count}</p>
                    <p className="text-sm text-neutral-500">Properties Listed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">
                      <span className={cn(
                        selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'
                      )}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-sm text-neutral-500">Account Status</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      handleToggleAdmin(selectedUser.id, selectedUser.role)
                      setSelectedUser(null)
                    }}
                  >
                    {selectedUser.role === 'admin' ? (
                      <>
                        <ShieldOff className="h-4 w-4 mr-2" />
                        Remove Admin
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Make Admin
                      </>
                    )}
                  </Button>
                  <Button
                    className={cn(
                      "flex-1",
                      selectedUser.status === 'active'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    )}
                    onClick={() => {
                      handleToggleStatus(selectedUser.id, selectedUser.status)
                      setSelectedUser(null)
                    }}
                  >
                    {selectedUser.status === 'active' ? 'Suspend' : 'Activate'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
