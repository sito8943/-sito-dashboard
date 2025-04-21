import { HTMLAttributes } from "react";

// types
interface TooltipPropsType extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
}

export function Tooltip(props: TooltipPropsType) {
  const { content, children } = props;

  return (
    <div className="group relative inline-block cursor-pointer">
      {children}
      <div className="transition invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-black text-gray-50 text-center px-2 py-2 rounded-sm absolute z-10 bottom-[125%] left-[50%] -translate-x-[50%]">{content}</div>
    </div>
  );
}
