import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const { user } = useAppContext();
  return (
    <section className="container pt-16 pb-4">
      <Card className="mt-8">
        <CardHeader className="text-primary text-2xl">Profile</CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input placeholder="email" value={user?.email} readOnly />
            </div>
            <div>
              <Label>Username</Label>
              <Input placeholder="username" value={user?.username} readOnly />
            </div>
            <div>
              <Label>Plan</Label>
              <Input placeholder="plan" value={user?.plan} readOnly />
            </div>
            <div>
              <Label>Subscription</Label>
              <Input
                placeholder="subscription"
                value={user?.subscription}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
