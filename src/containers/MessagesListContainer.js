import { connect } from 'react-redux'
import MessagesList from '../components/MessagesList'

const mapStateToProps = (state) => ({
    messages: state.messages
})

export const MessagesListContainer = connect(mapStateToProps, {})(MessagesList)
