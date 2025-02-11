import React, { useRef, useEffect, useCallback } from 'react'
import { useStore, useStoreRef, useDispatch } from '$'
import { CAMERA } from '@/constants'
import { clamp } from '@/utils'
import { usePageSpaceToWorldSpace } from '@/hooks'

type CameraControlProps = {
  children?: React.ReactNode
}

// TODO: Give camera div pointer capture

const CameraOverlay = ({ children }: CameraControlProps): React.ReactElement => {
  const cameraControlOverlayRef = useRef<HTMLDivElement>(null)

  const { setCameraPosition, setCameraZoom } = useDispatch()
  const pageSpaceToWorldSpace = usePageSpaceToWorldSpace()

  const zoom = useStoreRef((state) => state.camera.zoom)

  const initialCameraPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const initialScreenPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const activePointerId = useRef<number>()
  const isPanActive = useRef(false)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    e.stopPropagation()

    if (isPanActive.current) {
      return
    }

    const cameraElement = cameraControlOverlayRef.current

    if (!cameraElement) {
      return
    }

    switch (e.pointerType) {
      case 'mouse': {
        const { pageX, pageY } = e

        switch (e.button) {
          case 0: {
            const [x, y] = pageSpaceToWorldSpace(pageX, pageY)
            console.log({ x, y })

            break
          }
          case 1: {
            // Only start pan if using right click
            break
          }
          case 2: {
            // Initialize move
            isPanActive.current = true
            activePointerId.current = e.pointerId

            cameraElement.setPointerCapture(e.pointerId)

            initialScreenPosition.current = { x: pageX, y: pageY }

            const { x, y } = useStore.getState().camera.position
            initialCameraPosition.current = { x, y }
            break
          }
        }

        break
      }
      case 'pen':
      case 'touch': {
        break
      }
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isPanActive.current) {
      return
    }

    if (e.pointerId !== activePointerId.current) {
      return
    }

    switch (e.pointerType) {
      case 'mouse': {
        const { pageX: currentScreenX, pageY: currentScreenY } = e
        const { x: initialScreenX, y: initialScreenY } = initialScreenPosition.current

        const totalDeltaX = currentScreenX - initialScreenX
        const totalDeltaY = currentScreenY - initialScreenY

        const { x, y } = initialCameraPosition.current

        const dx = -totalDeltaX / zoom.current
        const dy = totalDeltaY / zoom.current

        setCameraPosition(x + dx, y + dy)
        break
      }
      case 'pen':
      case 'touch': {
        break
      }
    }
  }

  const resetLocalState = useCallback(() => {
    activePointerId.current = undefined
    isPanActive.current = false
  }, [])

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerId !== activePointerId.current) {
      return
    }

    resetLocalState()
  }

  const handlePointerOut = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerId !== activePointerId.current) {
      return
    }

    resetLocalState()
  }

  const handleWheel = (e: WheelEvent): void => {
    e.stopPropagation()
    e.preventDefault()

    if (useStore.getState().layout.fileUpload.isActive) {
      // Disable scroll zoom while drag-and-drop overlay is active.
      return
    }

    const { pageX, pageY, deltaY } = e

    // Calculate next zoom
    const isIncreasing = deltaY > 0
    const step = 0.1 * (isIncreasing ? -1 : 1)
    const nextZoom = clamp(zoom.current + step, CAMERA.MINIMUM_ZOOM, CAMERA.MAXIMUM_ZOOM)

    // Calculate next position, based on cursor position
    const [cursorWorldX, cursorWorldY] = pageSpaceToWorldSpace(pageX, pageY)
    const { x: cameraWorldX, y: cameraWorldY } = useStore.getState().camera.position

    const vec = {
      x: cameraWorldX - cursorWorldX,
      y: cameraWorldY - cursorWorldY,
    }

    const zoomDelta = nextZoom - zoom.current

    const transform = {
      x: (vec.x / nextZoom) * -zoomDelta,
      y: (vec.y / nextZoom) * -zoomDelta,
    }

    setCameraZoom(nextZoom)
    setCameraPosition(cameraWorldX + transform.x, cameraWorldY + transform.y)
  }

  useEffect(() => {
    const container = cameraControlOverlayRef.current

    if (!container) {
      return
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  })

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  return (
    <div
      id="camera-control-overlay"
      className="np-w-full np-h-full np-pointer-events-auto"
      ref={cameraControlOverlayRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
      onContextMenu={handleContextMenu}
    >
      {children}
    </div>
  )
}

export default React.memo(CameraOverlay)
