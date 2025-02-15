import { Link } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { PiCaretRight } from "react-icons/pi";
export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="my-2 block">
      <ol className="flex gap-x-3">
        <li
          className={`${"text-secondary-500  text-md items-center"}
          flex gap-x-2 
            `}
        >
          <BiHomeAlt2 />
          <PiCaretRight className="w-3 h-3" />
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`items-center text-sm ${
              breadcrumb.active
                ? "text-primary-700 font-medium"
                : "text-secondary-500"
            }
          flex gap-x-2
            `}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? <PiCaretRight /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
