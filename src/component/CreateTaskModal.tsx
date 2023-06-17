// タスク追加 (モーダル)
// 看板に書き込む
// タイトル
// 期限 (必須ではない)
// 詳細はなし

import styled from '@emotion/styled'
import * as Dialog from '@radix-ui/react-dialog';


const CreateTaskModal = () => {
  const ButtonOpen = styled(Dialog.Trigger)`
    border: 1px solid black;
  `
  const ButtonClose = styled(Dialog.Close)`
    border: 1px solid black;
  `
  const Modal = styled(Dialog.Content)`
    border: 1px solid black;
  `
  const Description = styled(Dialog.Description)`
    color: gray;
    font-size: small;
  `
  const ModalTitle = styled(Dialog.Title)`
    font-size: large;
    font-weight: bold;
  `
  const InputContent = styled.input`
    border: 1px solid black;
  `
  return (
    <Dialog.Root>
      <ButtonOpen asChild>
        <button>開く</button>
      </ButtonOpen>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Modal>
          <ModalTitle>タスクを追加</ModalTitle>
          <Description>
            追加しましょう
          </Description>
          <fieldset>
            <label htmlFor="content">
              追加するタスク：
            </label>
            <InputContent id="content" placeholder="ここにタスクを入力" />
          </fieldset>
          <ButtonClose asChild>
            <button>追加</button>
          </ButtonClose>
          <ButtonClose asChild>
            <button>閉じる</button>
          </ButtonClose>
        </Modal>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default CreateTaskModal;
