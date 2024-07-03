interface ListContainerProps extends React.ComponentProps<'div'> {}

export default function ListContainer(props: ListContainerProps) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        ...props.style,
      }}
    />
  );
}
