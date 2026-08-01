import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/app/components/contact/socials";
import { SITE_NAME } from "@/app/lib/site";

const description = `How ${SITE_NAME} handles the personal information you send through the contact and merch enquiry forms on this site.`;

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title: "Privacy", description },
};

// Shown as "last updated" and used for the machine-readable <time>. Bump this
// whenever the text below changes in substance — a stale date on a privacy
// notice is worse than no date.
const UPDATED = "2026-08-01";

const updatedLabel = new Date(UPDATED).toLocaleDateString("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="[font-family:var(--font-libertinus)] text-xl italic text-neutral-800 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="w-full bg-white px-6 pt-24 pb-16 md:px-16 md:pt-28 md:pb-24">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="[font-family:var(--font-libertinus)] text-3xl italic text-neutral-800 sm:text-4xl md:text-5xl">
          Privacy
        </h1>
        <p className="mt-3 text-sm font-light text-neutral-500">
          Last updated <time dateTime={UPDATED}>{updatedLabel}</time>
        </p>

        <p className="mt-6 text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
          This site is run by {SITE_NAME}, an independent musician. It has no
          accounts, no shop checkout and no advertising. The only personal
          information it handles is what you type into a form and send.
        </p>

        <Section title="What is collected">
          <p>
            <strong className="font-medium text-neutral-800">
              Contact form.
            </strong>{" "}
            Your name, email address and message.
          </p>
          <p>
            <strong className="font-medium text-neutral-800">
              Merch enquiry form.
            </strong>{" "}
            Your name, email address, the size and quantity you asked about, and
            any message you add.
          </p>
          <p>
            <strong className="font-medium text-neutral-800">
              Your IP address.
            </strong>{" "}
            When you submit a form, your IP address is held in the server&apos;s
            memory for up to one hour and used only to count submissions and
            block spam. It is never stored on disk, never linked to your
            message, and disappears on its own.
          </p>
        </Section>

        <Section title="Why, and on what basis">
          <p>
            Form submissions are used for one thing: to read your message and
            reply to it. Nothing is sold, rented, or used for advertising, and
            you will not be added to a mailing list.
          </p>
          <p>
            Under the GDPR, the legal basis is your request to be contacted
            (Article 6(1)(b), steps taken at your request before any agreement)
            and, for the spam limiting above, legitimate interest in keeping the
            site usable (Article 6(1)(f)).
          </p>
        </Section>

        <Section title="Who else sees it">
          <p>
            <strong className="font-medium text-neutral-800">Resend</strong>{" "}
            delivers the form as an email. <strong className="font-medium text-neutral-800">Google</strong>{" "}
            hosts the inbox it arrives in, and{" "}
            <strong className="font-medium text-neutral-800">Vercel</strong>{" "}
            hosts the site itself and keeps short-lived server request logs.
            These providers process the data on {SITE_NAME}&apos;s behalf and
            may store it outside the EU, including in the United States.
          </p>
          <p>
            Nobody else receives your details. Links out to Spotify, Instagram,
            Facebook, YouTube and TikTok are ordinary links — once you follow
            one, that platform&apos;s own privacy policy applies.
          </p>
        </Section>

        <Section title="Cookies and tracking">
          <p>
            There are none. This site sets no cookies, runs no analytics, and
            embeds no tracking pixels or advertising scripts. Fonts, images,
            audio and video are served from this domain rather than fetched from
            a third party, so simply reading the site does not report you to
            anyone.
          </p>
        </Section>

        <Section title="How long it is kept">
          <p>
            Enquiry emails stay in the inbox for as long as they are useful for
            answering you and keeping track of bookings, and are deleted after
            that. Ask and yours will be deleted sooner.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask for a copy of what is held about you, ask for it to be
            corrected or deleted, or object to it being used. Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Privacy request")}`}
              className="text-orange-950 underline underline-offset-2 transition-colors duration-150 hover:text-orange-900"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and it will be handled within one month. There is no charge.
          </p>
          <p>
            If you are in the EU or the UK and think your data has been
            mishandled, you can complain to your national data protection
            authority — in the Netherlands, the Autoriteit Persoonsgegevens. In
            Australia, that is the Office of the Australian Information
            Commissioner.
          </p>
        </Section>

        <Section title="Children">
          <p>
            This site is not aimed at children, and the forms are not intended
            for anyone under 16.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If how this site handles your information changes, this page changes
            with it and the date at the top is updated.
          </p>
        </Section>

        <p className="mt-12 text-sm font-light text-neutral-500">
          Questions about any of this?{" "}
          <Link
            href="/#contact"
            className="text-orange-950 underline underline-offset-2 transition-colors duration-150 hover:text-orange-900"
          >
            Get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
