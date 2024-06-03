export function Toggle({
  open,
  onOpenChange,
  children,
  closePrompt,
  openPrompt
}) {
  return (
    <>
      {open ? children : null}
      <button onClick={() => onOpenChange(!open)}>
        {open ? closePrompt : openPrompt}
      </button>
    </>
  )
}
