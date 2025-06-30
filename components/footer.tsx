import Image from "next/image"
import Link from "next/link"
import { Twitter, Facebook, Youtube, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trading-view" className="text-gray-300 hover:text-white">
                  Trading View
                </Link>
              </li>
              <li>
                <Link href="/nse-holidays" className="text-gray-300 hover:text-white">
                  NSE Holidays
                </Link>
              </li>
              <li>
                <Link href="/e-voting-cost" className="text-gray-300 hover:text-white">
                  e-Voting Cost
                </Link>
              </li>
              <li>
                <Link href="/e-voting-faq" className="text-gray-300 hover:text-white">
                  e-Voting FAQ
                </Link>
              </li>
              <li>
                <Link href="/market-timings" className="text-gray-300 hover:text-white">
                  Market Timings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Offerings</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compare-broker" className="text-gray-300 hover:text-white">
                  Compare Broker
                </Link>
              </li>
              <li>
                <Link href="/fin-calculators" className="text-gray-300 hover:text-white">
                  Fin Calculators
                </Link>
              </li>
              <li>
                <Link href="/ipo" className="text-gray-300 hover:text-white">
                  IPO
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="text-gray-300 hover:text-white">
                  All Brokers
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/compare-brokers" className="text-gray-300 hover:text-white">
                  Compare Broker
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/share-investor" className="text-gray-300 hover:text-white">
                  Share Investor
                </Link>
              </li>
              <li>
                <Link href="/mutual-funds" className="text-gray-300 hover:text-white">
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-300 hover:text-white">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/indian-indices" className="text-gray-300 hover:text-white">
                  Indian Indices
                </Link>
              </li>
              <li>
                <Link href="/bug-bounty" className="text-gray-300 hover:text-white">
                  Bug Bounty Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-300 hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-300 hover:text-white">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/trust-security" className="text-gray-300 hover:text-white">
                  Trust & Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Company Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Youtube className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              </div>
              <div className="mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Bluestock"
                  width={150}
                  height={30}
                  className="h-6 w-auto filter brightness-0 invert"
                />
              </div>
              <div className="text-sm text-gray-300">
                <p>Bluestock Fintech</p>
                <p>Pune, Maharashtra</p>
                <p className="mt-2">MSME Registration No:</p>
                <p>UDYAM-MH-01-0703500</p>
              </div>
            </div>

            <div className="text-sm text-gray-300 max-w-lg">
              <p className="mb-4">
                Investment in securities markets are subject to market risks, read all the related documents carefully
                before investing as prescribed by SEBI. Issued in the interest of the investors.
              </p>
              <p className="mb-4">
                The users can write to{" "}
                <Link href="mailto:hello@bluestock.in" className="text-blue-400">
                  hello@bluestock.in
                </Link>{" "}
                for any app, website related queries. Also you can send it / Non related feedback to
                <Link href="mailto:ct@bluestock.in" className="text-blue-400">
                  ct@bluestock.in
                </Link>
              </p>
              <p className="mb-4">
                Disclaimer: We are not a SEBI registered research analyst company. We do not provide any kind of stock
                recommendations, buy/ sell stock tips, or investment and trading advice. All the stock scripts shown in
                the Bluestock app, website, all social media handles are for educational purposes only.
              </p>
              <p>
                Before making any investment in the financial market, it is advisable to consult with your financial
                advisor. Remember that stock markets are subject to market risks.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">Bluestock Fintech All Rights Reserved.</p>
            <p className="text-sm text-gray-300 mt-2 sm:mt-0">Made with ❤️ in Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
