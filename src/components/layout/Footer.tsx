import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import Logo from './Logo';

export function Footer() {
  return (
    <footer className="bg-card">
      {/* --- CHANGE 1: Matched container padding to header's px-10 --- */}
      <div className="container py-12 px-10">
        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-0 lg:col-span-1">
            
            {/* --- CHANGE 2: Replaced transform classes with header's mt-3 --- */}
            <div className="mt-10">
              <Logo />
            </div>

            <p className="text-primary text-sm max-w-xs font-light">
              Delivering Value through Excellence, Always.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {/* Services */}
            <div>
              <h4 className="font-headline text-primary font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-foreground hover:text-primary transition-colors font-light"
                    > 
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="font-headline text-primary font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 ">
                <li>
                  <a href="mailto:info@veasacoustics.com" className="hover:text-primary font-light">
                    info@veasacoustics.com
                  </a>
                </li>
                <li>
                  <a href="tel:+447721524262" className="hover:text-primary font-light">
                    +44 07721 524262
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Address */}
            <div>
              <h4 className="font-headline text-primary font-semibold mb-4">Our Address</h4>
              <ul className="space-y-2 text-foreground">
                <li className="font-light">9 Perseverance Works,</li>
                <li className="font-light">Kingsland Road,</li>
                <li className="font-light">London,</li>
                <li className="font-light">E2 8DD</li>
              </ul>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-headline text-primary font-semibold mb-4">Company Information</h4>
              <ul className="space-y-2 text-foreground">
                <li className="font-light">Veas Consulting Ltd</li>
                <li className="font-light">Registered in the UK</li>
                <li className="font-light">Company No. 16483186</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="border-t border-accent">
        <div className="container">
          <div className="py-6 text-center text-sm text-foreground">
            <p className="font-light">&copy; {new Date().getFullYear()} <span className="font-logo font-medium align-baseline" style={{ fontSize: '20px' }}>veas</span> <span className="font-logo text-sm align-baseline">Acoustics</span>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}