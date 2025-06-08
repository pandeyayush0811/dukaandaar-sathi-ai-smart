
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: "shop@example.com",
    full_name: "Shop Owner",
    shop_name: "My Shop",
    phone: "+91 9876543210",
    address: "Shop Address, City, State"
  });

  const updateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            User Profile
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-xs sm:text-sm h-8 sm:h-9"
            >
              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" onClick={updateProfile} className="text-xs sm:text-sm h-8 sm:h-9">
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-xs sm:text-sm h-8 sm:h-9"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
        <div>
          <Label htmlFor="email" className="text-sm">Email</Label>
          <Input
            id="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            disabled={!isEditing}
            placeholder="Enter your email"
            className="mt-1 h-10"
          />
        </div>

        <div>
          <Label htmlFor="full_name" className="text-sm">Full Name</Label>
          <Input
            id="full_name"
            value={profile.full_name}
            onChange={(e) => setProfile({...profile, full_name: e.target.value})}
            disabled={!isEditing}
            placeholder="Enter your full name"
            className="mt-1 h-10"
          />
        </div>

        <div>
          <Label htmlFor="shop_name" className="text-sm">Shop Name</Label>
          <Input
            id="shop_name"
            value={profile.shop_name}
            onChange={(e) => setProfile({...profile, shop_name: e.target.value})}
            disabled={!isEditing}
            placeholder="Enter your shop name"
            className="mt-1 h-10"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm">Phone Number</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            disabled={!isEditing}
            placeholder="Enter your phone number"
            className="mt-1 h-10"
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-sm">Address</Label>
          <Input
            id="address"
            value={profile.address}
            onChange={(e) => setProfile({...profile, address: e.target.value})}
            disabled={!isEditing}
            placeholder="Enter your shop address"
            className="mt-1 h-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
