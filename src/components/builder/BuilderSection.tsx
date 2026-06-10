import { ReactNode } from "react";

interface BuilderSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function BuilderSection({
  title,
  icon,
  children,
}: BuilderSectionProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
      "
    >
      <div className="flex items-center gap-4 mb-6">

        <div
          className="
            h-12
            w-12
            rounded-full
            bg-rose-50
            flex
            items-center
            justify-center
            text-rose-500
          "
        >
          {icon}
        </div>

        <div className="flex-1">

          <h2
            className="
              text-xl
              font-semibold
              text-[#43372f]
            "
          >
            {title}
          </h2>

          <div
            className="
              w-32
              h-[2px]
              bg-rose-200
              mt-2
            "
          />

        </div>

      </div>

      {children}

    </div>
  );
}