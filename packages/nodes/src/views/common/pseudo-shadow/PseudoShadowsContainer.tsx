import React from 'react'
import { useStore } from '$'
import PseudoShadow from './PseudoShadow'
import { Layer } from '../layer'

const PseudoShadowsContainer = (): React.ReactElement => {
  const shadowTargets = useStore((store) => Object.entries(store.registry.shadows.targets))

  return (
    <Layer id="np-shadows-layer" fixed z={30}>
      <div className="np-w-full np-h-full np-relative">
        {shadowTargets.map(([id, ref]) => (
          <PseudoShadow key={`np-shadow-${id}`} target={ref} />
        ))}
      </div>
    </Layer>
  )
}

export default React.memo(PseudoShadowsContainer)
