import React, { useEffect, useState } from 'react'
import { Layout } from '..'
import { useGraphManager } from '@/features/graph/context/graph'
import {
  DeleteKeyObserver,
  HistoryHotkeyObserver,
  SelectionHotkeyObserver,
  SpaceBarObserver,
  VisibilityObserver,
} from '../observer'
import { useSceneDisplayMode } from '../../store/scene/hooks'
import { OverlayPortal } from '../overlay'
import { useSessionManager } from '@/features/common/context/session'

export const GraphContainer = (): React.ReactElement => {
  const { registry } = useGraphManager()
  const { device } = useSessionManager()

  const mode = useSceneDisplayMode()

  const [showGlideOverlay, setShowGlideOverlay] = useState<'sm' | 'md'>()

  useEffect(() => {
    setShowGlideOverlay(device.breakpoint)
  }, [device.breakpoint])

  return (
    <>
      <DeleteKeyObserver />
      <HistoryHotkeyObserver />
      <SelectionHotkeyObserver />
      <SpaceBarObserver />
      <VisibilityObserver />
      {!!showGlideOverlay ? (
        <OverlayPortal z={120}>
          <div className="w-full h-full relative pointer-events-none">
            <div className="w-vw absolute" style={{ bottom: showGlideOverlay === 'md' ? 200 + 11 : 200 + 15 }}>
              <div className="w-full flex justify-end" style={{ paddingRight: showGlideOverlay === 'md' ? 9 : 16 }}>
                <a
                  href="https://www.glideapps.com/?utm_campaign=NodePen%20Sponsorship%20-%202022&utm_source=nodepen-website&utm_content=banner"
                  target="_blank"
                >
                  <img
                    src={
                      showGlideOverlay === 'md'
                        ? '/sponsor/sponsor-banner-glide-md.svg'
                        : '/sponsor/sponsor-banner-glide-sm.svg'
                    }
                    width={showGlideOverlay === 'md' ? '182.45px' : '127px'}
                    height={showGlideOverlay === 'md' ? '46px' : '32px'}
                    className="pointer-events-auto"
                    style={{
                      background: '#202124',
                      borderRadius: showGlideOverlay === 'md' ? 12 : 8.35,
                      boxShadow:
                        showGlideOverlay === 'md'
                          ? '0px 13px 24px rgba(0, 0, 0, 0.15)'
                          : '0px 9.05px 16.71px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </OverlayPortal>
      ) : null}
      <div className="w-full flex-grow relative overflow-hidden">
        <div className="absolute w-full h-full left-0 top-0 z-0">
          <div className="w-full h-full flex flex-col justify-start overflow-hidden">
            <Layout.Controls />
            <div
              className="w-full flex-grow relative bg-pale"
              style={{ WebkitUserSelect: 'none' }}
              ref={registry.layoutContainerRef}
            >
              <div
                className="w-full h-full absolute z-10 transition-all duration-300 ease-out"
                style={{ left: mode === 'show' ? '-105%' : '0%' }}
              >
                <Layout.Canvas />
              </div>
              <div
                className="absolute w-full h-full top-0 z-10 transition-all duration-300 ease-out pointer-events-none"
                ref={registry.sceneContainerRef}
                style={{ left: mode === 'show' ? '0%' : '105%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
