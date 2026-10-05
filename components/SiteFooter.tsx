type Props = {
  email: string;
  linkedInUrl: string;
};

export function SiteFooter({ email, linkedInUrl }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border-warm bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-2 text-text-secondary">
          <a
            href={`mailto:${email}`}
            className="font-semibold text-text-primary underline-offset-4 hover:underline"
          >
            {email}
          </a>
          <a
            href={linkedInUrl}
            className="font-semibold text-text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-text-secondary">© {year} Ashley Goh</p>
      </div>
    </footer>
  );
}
