import React, { useLayoutEffect, useRef } from 'react'
import rhino3dm from 'rhino3dm'
import { NodePen } from 'glib'
import { MeshMaterial } from '../../types'

type CurveGeometryProps = {
  curve: NodePen.DataTreeValue<'curve' | 'circle'>['geometry']
  material?: MeshMaterial & { width?: number }
}

export const CurveGeometry = ({ curve, material }: CurveGeometryProps): React.ReactElement => {
  const { color, width, opacity } = material ?? {}

  const lineGeometryRef = useRef<any>(null)

  useLayoutEffect(() => {
    // console.log(curve)

    rhino3dm().then((rhino) => {
      /* @ts-expect-error `decode` type is incorrect */
      const geo: typeof rhino.NurbsCurve['prototype'] = rhino.CommonObject.decode(curve)

      console.log(geo.domain)
    })
    // const { degree, segments } = curve

    // const positions: number[] = []

    // for (const segment of segments) {
    //   const [ax, ay, az, ix, iy, iz, jx, jy, jz, bx, by, bz] = segment

    //   switch (degree) {
    //     case 1: {
    //       positions.push(...[ax, ay, az, bx, by, bz])
    //       break
    //     }
    //     default: {
    //       positions.push(...segment)
    //     }
    //   }
    // }

    // lineGeometryRef.current?.setPositions(positions)
  }, [curve])

  return (
    <>
      {/* @ts-expect-error `line2` does not publish types */}
      <line2>
        {/* @ts-expect-error `line2` does not publish types */}
        <lineGeometry ref={lineGeometryRef} />
        {/* @ts-expect-error `line2` does not publish types */}
        <lineMaterial
          color={color ?? 'darkred'}
          linewidth={width ?? 0.2}
          worldUnits={true}
          opacity={opacity ?? 0.7}
          transparent={true}
        />
        {/* @ts-expect-error `line2` does not publish types */}
      </line2>
    </>
  )
}
