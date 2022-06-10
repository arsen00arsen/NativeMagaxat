import {MessageService} from '../../http/messageService/messageService';
import {
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  SET_SINGLE_MESSAGES,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_MESSAGES,
} from './type';

export const startLoadMessages = payload => ({
  type: LOAD_MESSAGES,
  payload,
});

export const setMessages = messages => ({
  type: LOAD_MESSAGES_SUCCESS,
  payload: messages,
});
export const setAllMessages = allNewMessages => ({
  type: LOAD_ALL_MESSAGES_SUCCESS,
  payload: allNewMessages,
});
export const setMessageError = msg => ({
  type: LOAD_MESSAGES_ERROR,
  payload: msg,
});

export const setNewMessage = payload => ({
  type: SET_SINGLE_MESSAGES,
  payload,
});

export const loadMessages = id => async dispatch => {
  try {
    dispatch(startLoadMessages(true));
    const {data} = await MessageService.getMessages(id);
    dispatch(setMessages(data.messages));
  } catch (error) {
    dispatch(setMessageError(error));
  } finally {
    dispatch(startLoadMessages(false));
  }
};
export const loadAllNewMessages = id => async dispatch => {
  try {
    dispatch(startLoadMessages(true));
    // const {data} = await MessageService.getAllMessages();
    dispatch(setAllMessages(id));
  } catch (error) {
    dispatch(setMessageError(error));
  } finally {
    dispatch(startLoadMessages(false));
  }
};
export const loadLastMessages = sms => async dispatch => {
  try {
    dispatch(startLoadMessages(true));
    dispatch(setNewMessage(sms.message));
  } catch (error) {
    dispatch(setMessageError(error));
  } finally {
    dispatch(startLoadMessages(false));
  }
};
