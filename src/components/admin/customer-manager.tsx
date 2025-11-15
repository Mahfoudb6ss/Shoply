"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";
import { Eye, Mail, Phone, Calendar, ShoppingCart } from "lucide-react";

interface CustomerOrder {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: number;
}

interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: string;
  orders?: CustomerOrder[];
}

interface CustomerManagerProps {
  customers: Customer[];
}

export function CustomerManager({ customers }: CustomerManagerProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const getCustomerTypeColor = (totalOrders: number) => {
    if (totalOrders >= 10) return "bg-purple-100 text-purple-800";
    if (totalOrders >= 5) return "bg-blue-100 text-blue-800";
    if (totalOrders >= 1) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getCustomerTypeLabel = (totalOrders: number) => {
    if (totalOrders >= 10) return "VIP";
    if (totalOrders >= 5) return "Regular";
    if (totalOrders >= 1) return "New";
    return "No Orders";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage customer information and view purchase history</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Total Orders</th>
              <th className="px-4 py-3 text-left font-medium">Total Spent</th>
              <th className="px-4 py-3 text-left font-medium">Last Order</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{customer.name || customer.email}</p>
                    <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="text-xs">{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className={getCustomerTypeColor(customer.totalOrders || 0)}>
                    {getCustomerTypeLabel(customer.totalOrders || 0)}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-medium">{customer.totalOrders || 0}</td>
                <td className="px-4 py-3 font-semibold">
                  {formatCurrency(customer.totalSpent || 0)}
                </td>
                <td className="px-4 py-3">
                  {customer.lastOrderDate ? (
                    <span className="text-sm">
                      {format(new Date(customer.lastOrderDate), "MMM dd, yyyy")}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No orders</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="outline" onClick={() => setSelectedCustomer(customer)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm">{selectedCustomer.name || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm">{selectedCustomer.phone || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Customer Since</Label>
                      <p className="text-sm">{format(new Date(selectedCustomer.createdAt), "PPP")}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium">Address</Label>
                      <p className="text-sm">{selectedCustomer.address || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold">{selectedCustomer.totalOrders || 0}</p>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 rounded-full bg-green-500" />
                      <div>
                        <p className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalSpent || 0)}</p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-bold">
                          {selectedCustomer.lastOrderDate
                            ? format(new Date(selectedCustomer.lastOrderDate), "MMM dd, yyyy")
                            : "Never"}
                        </p>
                        <p className="text-xs text-muted-foreground">Last Order</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order History */}
              {selectedCustomer.orders && selectedCustomer.orders.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCustomer.orders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Order {order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(order.createdAt), "PPP")} • {order.items} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>
                            <Badge variant="secondary" className="text-xs">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
