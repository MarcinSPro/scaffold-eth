import dotProp from 'dot-prop-immutable'

// import initialDialog from '../../../views/levels/__templateLevel__/model/dialog'
import initialDialog from '../../../views/levels/intro/model/dialog'
import dialogMap from '../model/dialogMap'

const stateContainerId = 'dialogs'

export const SET_DIALOG = `${stateContainerId}/SET_DIALOG`
export const GO_TO_DIALOG_ANCHOR = `${stateContainerId}/GO_TO_DIALOG_ANCHOR`
export const CONTINUE_DIALOG = `${stateContainerId}/CONTINUE_DIALOG`

const initialState = {
  currentDialog: initialDialog,
  currentDialogIndex: 0
}

const mapStateToProps = state => {
  const { dialogs } = state
  return {}
}

const reducer = (state = initialState, action) => {
  if (action.type.includes(stateContainerId)) {
    const { payload } = action

    if (action.type === SET_DIALOG) {
      state = dotProp.set(state, 'currentDialogIndex', 0)
      return dotProp.set(state, 'currentDialog', dialogMap[payload.dialog])
    }
    if (action.type === GO_TO_DIALOG_ANCHOR) {
      const { currentDialog, currentDialogIndex } = state

      let dialogAnchorIndex = currentDialogIndex
      currentDialog.map((dialogPart, index) => {
        console.log(dialogPart.dialogAnchor, payload.dialogAnchor)
        if (dialogPart.dialogAnchor === payload.dialogAnchor) {
          dialogAnchorIndex = index
        }
      })
      return dotProp.set(state, 'currentDialogIndex', dialogAnchorIndex)
    }
    if (action.type === CONTINUE_DIALOG) {
      if (state.currentDialogIndex < state.currentDialog.length - 1) {
        return dotProp.set(state, 'currentDialogIndex', state.currentDialogIndex + 1)
      }
      return state
    }

    return state
  }
  return state
}

const actionCreators = {
  setCurrentDialog: payload => ({
    type: SET_DIALOG,
    payload
  }),
  goToDialogAnchor: payload => ({
    type: GO_TO_DIALOG_ANCHOR,
    payload
  }),
  continueDialog: () => ({
    type: CONTINUE_DIALOG
  })
}

const dispatchers = {
  setCurrentDialog: payload => {
    return actionCreators.setCurrentDialog(payload)
  },
  goToDialogAnchor: payload => {
    return actionCreators.goToDialogAnchor(payload)
  },
  continueDialog: () => {
    return actionCreators.continueDialog()
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    setCurrentDialog(payload) {
      dispatch(actionCreators.setCurrentDialog(payload))
    },
    goToDialogAnchor(payload) {
      dispatch(actionCreators.goToDialogAnchor(payload))
    },
    continueDialog() {
      dispatch(actionCreators.continueDialog())
    }
  }
})

export { reducer, mapStateToProps, actionCreators, dispatchers, mapDispatchToProps }
