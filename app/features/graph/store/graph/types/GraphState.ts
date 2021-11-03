import { GrasshopperGraphManifest } from '@/features/graph/types'
import { NodePen } from 'glib'
import { GraphMode } from './GraphMode'

export type GraphState = {
  manifest: GrasshopperGraphManifest
  elements: { [elementId: string]: NodePen.Element<NodePen.ElementType> }
  selection: string[]
  mode: GraphMode
  registry: {
    latest: {
      element: string
    }
    restored: {
      elements: string[]
    }
    visibility: {
      // Elements with visibilities that just changes
      // Consumed and reacted to by `VisibilityObserver`
      elements: string[]
    }
    move: {
      elements: string[]
      fromWires: string[]
      toWires: string[]
    }
    wire: {
      origin: {
        elementId: string
        parameterId: string
      }
      primary: string
      capture?: {
        elementId: string
        parameterId: string
      }
    }
  }
}
