const ErrorMessage = ({message}) => {
    const messageStyle =
     {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    if (message === '') {
        return <></>
    }
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
}

export default ErrorMessage