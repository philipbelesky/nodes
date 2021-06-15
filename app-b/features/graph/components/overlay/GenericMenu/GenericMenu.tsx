type MenuAction<T> = {
  position: number
  icon: JSX.Element
  label: JSX.Element
  onClick: (context: T) => void
}

type GenericMenuProps<T> = {
  context: T
  actions: MenuAction<T>[]
}

export const GenericMenu = <T,>({ context, actions }: GenericMenuProps<T>): React.ReactElement => {
  return (
    <div
      className="absolute left-0 top-0 overflow-visible"
      style={{ width: 50, height: 50, transform: 'translate(-25px, -25px)' }}
    >
      <svg width="50" height="50" viewBox="0 0 10 10" className="overflow-visible">
        <mask id="donut">
          <circle cx="5" cy="5" r="500" fill="white" />
          <circle cx="5" cy="5" r="5" fill="black" />
        </mask>
        <circle cx="5" cy="5" r="15" fill="red" mask="url(#donut)" />
      </svg>
    </div>
  )
}
