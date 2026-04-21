import clsx from "clsx"

type IconButtonProps = {
  label: string
  hasIndicator?: boolean
  className?: string
  children: React.ReactNode
}

export const IconButton = ({ label, hasIndicator, className, children }: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={clsx(
        "relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100",
        className,
      )}
    >
      {children}
      {hasIndicator && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      )}
    </button>
  )
}
