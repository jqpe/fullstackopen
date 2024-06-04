import PropTypes from 'prop-types'

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

Toggle.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  closePrompt: PropTypes.string.isRequired,
  openPrompt: PropTypes.string.isRequired
}
