import { supabaseServer } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateUserForm } from "@/components/admin/create-user-form";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function AdminUsersPage() {
  const client = supabaseServer();
  const { data: users } = await client
    .from("users")
    .select("id,name,email,role,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Team & Roles</h1>
        <p className="text-sm text-muted-foreground">
          Crée des comptes internes et supervise leurs rôles.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Créer un utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs existants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!users?.length ? (
            <p className="text-sm text-muted-foreground">Aucun utilisateur pour l’instant.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="px-3 py-2">Nom</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Rôle</th>
                    <th className="px-3 py-2">Créé le</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="px-3 py-3 font-medium">{user.name}</td>
                      <td className="px-3 py-3">{user.email}</td>
                      <td className="px-3 py-3">
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {user.created_at
                          ? format(new Date(user.created_at), "dd MMM yyyy")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


