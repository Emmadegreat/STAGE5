import Image from "next/image";
import Login from "./login/page";
import ProfileDetails from "@/app/profile/page";

export default function Home() {
  return (
    <main className="flex flex-col items-cente bg-[#fafafa]">
      <Login/>
			{/* <ProfileDetails/> */}
    </main>
  );
}
