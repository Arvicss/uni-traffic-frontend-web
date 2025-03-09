"use client";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[url('/neuCampusBlurred.png')] overflow-hidden bg-cover bg-center bg-no-repeat ] flex flex-col">
      <Header />
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-20 text-center">
          <div className="bg-[url('/uniTrafficLogo.png')] bg-cover bg-center bg-no-repeat w-[300px] h-[189px]" />
          <Button className="w-[12vw] min-w-[129px]" asChild>
            <Link href="/auth/login">Get Started</Link>
          </Button>
          <p className="max-w-[600px] text-sm text-black">
            UniTraffic ensures hassle-free vehicle entry at New Era University by verifying sticker
            registration and tracking violations with a quick scan.
          </p>
        </div>
      </div>
    </div>
  );
}
