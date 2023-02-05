/** Logger for log status when dispatch a action */
function logger(reducer) {
    return (prevState, action) => {
        console.group(action);
        console.log('prevState: ', prevState)
        console.log('action:', action)
        const newState = reducer(prevState, action)
        console.log('newState: ', newState)
        console.groupEnd();
        return newState;
    };
}
export default logger