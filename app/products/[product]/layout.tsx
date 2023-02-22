export default function ProductLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl w-full mx-auto py-5 md:py-10">
      {children}
    </div>
  );
}