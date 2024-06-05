import { Button } from '@mui/material'
import PropTypes from 'prop-types'

export function Toggle({
  open,
  onOpenChange,
  children,
  closePrompt,
  openPrompt,
}) {
  return (
    <>
      {open ? children : null}
      <Button
        variant={open ? 'text' : 'contained'}
        color={open ? 'secondary' : 'primary'}
        onClick={() => onOpenChange(!open)}
      >
        {open ? closePrompt : openPrompt}
      </Button>
    </>
  )
}

Toggle.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  closePrompt: PropTypes.string.isRequired,
  openPrompt: PropTypes.string.isRequired,
}
