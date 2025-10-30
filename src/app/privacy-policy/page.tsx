import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Veas Acoustics",
  description:
    "Our commitment to your privacy and data protection under UK GDPR and the Data Protection Act 2018.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold text-primary">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Last updated: 17 October 2025
        </p>

        <div className="prose prose-lg mt-8 text-foreground font-light max-w-none">
          <h2>Introduction</h2>
          <p>
            Veas Consulting Ltd (trading as Veas Acoustics) (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
            committed to protecting your personal information and respecting your privacy. This Privacy
            Policy explains how we collect, use, and share your personal data when you interact with us,
            including when you visit our website, contact us, or use our services.
          </p>
          <p>
            We comply with the <strong>UK General Data Protection Regulation</strong> (UK GDPR) and the{" "}
            <strong>Data Protection Act 2018.</strong>
          </p>
          <p>
            Our registered office is at:{" "}
            <strong>9 Perseverance Works, Kingsland Road, London, E2 8DD</strong>
            <br />
            Company Number: <strong>16483186</strong>
          </p>
          <p>
            For any privacy-related queries, please contact us at: Email:
            <strong> info@veasacoustics.com</strong>
          </p>

          <h2>Personal Data We Collect</h2>
          <p>We may collect and process the following types of information:</p>

          <h3>(a) Information you provide directly</h3>
          <ul>
            <li>Name, email address, and company name</li>
            <li>Project details and correspondence</li>
            <li>Billing and payment information</li>
            <li>Any documents or files you provide</li>
          </ul>

          <h3>(b) Information collected automatically</h3>
          <p>When you visit our website, we may collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Device and operating system</li>
            <li>Website usage data (via cookies or analytics tools)</li>
          </ul>

          <h3>(c) Information from third parties</h3>
          <ul>
            <li>Partners or subcontractors working on your project</li>
            <li>Publicly available sources (e.g., LinkedIn or Companies House)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We process personal data for the following purposes:</p>
          <ul>
            <li>To provide and manage our consultancy services</li>
            <li>To communicate with you about projects or enquiries</li>
            <li>To issue quotes, invoices, and manage accounts</li>
            <li>To comply with legal or regulatory obligations</li>
            <li>To improve our website and client experience</li>
            <li>
              With your consent, to send occasional updates or marketing materials (you can unsubscribe at
              any time)
            </li>
          </ul>

          <h2>Legal Basis for Processing</h2>
          <p>We only process your personal data where one or more of the following applies:</p>
          <ul>
            <li>
              <strong>Contractual necessity:</strong> To perform our contract with you
            </li>
            <li>
              <strong>Legitimate interests:</strong> To operate and improve our business
            </li>
            <li>
              <strong>Consent:</strong> Where you&apos;ve agreed to receive communications or share specific
              information
            </li>
            <li>
              <strong>Legal obligation:</strong> Where required by law or regulation
            </li>
          </ul>

          <h2>How We Share Your Information</h2>
          <p>We may share your data with:</p>
          <ul>
            <li>
              Trusted service providers, for example software platforms and other tools and systems we use
              in delivering our services
            </li>
            <li>Professional advisers such as accountants or legal consultants</li>
            <li>Regulators or authorities, if legally required</li>
          </ul>
          <p>
            We do not sell or rent your personal data to any third parties. All third-party service
            providers are required to comply with data protection law and only process data according to our
            instructions.
          </p>

          <h2>Data Transfers Outside the UK</h2>
          <p>
            Where personal data is transferred outside the UK (for example, through software platforms), we
            ensure that appropriate safeguards are in place — such as UK adequacy decisions or Standard
            Contractual Clauses (SCCs).
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal data only for as long as necessary to fulfil the purposes it was collected
            for, including:
          </p>
          <ul>
            <li>
              Project data: typically retained for up to 6 years for recordkeeping and legal obligations
            </li>
            <li>Marketing data: until you withdraw consent</li>
            <li>Website analytics data: typically anonymised after 26 months</li>
          </ul>

          <h2>Your Rights</h2>
          <p>Under the UK GDPR, you have the right to:</p>
          <ul>
            <li>Access your personal data (Subject Access Request)</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion (&quot;right to be forgotten&quot;)</li>
            <li>Object to or restrict processing</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability</li>
          </ul>
          <p>
            To exercise any of these rights, please email <strong>info@veasacoustics.com</strong>.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to improve performance and user experience. You can control or
            disable cookies through your browser settings. For more information, please see our Cookie
            Policy.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal data,
            including:
          </p>
          <ul>
            <li>Secure cloud-based storage with appropriate security infrastructure</li>
            <li>Access controls and encryption to protect data integrity and confidentiality</li>
            <li>
              Regular monitoring and review to detect and prevent unauthorised access or data breaches
            </li>
          </ul>
          <p>
            In the event of a data breach that may affect your rights or freedoms, we will notify you and
            the ICO as required by law.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be available
            on our website. We encourage you to review it periodically to stay informed about how we protect
            your data.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please
            contact: <strong>Veas Consulting Ltd (trading as Veas Acoustics)</strong>
            <br />
            <br />
            Email: <strong>info@veasacoustics.com</strong>
            <br />
            Address: <strong>9 Perseverance Works, Kingsland Road, London, E2 8DD</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
