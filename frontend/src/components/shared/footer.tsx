import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-48 flex flex-col bg-black px-36 pt-24 pb-12 text-slate-100">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-8 text-sm">
          <h1 className="font-bold text-4xl">KeyPhonic</h1>

          <div className="flex flex-col gap-y-2">
            <h3 className="border-gray-900 border-b font-semibold">
              Contact Us
            </h3>

            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-2">
                <MessageCircle />
                <div className="flex flex-col">
                  <span>WhatsApp</span>
                  <span>67 9-1234-4444</span>
                </div>
              </div>

              <div className="flex gap-x-2">
                <MessageCircle />
                <div className="flex flex-col">
                  <span>Call Us</span>
                  <span>+55 11 9-3377-4444</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-12">
          <div className="flex flex-col gap-y-4">
            <h3 className="border-slate-100 border-b font-semibold text-xl">
              Most popular categories
            </h3>

            <ul className="ml-4 list-disc space-y-2">
              <li>
                <Link href="/">Keyboards</Link>
              </li>
              <li>
                <Link href="/">Switches</Link>
              </li>
              <li>
                <Link href="/">Keycaps</Link>
              </li>
              <li>
                <Link href="/">Headphones</Link>
              </li>
              <li>
                <Link href="/">IEMs</Link>
              </li>
              <li>
                <Link href="/">DACs</Link>
              </li>
              <li>
                <Link href="/">AMPs</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-4">
            <h3 className="border-slate-100 border-b font-semibold text-xl">
              Customer Services
            </h3>

            <ul className="ml-4 list-disc space-y-2">
              <li>
                <Link href="/">About Us</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/">Privacy policy</Link>
              </li>
              <li>
                <Link href="/">Shipping policy</Link>
              </li>
              <li>
                <Link href="/">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <span className="mt-36 w-full border-slate-100 border-t py-2 text-center">
        © 2025 All rights reserved. KeyPhonic Inc.
      </span>
    </footer>
  );
};

export default Footer;
