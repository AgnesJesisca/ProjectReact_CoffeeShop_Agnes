export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="card-coffee flex justify-between items-center w-full">
      
      <div>
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="text-muted text-sm">{breadcrumb}</p>
      </div>

      <div>{children}</div>

    </div>
  );
}