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
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-1 bg-black text-gray-50 text-center px-1 py-2 rounded-1 absolute z-1 bottom-[125%] left-[50%] -translate-x-[50%]">{content}</div>
    </div>
  );
}
