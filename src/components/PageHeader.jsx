export default function PageHeader({
  title,
  breadcrumb,
}) {

  return (
    <div className="mb-6">

      <h2
        className="
        text-[20px]
        font-bold
        text-[#6B2400]
        "
      >
        {title}
      </h2>

      <p
        className="
        text-[#E57A10]
        text-[14px]
        mt-1
        "
      >
        {breadcrumb}
      </p>

    </div>
  );
}