import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

export default function AccountPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isadmin, setisadmin] = useState(false);

  async function fetchAdmin() {
    const { data, error } = await supabase
      .from("userdata")
      .select("admin")
      .eq("auth0id", user.sub)
      .limit(1);
    setisadmin(data[0].admin);
    console.log(isadmin);
  }

  useEffect(() => {
    fetchAdmin();
  }, []);

  function userLogOut() {
    router.push("/api/auth/logout");
  }

  return (
    <div className="text-black">
      <h1 className="text-6xl my-[8vh] text-center text-black">Account Page</h1>
      <div className="flex flex-col sm:mx-[0px] sm:flex-row align-center justify-evenly items-center space-x-4 sm:border-4 border-lime-500 rounded-xl p-[40px]">
        <div className="flex flex-col justify-center">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle rounded-full img-fluid profile-picture mb-3 mb-md-0"
            decode="async"
            data-testid="profile-picture"
          />
          <button
            onClick={userLogOut}
            className="w-[150px] h-[35px] my-[5px] sm:my-[20px] bg-lime-500 text-white border-[2px] border-lime-500 rounded-3xl"
            round
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col space-y-6 ml-[50px] p-[20px]">
          <h2 className="text-3xl text-black">Contul tau</h2>
          <div>
            <p className="text-bold opacity-50">nickname</p>
            <p className="border-4 rounded-l p-[5px]">{user.nickname}</p>
          </div>
          <div>
            <p className="text-bold opacity-50">email</p>
            <p className="border-4 rounded-l p-[5px]">{user.email}</p>
          </div>
        </div>
      </div>
      <div>
        {isadmin ? (
          <button
            onClick={userLogOut}
            className="w-[150px] h-[35px] my-[5px] sm:my-[20px] bg-lime-500 text-white border-[2px] border-lime-500 rounded-3xl"
            round
          >
            Admin
          </button>
        ) : ( ''
        )}
      </div>
    </div>
  );
}
