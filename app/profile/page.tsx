"use client";
import dynamic from "next/dynamic";
import React from "react";

const ProfilePage = dynamic(() => import("@/components/pages/profile"), {
  ssr: false,
});

const Profile = () => {
  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export default Profile;
