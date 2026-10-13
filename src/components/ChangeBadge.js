import { formatChange } from "@/lib/format";

// Shows ▲ ২.১% (green), ▼ ২.৯% (red) or —০.০% (gray)
export default function ChangeBadge({ change }) {
  let color = "badge-neutral"; // gray: no change

  if (change.dir === "up") color = "badge-success";
  if (change.dir === "down") color = "badge-error";

  return (
    <span className={`badge badge-soft font-semibold ${color}`}>
      {formatChange(change)}
    </span>
  );
}
