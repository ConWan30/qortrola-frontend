import Link from "next/link"
import { Gamepad2, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background/50 border-t border-border/50 mt-24">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-heading uppercase tracking-wider">Qortrola</span>
            </Link>
            <p className="text-sm text-muted-foreground font-sans">
              AI-Powered Gaming Analytics for the new era of play.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold font-heading uppercase tracking-wide">Solutions</h3>
            <ul className="mt-4 space-y-2 font-sans">
              <li>
                <Link href="/ai-agents" className="text-base text-muted-foreground hover:text-primary">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/surveys" className="text-base text-muted-foreground hover:text-primary">
                  Survey Revenue
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-base text-muted-foreground hover:text-primary">
                  Player Analytics
                </Link>
              </li>
              <li>
                <Link href="/depin" className="text-base text-muted-foreground hover:text-primary">
                  DePIN Comms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold font-heading uppercase tracking-wide">Developers</h3>
            <ul className="mt-4 space-y-2 font-sans">
              <li>
                <Link href="/docs" className="text-base text-muted-foreground hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-base text-muted-foreground hover:text-primary">
                  Get API Key
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-base text-muted-foreground hover:text-primary">
                  API Status
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold font-heading uppercase tracking-wide">Company</h3>
            <ul className="mt-4 space-y-2 font-sans">
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground font-sans">
          <p>&copy; {new Date().getFullYear()} Qortrola Gaming Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
