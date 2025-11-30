import { LayoutDashboard, LogOut, ShoppingBag, ShoppingBasket, TableOfContents, Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export const Sidebar = () => {
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <LayoutDashboard color='gray' />
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/user-management" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <Users color='gray' />
                            <span className="flex-1 text-left ms-3 whitespace-nowrap">User Management</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/product-management" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <ShoppingBag color='gray' />
                            <span className="flex-1 text-left ms-3 whitespace-nowrap">Product Management</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/order-management" className
                            ="flex items-center p-2 text-gray-900 ro```unded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <ShoppingBasket color='gray' />
                            <span className="flex-1 text-left ms-3 whitespace-nowrap">Order Management</span>
                        </Link>
                    </li>
                      <li>
                        <Link to="/category" className
                            ="flex items-center p-2 text-gray-900 ro```unded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <TableOfContents color='gray' />
                            <span className="flex-1 text-left ms-3 whitespace-nowrap">Category</span>
                        </Link>
                    </li>
                   <li>
                        <Link to="" className
                            ="flex items-center p-2 text-gray-900 ro```unded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                            <LogOut color='gray' />
                            <span className="flex-1 text-left ms-3 whitespace-nowrap">LogOut</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>)
}
